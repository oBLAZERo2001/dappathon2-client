const { File } = require("../models/file");

const uploadFile = async (req, res) => {
	try {
		const reqFile = req.file;
		console.log(reqFile);
		const { name, description } = req.body;
		const file = new File({
			data: reqFile.buffer,
			filename: reqFile.originalname,
			contentType: reqFile.mimetype,
			name,
			description,
		});
		await file.save();
		res.status(200).json({ filename: reqFile.originalname });
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
