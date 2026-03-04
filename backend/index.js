const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Event = require("./Event");

const PORT = 3000;
const app = express();

//CORS
app.use(cors());
app.use(express.json()); //json -> jsObject **

//CRUD endpoints
/*
    RESTful - convention
    - never use verbs / always nouns
    - broad -> specific
    - /categories/events/:eventId
    create(POST)[x] read(GET)[x] update(PUT/PATCH)[x] delete(DELETE)[x]
*/
app.get("/", (req, res) => {
    console.log("root route hit");
    res.send("server working");
});

//GET 
app.get("/events", async (req,res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})
    }
})

app.get("/events/:id", async (req,res) => {
    const {id} = req.params
    try {
        const event = await Event.findByPk(id);
        res.status(200).json(event);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})
    }
})
//DELETE
app.delete("/events/:id", async (req,res) => {
    const {id} = req.params
    try {
        const event = await Event.findByPk(id);
        //delete the event from our db
        await event.destroy();
        res.status(200).json({message: "event deleted!"});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})
    }
})

//POST
app.post("/events", async (req, res) => {
    const newEvent = req.body;
    console.log(newEvent);
    try {
      const createdEvent = await Event.create(newEvent);
      res.status(201).json({ message: `New event created! ${createdEvent.title}`})  
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})        
    }
})

//UPDATE ??????? 
app.patch("/events/:id", async (req, res) => {
    const updates = req.body // {title:sdfjskdl, location:skdjfljsk}
    const {id} = req.params 
    try {
        const foundEvent = await Event.findByPk(id);
        await foundEvent.update(updates);
        await foundEvent.save();
        res.status(200).json({ message: `Event ${foundEvent.title} has been updated`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})           
    }
})

app.put("/events/:id", async (req, res) => {
    const updates = req.body // {title:sdfjskdl, location:skdjfljsk}
    const {id} = req.params 
    try {
        const foundEvent = await Event.findByPk(id);
        await foundEvent.update(updates);
        await foundEvent.save();
        res.status(200).json({ message: `Event ${foundEvent.title} has been updated`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "bad request"})           
    }
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
