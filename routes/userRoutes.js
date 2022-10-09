const {
  register,
  login,
  setAvatar,
  allUsers,
} = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", allUsers);

module.exports = router;
