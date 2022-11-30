import express from "express";
import { deleteUsers, getAllUsers, getUser, updateUsers } from "../controllers/userControler.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user you are authenticate")

})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user you are log in")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("hello admin you are log in")
})
//update
router.put("/:id", verifyUser, updateUsers)
//delete
router.delete("/:id", verifyUser, deleteUsers)
//get
router.get("/:id", verifyUser, getUser)
//get all
router.get("/", verifyAdmin, getAllUsers)

export default router;