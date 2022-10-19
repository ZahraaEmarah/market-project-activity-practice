const express = require("express")
const router = express.Router()
const Category = require("../Models/category")

// fetch all categories
router.get("/", async (req, res) => {
    const categories = await Category.find()
    res.send({
        "success": true,
        "results": categories,
        "messages": "OK"
    })
})


module.exports = router