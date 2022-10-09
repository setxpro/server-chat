const {
  addMessage,
  getAllMessage,
} = require("../Controllers/MessagesController");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getallmessage", getAllMessage);

module.exports = router;
