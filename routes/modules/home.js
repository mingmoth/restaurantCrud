// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurantData model
const Restaurant = require('../../models/restaurantData')

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router