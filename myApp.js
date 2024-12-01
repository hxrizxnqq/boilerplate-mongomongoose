require('dotenv').config();
const mongoose = require('mongoose');
const {model} = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

let Person;

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person", personSchema);

// const createAndSavePerson = (done) => {
//   let andrzejDuda = new Person({
//     name: 'Andrzej',
//     age: '36',
//     favoriteFoods: ["eggs"]
//   });
//   andrzejDuda.save(function(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       done(null, data);
//     }
//   })
// };

let andrzejDuda = new Person({
  name: 'Andrzej',
  age: '36',
  favoriteFoods: ["eggs", "pizda"]
});

const createAndSavePerson = (done) => {
  let yevhen = new Person({
    name: 'Yevhen',
    age: '12',
    favoriteFoods: ["eggs", "pizda"]
  });

  yevhen.save(function(error, data) {
    if(error) return done(error);
    done(null, data);
  })
};

const arrayOfPeople = [
  {name: "dayn", age: 54, favoriteFoods: ["eggs", "pizza"]},
  {name: "pidor", age: 7, favoriteFoods: ["cabbage", "pomidor"]},
  {name: "yebok", age: 27, favoriteFoods: ["eggs", ]},
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if(err) return done(err);
      done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save(function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, person) {
    if (err) return done(err);
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function (err, persons) {
    if (err) return done(err);
    done(null, persons);
  })
};

const queryChain = function(done) {
  var foodToSearch = "burrito";

  const findBurrito = Person.find({favoriteFoods: foodToSearch})
      .sort({name: abc}).limit(2).select('-age')
  findBurrito.exec((err, persons) => {
        err ? done(err) : done(null, persons);
      })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
