const { response } = require("express");
const Event = require("../models/Event");

const getAllEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor pongase en contacto con el administrador.",
    });
  }
};

const editEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const _id = req._id;
  try {
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "No se encontro ningun evento con ese id",
      });

    if (event.user.toString() !== _id)
      return res.status(401).json({
        ok: false,
        msg: "No puedes editar eventos que fueron creados por otra persona.",
      });

    const newEvent = {
      ...req.body,
      user: _id,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor pongase en contacto con el administrador.",
    });
  }
};

const removeEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const _id = req._id;
  try {
    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "No se encontro ningun evento con ese id",
      });

    if (event.user.toString() !== _id)
      return res.status(401).json({
        ok: false,
        msg: "No puedes eliminar eventos que fueron creados por otra persona.",
      });

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor pongase en contacto con el administrador.",
    });
  }
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
