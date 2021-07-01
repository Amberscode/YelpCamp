const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '60a5d29752f0253302789182',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Located in the Missouri Ozark Mountains overlooking Table Rock Lake, Big Cedar Lodge is a remote haven of natural beauty and outdoor adventure. With genuine Ozarks hospitality and unmatched attention-to-detail, this premier wilderness resort has received numerous awards including being named the number one resort in the Midwest by Travel and Leisure magazine. The resort features a collection of lodges, cottages and cabins offering the perfect place to relax with family and friends after a day on the lake.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372746/YelpCamp/bnzujtp7ybkmx8jfet1i.jpg',
                    filename: 'YelpCamp/bnzujtp7ybkmx8jfet1i'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372746/YelpCamp/laretgtqmorft8vthipn.jpg',
                    filename: 'YelpCamp/laretgtqmorft8vthipn'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372747/YelpCamp/wfmg9qmoqrd7u6ugjl6d.jpg',
                    filename: 'YelpCamp/wfmg9qmoqrd7u6ugjl6d'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372747/YelpCamp/abl1ljl7iia098vw0k8z.jpg',
                    filename: 'YelpCamp/abl1ljl7iia098vw0k8z'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372747/YelpCamp/uh55rtpobwwg5ho1x7nf.jpg',
                    filename: 'YelpCamp/uh55rtpobwwg5ho1x7nf'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372747/YelpCamp/nxzvfh2mkvkqwheliixl.jpg',
                    filename: 'YelpCamp/nxzvfh2mkvkqwheliixl'
                  },
                  {
                    url: 'https://res.cloudinary.com/due6w0xox/image/upload/v1624372748/YelpCamp/biekeqdh5o5ok4pxytsg.jpg',
                    filename: 'YelpCamp/biekeqdh5o5ok4pxytsg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})