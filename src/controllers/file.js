const { File } = require("../models/file");
const { Counter } = require("../models/count");

const { SpheronClient, ProtocolEnum } = require("@spheron/storage");

const client = new SpheronClient({ token: process.env.TOKEN });

const uploadFile = async (req, res) => {
	try {
		const { buffer, originalname, mimetype } = req.file;
		// console.log(buffer, originalname, mimetype);
		const { name, description } = req.body;
		const file = new File({
			data: buffer,
			filename: originalname,
			contentType: mimetype,
			name,
			description,
		});
		await file.save();

		let currentlyUploaded = 0;
		console.log(file);

		const { uploadId, bucketId, protocolLink, dynamicLinks } =
			// await client.upload("C:\\Users\\developer\\Desktop\\data.txt", {
			await client.upload(buffer, {
				protocol: ProtocolEnum.IPFS,
				name,
				onUploadInitiated: (uploadId) => {
					console.log(`Upload with id ${uploadId} started...`);
				},
				onChunkUploaded: (uploadedSize, totalSize) => {
					currentlyUploaded += uploadedSize;
					console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
				},
			});

		console.log(
			"uploadId:",
			uploadId,
			"bucketId:",
			bucketId,
			"protocolLink:",
			protocolLink,
			"dynamicLinks:",
			dynamicLinks
		);

		res.status(200).json({ filename: originalname });
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(500).json({ error: "Error uploading file" });
	}
};

const getFiles = async (req, res) => {
	try {
		const files = await File.find({});
		res.json(files);
	} catch (error) {
		console.error("Error fetching file list:", error);
		res.status(500).json({ error: "Error fetching file list" });
	}
};

module.exports = { uploadFile, getFiles };
