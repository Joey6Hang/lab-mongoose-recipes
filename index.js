const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const Schema = require('./models/Recipe.model')
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = {
  title:'Les nouilles au beouf a la soup sich',
  level:'Amateur Chef',
  ingredients:['piment' , 'coriendre','beouf' , 'bambu'],
  cuisine:'chinoise nouilles',
  dishType:'main_course',
  image:'none',
  duration: 10,
  creator:'sichuanaise',
  created: 2000-01-01,
}

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
  .then(() => {
    Recipe.create(myRecipe).then(recipeDoc => {
      console.log(recipeDoc.title);
      Recipe.insertMany(data)
      .then(allMyRecipes => {
        allMyRecipes.forEach(recipe => console.log(recipe.title))
        Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new:true})
        .then(updateDocument => {
          console.log(updateDocument)
          Recipe.deleteOne({title:'Carrot Cake'})
          .then(whatIsIt => {
            console.log()
            mongoose.disconnect()
          })
          .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


