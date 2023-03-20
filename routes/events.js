/*
    Events Routes / Events
    https://localhost/api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
    getAllEvents,
    editEvent,
    removeEvent,
    createEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldsValidator } = require("../middlewares/fields-validator");

const { tokenValidator } = require("../middlewares/token-validator");

const router = Router();

// TODO Obtener eventos, modificar eventos, borrar eventos, crear nuevo evento
router.use(tokenValidator);

router.get("/", getAllEvents);
router.post(
    "/",
    [
        check("title", "Debes ingresar un titulo para el evento")
            .not()
            .isEmpty(),
        check("notes", "Debes ingresar un texto").isString(),
        check(
            "start",
            "Debes ingresar una fecha de inicio para el evento"
        ).custom(isDate),
        check("end", "Debes ingresar una fecha de fin para el evento").custom(
            isDate
        ),
        fieldsValidator,
    ],
    createEvent
);
router.put("/:id", editEvent);
router.delete("/:id", removeEvent);

module.exports = router;
