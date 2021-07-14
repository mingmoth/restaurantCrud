//const mongoose = require('mongoose')
const restaurantData = require('../restaurantData') // 載入 restaurantData model

const restaurantList = require('../../restaurant.json')
const raw = restaurantList.results

//mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//const db = mongoose.connection

const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  raw.forEach((restaurant) => {
    restaurantData.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Seed done')
})