const express = require('express');
const router = express.Router();
const {Orders} = require('../models/orders');

router.get(`/`, async (req, res)=>{
    const orderList = await Orders.find();
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)
})



module.exports = router;