const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB Connected succesfully");
    } catch (err) {
        console.log(err);
        throw new Error("Error a la hora de inicializar base de datos");
    }
};

module.exports = { dbConnection };
