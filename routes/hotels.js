const express = require('express');
const router = express.Router();

const Hotel = require("../models/Hotels");
const createError = require('../utils/errors');

// CREATE
router.post("/createHotel", async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})
// UPDATE
router.put("/updateHotel/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})
// DELETE
router.delete("/deleteHotel/:id", async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) { return next(createError(404, "Hotel Not found")); }

        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully");

    } catch (error) {

    }
})
// GET ONE
router.get("/getHotel/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) { return next(createError(404, "Hotel Not found")); }
        res.status(200).json(hotel);
    } catch (error) {
        return next(createError());
    }
})
// GET ALL
router.get("/getAllHotels", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        return next(createError());
    }
})

module.exports = router