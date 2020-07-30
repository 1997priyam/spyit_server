const express = require('express');
const router = express.Router();
const stockDataModel = require('../models/stockData');

router.post('/', async (req, res) => {
    let { data } = req.body;
    try {
        await stockDataModel.create(data);
    } catch (e) {

    }
    return res.status(200).json({result: 'ok'});
});