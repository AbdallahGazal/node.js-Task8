import express from "express";
import { authenticationController, noteController, userController } from "./modules/index.js";
import { globalErrorHandling } from "./middleware/index.js";
import { PORT } from "./config.js";
import { bootstrapDB } from "./DB/connection.db.js";

const app = express();
bootstrapDB(app, PORT)

app.use(express.json());

app.all("/", (req, res) => res.status(200).send("Welcome to BE 🌷"));

app.use('/auth',authenticationController);
app.use('/user', userController)
app.use('/note', noteController)

app.all("{/*dummy}", (req, res) => res.status(404).send("Error 404, Invalid Routing.") )

app.use(globalErrorHandling);


