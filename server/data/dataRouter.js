const express = require('express');
const router = express.Router();
const dataController = require('./dataController')

router.post('/fetchData', dataController.fetchData)
router.post('/insertData', dataController.insertData)

module.exports = router
