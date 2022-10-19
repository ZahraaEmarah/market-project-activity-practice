const express = require('express')
const mongoose = require('mongoose');
const config_data = require('./config/config.json');

const productsRoutes = require("./src/Routers/productsRoutes")
const categoriesRoutes = require("./src/Routers/productsRoutes")

const port = process.env.PORT || 3000;

mongoose
    .connect(config_data['connection_string'], { useNewUrlParser: true })
    .then(() => {
        const app = express()

        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })

        app.use("/products", productsRoutes)
        app.use("/categories", categoriesRoutes)

        app.get("/", (req, res) => {
            res.send("ok")
        })
    })









