const express = require("express")
const router = express.Router()
const Category = require("../Models/category")

// fetch all categories
router.route("/")
    .get((req, res) => {
        Category.find((err, categories) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "results": [],
                    "messages": err
                })
            }
            res.json({
                "success": true,
                "results": categories,
                "messages": "OK"
            })
        })
    })


module.exports = router