const express = require('express');
const router = express.Router();
const {WishList} = require('../models/wishlist');

router.get(`/getWishlistData`, async (req, res)=>{
    const wishlistData = await WishList.find({ userId: req.user.userId });
    if(!wishlistData){
        res.status(500).json({success: false})
    }
    res.send(wishlistData)
})

router.post(`/addToWishlist`, async (req, res)=>{
    

    let wishlist = new WishList({
        productName : req.body.productName,
        productPrice : req.body.productPrice,
        productImage : req.body.productImage,
        userId : req.body.userId,
        productId : req.body.productId,
        
    })
    wishlist = await wishlist.save();

    if(!wishlist) 
    return res.status(500).send("wishlist not created")

    res.send(wishlist);
  
    
})
router.delete(`/removeWishlist/:id`, async (req, res)=>{
    const wishlistData = await Wishlist.findById(req.params.id);

    if(!wishlistData){
        res.status(500).json({message:"no data with given id"})
    }
    await wishlistData.remove();

    res.status(200).json({message:"Item removed from wishlist"})
})


module.exports = router;