const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			// required: true,
		},
		description: {
			type: String,
			// required: true,
		},
		filename: { type: String },
		contentType: { type: String },
		data: { type: Buffer },
	},
	{
		timestamps: true,
	}
);

const File = new mongoose.model("File", FileSchema);
module.exports = { File };
