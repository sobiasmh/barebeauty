const express = require('express');
const {Category} = require('../models/categories');
const router = express.Router();
const {Product} = require('../models/product');

router.get(`/`, async (req, res)=>{
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
})

router.post(`/`, async (req, res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')


    let product = new Product({
        Title : req.body.Title,
        Price : req.body.Price,
        ProductId : req.body.ProductId,
        Img : req.body.Img,
        Quantity : req.body.Quantity,
        Description : req.body.Description,
        category : req.body.category,
        FacialColor : req.body.FacialColor

    })
    product = await product.save();

    if(!product) 
    return res.status(500).send("product not created")

    res.send(product);
  
    
})


module.exports = router;