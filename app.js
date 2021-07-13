const express = require('express')
const exphbs = require('express-handlebars')
//const mongoose = require('mongoose')
// const Restaurant = require('./models/restaurantData.js')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
//引用 Mongoose
require('./config/mongoose')
const app = express()
const port = 3000

// MongoDB 的 3.1.0 版之前，向資料庫連線時不一定要加上 port，但在 3.1.0 版本後，連線資料庫時一定要加上 port。

// add { useNewUrlParser: true, useUnifiedTopology: true }

// mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb error')
// })

// db.once('open', () => {
//   console.log('mongodb connected')
// })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .sort({ _id: 'asc' }) //根據 _id 升冪排序
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.error(error))
// })

// app.get('/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/restaurants', (req, res) => {
//   console.log('req.body: ', req.body)
//   return Restaurant.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('detail', { restaurant }))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   console.log(id)
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// app.post('/restaurants', (req, res) => {
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description = req.body.description

//   return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.put('/restaurants/:id/edit', (req, res) => {

//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description = req.body.description

//   return Restaurant.findById(id)
//     .then(restaurant => {
//       restaurant.name = name
//       restaurant.name_en = name_en
//       restaurant.category = category
//       restaurant.image = image
//       restaurant.location = location
//       restaurant.phone = phone
//       restaurant.rating = rating
//       restaurant.google_map = google_map
//       restaurant.description = description
//       return restaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

// app.delete('/restaurants/:id/delete', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/search', (req, res) => {

//   const keyword = req.query.keyword[0]
//   const form = req.query
//   console.log(form)
//   console.log(keyword)

//   Restaurant.find()
//     .lean()
//     .then((restaurants) => {
//       restaurants = restaurants.filter(restaurant => {
//         if (form.keyword.length === 2) {
//           console.log(restaurant.category)
//           return restaurant.category.includes(keyword)
//         } else {
//           return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//         }

//       })
//       if (restaurants.length > 0) {
//         res.render('index', { restaurants: restaurants })
//       } else {
//         res.render('index', { no_results: `<h3>使用${keyword}沒有搜尋結果</h3>` })
//       }
//     })
//     .catch(error => console.log(error))

// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})