const e = require('express');
const express = require('express');
const router = express.Router();
const {Category} = require('../models/categories');

router.get(`/`, async (req, res)=>{
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
})

router.post(`/`, async (req,res)=>{
    let category = new Category({
        Catname: req.body.Catname,
        CatId : req.body.CatId
    })
    category = await category.save();

    if(!category) 
    return res.status(404).send("category not created")

    res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndDelete(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success:true, message:"Category is deleted"})
        }
        else{
            return res.status(404).json({success: false, message: "Category not deleted"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})



module.exports = router;