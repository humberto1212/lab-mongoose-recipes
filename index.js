const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then((response) => {
    // return Recipe.create({
    //   "title": "Asian Glazed Chicken Thighs",
    //   "level": "Amateur Chef",
    //   "ingredients": [
    //     "1/2 cup rice vinegar",
    //     "5 tablespoons honey",
    //     "1/3 cup soy sauce (such as Silver Swan®)",
    //     "1/4 cup Asian (toasted) sesame oil",
    //     "3 tablespoons Asian chili garlic sauce",
    //     "3 tablespoons minced garlic",
    //     "salt to taste",
    //     "8 skinless, boneless chicken thighs"
    //   ],
    //   "cuisine": "Asian",
    //   "dishType": "main_course",
    //   "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   "duration": 40,
    //   "creator": "Chef LePapu"
    // })
    // .then ((response) => {
    //   console.log(response.title)
    // })

   
    return Recipe.insertMany( data )
  
  })

  .then((result) => {
    result.forEach((elem) => {
      console.log(elem.title);
    })
   })

   .then(() => {
    return Recipe.findOneAndUpdate ( {title: 'Rigatoni alla Genovese'} , {duration: 100}, {new: true})
      .then(() => {
        console.log('success!!');
      })
   })

   .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake'})
    .then(() => {
      console.log('success Carrot Cake remove!!');
    })
   })

   .then(() => {
    return mongoose.connection.close();
   })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
