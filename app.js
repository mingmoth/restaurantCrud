const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantData = new Schema({
  name: {
    type: String,
    required: true
  }
})

const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// MongoDB 的 3.1.0 版之前，向資料庫連線時不一定要加上 port，但在 3.1.0 版本後，連線資料庫時一定要加上 port。
// add { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/restaurant-re', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurantList.results });
})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword[0]
  const form = req.query

  const restaurants = restaurantList.results.filter(restaurant => {
    if (form.keyword.length === 2) {
      console.log(restaurant.category)
      return restaurant.category.includes(keyword)
    } else {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    }
  })
  // 顯示無搜尋結果頁面
  if (restaurants.length > 0) {
    res.render('index', { restaurants: restaurants })
  } else {
    res.render('index', { no_results: '<h3>搜尋沒有結果</h3>' })
  }

})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  if (restaurant === {}) {
    res.render('show', { no_results: '<h3>搜尋沒有結果</h3>' })
  } else {
    console.log(restaurant)
    res.render('show', { restaurant: restaurant })
  }
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})