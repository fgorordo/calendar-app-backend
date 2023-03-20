const { response } = require("express");
const Event = require("../models/Event");

const getAllEvents = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: "Getting all events",
    });
};

const editEvent = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: "Editing event",
    });
};

const removeEvent = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: "Removing events",
    });
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);
    try {
        event.user = req._id;
        const dbRes = await event.save();
        return res.json({
            ok: true,
            event: dbRes,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador",
        });
    }
};

module.exports = { getAllEvents, editEvent, removeEvent, createEvent };
