const express = require("express")
const router = express.Router()
const Category = require("../Models/category")

// fetch all categories
router.route("/")
    .get((req, res) => {
        var options = {
            page: req.query.pageNo,
            limit: req.query.size,
        };

        if(options.page == null || options.limit == null || options.page == "" || options.limit == ""){
            // res.status(400).json({
            //     "success": false,
            //     "results": [],
            //     "messages": "Page number or size missing from parameters"
            // })
            options = {
                page: 0,
                limit: 30,
            };
        }
        Category.paginate({}, options, (err, categories) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "results": [],
                    "messages": err
                })
            }
            res.send({
                "success": true,
                "total": categories.totalDocs,
                "hasNext": categories.hasNextPage,
                "hasPrev": categories.hasPrevPage,
                "totalPages": categories.totalPages,
                "results": categories.docs,
                "messages": "OK"
            })
        })
        return router
    })

module.exports = router