import Hotal from "../models/Hotal.js";
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
    const newHotal = new Hotal(req.body)
    try {
        const saveHotel = await newHotal.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        next(err)
    }

}

export const updateHotel = async (req, res, next) => {
    const updateHotal = await Hotal.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    try {
        const saveHotel = await updateHotal.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        res.status(500).json(err)
    }

}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotal.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted");
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getHotel = async (req, res, next) => {
    try {
        const Hotel = await Hotal.findById(req.params.id)
        res.status(200).json(Hotel);
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getAllHotel = async (req, res, next) => {
    const { min, max, ...other } = req.query
    try {
        const Hotels = await Hotal.find({ ...other, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(req.query.limit)
        res.status(200).json(Hotels);
    } catch (err) {
        next(err)
    }

}
export const getCountByCityHotel = async (req, res, next) => {
    const cities = req.query.cities.split("");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotal.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }

}
export const getCountByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotal.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotal.countDocuments({ type: "apartment" });
        const resortCount = await Hotal.countDocuments({ type: "resort" });
        const villaCount = await Hotal.countDocuments({ type: "villa" });
        const cabinCount = await Hotal.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err)
    }

}

export const getHotelRoom = async (req, res, next) => {
    try {
        const hotal = await Hotal.findById(req.params.id)
        const list = await Promise.all((hotal.rooms.map(room => {
            return Room.findById(room)
        })))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}