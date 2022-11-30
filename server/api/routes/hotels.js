import express from "express";
import { createHotel, deleteHotel, getAllHotel, getCountByCityHotel, getHotel, updateHotel,getCountByType,getHotelRoom } from "../controllers/hotelControler.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create 
router.post("/", verifyAdmin, createHotel)
//update
router.put("/:id", verifyAdmin, updateHotel)
//delete
router.delete("/:id", verifyAdmin, deleteHotel)
//get
router.get("/find/:id", getHotel)
//get all
router.get("/", getAllHotel)
router.get("/countByCity", getCountByCityHotel)
router.get("/countByType", getCountByType)
router.get("/room/:id", getHotelRoom)

export default router;