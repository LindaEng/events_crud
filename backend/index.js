const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Event = require("./Event");

const PORT = 3000;
const app = express();

//CORS
app.use(cors());
app.use(express.json()); //json -> jsObject **


app.get("/events", async (req,res) => {
    const events = await Event.findAll();
    res.json(events);
})

//start of db
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); //tables exist?
        console.log("DB connected")

        app.listen(PORT, () => {
            console.log(`OUR Server is now listening to ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}

start();
