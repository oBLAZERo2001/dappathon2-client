const router = require("express").Router();
const user = require("./user");
const file = require("./file");

router.use("/user", user);
router.use("/file", file);

module.exports = { routes: router };
