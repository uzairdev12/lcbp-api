const express = require("express");
const {
  addreq,
  getrequests,
  deleteRequest,
  approveRequest,
  getfreeplan,
} = require("../Controllers/requestcontrollers");

const router = express.Router();

router.post("/addreq", addreq);
router.get("/get", getrequests);
router.post("/delete", deleteRequest);
router.post("/approve", approveRequest);
router.post("/freeplan", getfreeplan);

module.exports = router;
