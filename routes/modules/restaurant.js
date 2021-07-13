const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantData')


//create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  console.log('req.body: ', req.body)
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// router.post('/restaurants', (req, res) => {
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

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// router.get('/search', (req, res) => {

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

//
module.exports = router