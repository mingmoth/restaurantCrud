// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用sortData
const sortData = require('../../config/sortData.json')

// 引用 restaurantData model
const Restaurant = require('../../models/restaurantData')
const monngoose = require('mongoose')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId})
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, sortData }))
    .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
  const form = req.query
  const keyword = req.query.keyword
  console.log(form)
  console.log(keyword)
  const sortOption = req.query.sortOption
  const sort = {
    nameAsc: { name: 'asc' },
    nameDesc: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' },
    rating: { rating: 'desc' }
  }
  Restaurant.find()
    .lean()
    .sort(sort[sortOption])
    .then((restaurants) => {
      if (keyword) {
        restaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword.toLowerCase())
        )
      }
      console.log(restaurants)
      if (restaurants.length === 0) {
        const error = `您使用${keyword}沒有搜尋結果`
        return res.render('index', { error })
      }
      res.render('index', { restaurants, sortData, sortOption, keyword })
    })
    .catch((error) => console.error(error))


})

// 匯出路由模組
module.exports = router