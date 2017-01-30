const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
  {name: 'Rod Blagojevich', email: 'a@a.com', password: 'a', isAdmin:true},
  {name: 'Chachi', email: 'b@a.com', password: 'a', isAdmin:false},
  {name: 'Gary Busey', email: 'c@a.com', password: 'a', isAdmin:false},
  {name: 'Tycho Brahe', email: 'd@a.com', password: 'a', isAdmin:false},
  {name: 'Carrot Top', email: 'e@a.com', password: 'a', isAdmin:true}
], user => db.model('users').create(user));

const seedProducts = () => db.Promise.map([
  {title: 'Hats', photo_url: '/images/hats.jpg', category: ['Clothes','Accessories'], current_price: 16, description: 'Fedora with a feather', availability: true, inventory: 100, promo_id: 1},
  {title: 'Ski Suits', photo_url: '/images/ski_suits.jpg', category: ['Athletics', 'Clothes'], current_price: 11, description: 'Full body ski suit', availability: false, inventory: 5, promo_id: 1},
  {title: 'Fanny Pack', photo_url: '/images/fanny_pack.jpg', category: ['Accessories'], current_price: 12, description: 'Bright neon in all colors', availability: true, inventory: 64, promo_id: 1},
  {title: 'Chuck Taylors', photo_url: '/images/chuck_taylors.jpg', category: ['Clothes','Shoes'], current_price: 15, description: 'A variation on a classsic', availability: false, inventory: 35},
  {title: 'Hairspray', photo_url: '/images/hairspray.jpg', category: ['Beauty'], current_price: 41, description: 'Fulll of CFCs', availability: true, inventory: 22, promo_id: 2},
  {title: 'Socks', photo_url: '/images/socks.jpg', category: ['Clothes'], current_price: 51, description: 'Big wooly socks', availability: true, inventory: 21},
  {title: 'Wigs', photo_url: '/images/wigs.jpg', category: ['Accessories', 'Beauty'], current_price: 21, description: 'Business in the front, party in the back', availability: false, inventory: 100, promo_id: 2},

  {title: 'chanel', photo_url: '/images/chanel.jpg', category: ['Beauty'], current_price: 49, description: 'Chanel loose powder', availability: true, inventory: 100, promo_id: 2},

  {title: 'cosmetic', photo_url: '/images/cosmetic.jpg', category: ['Beauty'], current_price: 31, description: 'Revlon violet pink set', availability: true, inventory: 100, promo_id: 2},

  {title: 'covergirl', photo_url: '/images/covergirl.jpg', category: ['Beauty'], current_price: 21, description: 'Cosmetic for young generation', availability: false, inventory: 100, promo_id: 2},

  {title: 'dior', photo_url: '/images/dior.jpg', category: ['Beauty'], current_price: 49, description: 'Luxury for your face', availability: true, inventory: 100, promo_id: 2},

  {title: 'dolls', photo_url: '/images/dolls.jpg', category: ['Accessories'], current_price: 9, description: 'For your room', availability: false, inventory: 100, promo_id: 2},

  {title: 'heel1', photo_url: '/images/heel1.jpg', category: ['Shoes'], current_price: 27, description: 'Edge on your heel', availability: true, inventory: 100, promo_id: 2},

  {title: 'pinkset', photo_url: '/images/pinkset.jpg', category: ['Accessories', 'Clothes'], current_price: 22, description: 'Everything for your pink day', availability: false, inventory: 100, promo_id: 2},

  {title: 'rainbow', photo_url: '/images/rainbow.jpg', category: ['Accessories', 'Clothes'], current_price: 31, description: 'Freedome', availability: false, inventory: 100, promo_id: 2},

  {title: 'sneakers', photo_url: '/images/sneakers.jpg', category: ['Shoes', 'Athletics'], current_price: 62, description: 'Compy with your style', availability: false, inventory: 100, promo_id: 2},

  {title: 'watche', photo_url: '/images/watch.jpg', category: ['Accessories'], current_price: 20, description: 'What time is i now? 19: 08 ! ', availability: false, inventory: 100, promo_id: 2},

  {title: 'wig2', photo_url: '/images/wig2.jpg', category: ['Accessories', 'Beauty'], current_price: 21, description: 'Party people', availability: false, inventory: 100, promo_id: 1},

  {title: 'Training set', photo_url: '/images/3set.jpg', category: ['Athletics', 'Clothes'], current_price: 21, description: 'Lion look', availability: false, inventory: 100, promo_id: 1},
  {title: 'Training suit for couple', photo_url: '/images/couple.jpg', category: ['Athletics', 'Clothes'], current_price: 21, description: 'Lion look', availability: false, inventory: 100, promo_id: 1},
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

const seedPromos = () => db.Promise.map([
 {code: "10OFF", discount: 0.1},
 {code: "20OFF", discount: 0.2}

 ], promo => db.model('promos').create(promo));


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedPromos)
  .then(seedProducts)
  .then(seedReviews)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
