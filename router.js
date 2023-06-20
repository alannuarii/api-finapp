const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/getthismonth", controller.getThisMonth);
router.get("/getbeforemonth", controller.getBeforeMonth);
router.post("/insert", controller.insertData);
router.delete("/delete", controller.deleteData);

module.exports = router;
