const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
//const mongoose = require('mongoose')
// const Restaurant = require('./models/restaurantData.js')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
const usePassport = require('./config/passport')
//引用 Mongoose
require('./config/mongoose')
const app = express()
const port = 3000

// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: require('./controller/handlebarsHelper') }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisisMySecret',
  resave: false,
  saveUninitialized: true
}))
// setting body-parser
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// 將 request 導入路由器
app.use(routes)

app.use(express.static('public'))

// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})