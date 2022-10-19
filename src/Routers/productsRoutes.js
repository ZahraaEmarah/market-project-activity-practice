const express = require("express")
const router = express.Router()
const Product = require("../Models/product")

// fetch all products
router.get("/", async (req, res) => {
    const products = await Product.find()
    res.send({
        "success": true,
        "results": products,
        "messages": "OK"
    })
})


module.exports = router