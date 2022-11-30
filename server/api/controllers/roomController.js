import Hotal from "../models/Hotal.js"
import Rooms from "../models/Room.js";
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRom = new Rooms(req.body)

    try {
        const savedRoom = await newRom.save();
        try {
            await Hotal.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next()
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Rooms.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        const saveRoom = await updateRoom.save();
        res.status(200).json(saveRoom);
    } catch (err) {
        res.status(500).json(err)
    }

}
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Rooms.updateOne({ "roomNumber._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            },
        })
        res.status(200).json(updateRoom);
    } catch (err) {
        res.status(500).json(err)
    }

}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Rooms.findByIdAndDelete(req.params.id)
        try {
            await Hotal.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room deleted");
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getRoom = async (req, res, next) => {
    try {
        const Roms = await Rooms.findById(req.params.id)
        res.status(200).json(Roms);
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getAllRoom = async (req, res, next) => {
    try {
        const Roms = await Rooms.find(req.params.id)
        res.status(200).json(Roms);
    } catch (err) {
        next(err)
    }

}
export const Room = async (req, res, next) => {
    const newHotal = new Rooms(req.body)
    try {
        const saveHotel = await newHotal.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        next(err)
    }

}