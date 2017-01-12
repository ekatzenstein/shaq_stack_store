const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
  {name: 'Rod Blagojevich', email: 'a@a.com', password: 'a', isAdmin:true}
], user => db.model('users').create(user));

const seedProducts = () => db.Promise.map([
  {title: 'Hats', category: ['Clothes','Accessories'], current_price: 16, description: 'Fedora with a feather', availability: true, inventory: 100},
  {title: 'Ski Suits', category: ['Athletics', 'Clothes'], current_price: 11, description: 'Full body ski suit', availability: false, inventory: 5},
  {title: 'Fanny Pack', category: ['Accessories'], current_price: 12, description: 'Bright neon in all colors', availability: true, inventory: 64},
  {title: 'Chuck Taylors', category: ['Clothes','Shoes'], current_price: 15, description: 'A variation on a classsic', availability: false, inventory: 35},
  {title: 'Hairspray', category: ['Beauty'], current_price: 41, description: 'Fulll of CFCs', availability: true, inventory: 22},
  {title: 'Socks', category: ['Clothes'], current_price: 51, description: 'Big wooly socks', availability: true, inventory: 21},
  {title: 'Wigs', category: ['Accessories', 'Beauty'], current_price: 21, description: 'Business in the front, party in the back', availability: false, inventory: 100}
], product => db.model('products').create(product));

const seedReviews = () => db.Promise.map([
 {rating: 1, review_text: "aweful",product_id:5},
 {rating: 1, review_text: "if you have too much extra money ",product_id:1},
 {rating: 2, review_text: "don't buy",product_id:2},
 {rating: 2, review_text: "waste of money",product_id:3},
 {rating: 3, review_text: "can be better",product_id:4},
 {rating: 3, review_text: "should be better",product_id:6},
 {rating: 4, review_text: "good price",product_id:7},
 {rating: 4, review_text: "just like description",product_id:1}
 // ,
 // {rating: 5, review_text: "you must pick this",product_id:1},
 // {rating: 5, review_text: "my fav",product_id:1}

 ], review => db.model('reviews').create(review));


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedProducts)
  .then(seedReviews)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
