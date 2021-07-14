// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用sortData
// const sortData = require('../../config/sorData.json')

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

router.get('/search', (req, res) => {
  const form = req.query
  const keyword = req.query.keyword
  // const sortOption = req.query.sortOption
  // const sort = {
  //   nameAsc: {name: 'asc'},
  //   nameDesc: {name: 'desc'},
  //   category: {category: 'asc'},
  //   location: {location: 'asc'},
  //   rating: {rating: 'desc'}
  // }

  Restaurant.find()
    .lean()
    // .sort(sort[sortOption])
    .then((restaurants) => {
      restaurants = restaurants.filter(restaurant => {
        if (keyword.length === 2) {

          return restaurant.category.includes(keyword[0])
        } else {
          return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        }
      })
      if (restaurants.length > 0) {
        res.render('index', { restaurants: restaurants })
      } else {
        res.render('index', { no_results: `<h3>使用${keyword}沒有搜尋結果</h3>` })
      }
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router