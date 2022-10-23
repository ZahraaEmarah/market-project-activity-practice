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
    .post((req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                "success": false,
                "messages": "Missing request body"
            })
        }

        const product = new Product(req.body)
        product.save((err) => {
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


router.use("/:id", (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(500).json({
                "success": false,
                "result": {},
                "messages": err
            })
        }
        if(product){
            req.product = product;
            return next();
        }
        return res.status(404).json({
            "success": true,
            "result": {},
            "messages": "Product Not Found"
        })
    })
    return router
})
router.route("/:id")
    .get(async (req, res) => {
        res.json({
            "success": true,
            "result": req.product,
            "messages": "OK"
        })
        return router
    })
    .put((req, res) => {        
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                "success": false,
                "messages": "Missing request body"
            })
        }
        const { product } = req;
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.brand = req.body.brand;
        product.category_id = req.body.category_id;
        product.image_url = req.body.image_url;
        product.images = req.body.images;
        product.save();
        res.json({
            "success": true,
            "result": req.product,
            "messages": "Product updated successfully"
        })  
        return router
    })
    .patch((req, res) => {
        const { product } = req;
        if(req.body._id){
            delete req.body._id
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            product[key] = value;
        })
        product.save((err) => {
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
                "messages": "Product updated successfully"
            })
        })
    })
    .delete((req, res) => {
        req.product.remove((err) => {
            if (err) {
                res.status(500).json({
                    "success": false,
                    "result": {},
                    "messages": err
                })
            }
            res.status(200).json({
                "success": true,
                "messages": "Product deleted successfully"
            })
        })
        return router
    })

module.exports = router