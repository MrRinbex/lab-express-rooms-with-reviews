// bin/seeds.js

const mongoose = require('mongoose')
const Review = require('../models/reviews.model')
const User = require('../models/user.model')
const Room = require('../models/room.model')

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/rooms-app"

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })

const rooms = [
  {
    name: "Manchester",
    description: 'english football club',
    imageUrl: "https://www.manutd-france.com/v5/wp-content/uploads/2019/08/OLD.jpg",
    owner: "",
  },
  {
    name: "Real Madrid",
    description: 'king of football',
    imageUrl: "https://i.le360.ma/le360sport/sites/default/files/styles/image_la_une_on_home_page/public/assets/images/2018/09-reda/santiago.jpg",
    owner: "",
  },
  {
    name: "PSG",
    description: 'Qatari club',
    imageUrl: "https://fr.redacaoemcampo.com/img/reviews/30/paris-saint-germain-stadium.jpg",
    owner: "",
  },
]

// Let's drop the database before seeding
// This is useful for testing our seeding, but we don't always want to do it
Room.deleteMany()
  .then(() => {
    return Review.deleteMany()
  })
  .then(() => {
    return User.deleteMany()
  })
  .then(() => {
    return User.create({
      username: 'Rainbow',
      password: '',
    })
  })
  .then(() => {
    return Room.create(rooms)
  })
  .then((roomsFromDB) => {
    console.log(`Created ${roomsFromDB.length} rooms`)
    return roomsFromDB
  })

  .then((rooms) => {
    return Review.create([
      {
        comment: 'I LOVED IT',
        room: rooms[0].id,
      },
    ])
  })
  .then((reviews) => {
    console.log(`Created ${reviews.length} reviews`)
    return reviews
  })
  .then(() => {
    // Once finished, close the DB connection
    return mongoose.connection.close()
  })
  .catch((err) =>
    console.log(`An error occurred while creating films from the DB: ${err}`)
  )
