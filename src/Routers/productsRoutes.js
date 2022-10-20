const express = require("express")
const router = express.Router()
const Product = require("../Models/product")

// fetch all products
router.route("/")
    .get((req, res) => {
        var query = {}
        const options = {
            page: req.query.pageNo,
            limit: req.query.size,
        };

        if(options.page == null || options.limit == null || options.page == "" || options.limit == ""){
            res.status(400).json({
                "success": false,
                "results": [],
                "messages": "Page number or size missing from parameters"
            })
        }

        if (req.query.categoryID) {
            query = { "category_id": req.query.categoryID }
        }
        Product.paginate(query, options, (err, products) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "results": [],
                    "messages": err
                })
            }
            res.json({
                "success": true,
                "total": products.totalDocs,
                "hasNext": products.hasNextPage,
                "hasPrev": products.hasPrevPage,
                "totalPages": products.totalPages,
                "results": products.docs,
                "messages": "OK"
            })
        })
        return router
    })
    .post(async (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                "success": false,
                "messages": "Missing request body"
            })
        }

        const product = new Product(req.body)
        await product.save((err) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "results": [],
                    "messages": err
                })
            }
            res.status(201).json({
                "success": true,
                "messages": "Product created successfully"
            })
        })
        return router
    })


router.route("/:id")
    .get(async (req, res) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "result": {},
                    "messages": err
                })
            }
            res.json({
                "success": true,
                "result": product,
                "messages": "OK"
            })
        })
        return router
    })
    .put((req, res) => {
        const newProduct = req.body
        
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                "success": false,
                "messages": "Missing request body"
            })
        }

        Product.findByIdAndUpdate(req.params.id, newProduct, (err, product) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "result": {},
                    "messages": err
                })
            }
            res.json({
                "success": true,
                "messages": "Product updated successfully"
            })
        })
        return router
    })
    .delete((req, res) => {
        Product.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "result": {},
                    "messages": err
                })
            }
            res.json({
                "success": true,
                "messages": "Product deleted successfully"
            })
        } )
        return router
    })

module.exports = router