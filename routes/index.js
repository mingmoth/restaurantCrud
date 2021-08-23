// 引用 Express 與 Express 路由器
const express = require('express')
// 準備引入路由模組
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 restaurantData 模組程式碼
const restaurants = require('./modules/restaurant')

const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')
// 將網址結構符合 / 字串的 request 導向 home 模組 


// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurant 模組
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)

router.use('/', authenticator, home)
// 匯出路由器
module.exports = router