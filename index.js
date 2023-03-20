const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//TODO: Crear instancia de express;
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static("public"));

// Read & parse body from request
app.use(express.json());

// Endpoints
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Todo: CRUD: Eventos

// Backend start listening
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} 🚀`);
    console.log(
        `Click to open web browser: http://localhost:${process.env.PORT}`
    );
});
