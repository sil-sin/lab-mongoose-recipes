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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let recipe = data[0]
    return Recipe.create(recipe)
  })
  .then((addedRecipe) => {
    console.log("Data Added: " + addedRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((addedTitles) => {
    addedTitles.forEach(elem => {
      console.log(elem.title)
    })

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    console.log('Duration Updated Succesfully')
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    console.log("Carrot Cake finished")
    return mongoose.connection.close()
  })
  .then(() => {
    console.log("Terminated")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

