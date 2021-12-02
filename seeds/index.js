const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '61a1f447d72cd25b417061eb',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias expedita, quasi aliquam, aspernatur sint temporibus ad deleniti nisi beatae cumque commodi, tempore doloremque distinctio sunt sapiente doloribus modi illo!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/domns4hvl/image/upload/v1638268478/YelpCamp/t4lilyxnkedlyp8o6dv0.jpg',
          filename: 'YelpCamp/t4lilyxnkedlyp8o6dv0',
        },
        {
          url: 'https://res.cloudinary.com/domns4hvl/image/upload/v1638185694/YelpCamp/u0tldap3clk03wy1msra.jpg',
          filename: 'YelpCamp/u0tldap3clk03wy1msra',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
