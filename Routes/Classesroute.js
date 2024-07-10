const express = require("express");
const {
  createClass,
  getclasses,
  getClass,
  addlink,
  deactivate,
  joinclass,
  getstudents,
  finestudents,
} = require("../Controllers/classescontrollers");

const router = express.Router();

router.post("/addclass", createClass);
router.get("/getclasses", getclasses);
router.post("/startclass", addlink);
router.post("/getclassdetails", getClass);
router.post("/endclass", deactivate);
router.post("/joinclass", joinclass);
router.get("/getstudents", getstudents);
router.post("/finestudents", finestudents);
module.exports = router;
