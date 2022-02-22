require('dotenv').config();
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model
let personSchema = new Schema({
  name: {type: String, require: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = Model("Person", personSchema);;

const createAndSavePerson = (done) => {
  var danielArchibald = new Person({
    name: "Daniel Archibald",
    age: 24,
    favoriteFoods: ["rice","beans","chicken"]
  })

  danielArchibald.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

 var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];

const createManyPeople = (arrayOfPeople, done) => {
 
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, person){
    if (err) return err;
    done(null, person)
  })
}
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, person){
    if (err) return err;
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, person){
    if (err) return console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, function(err, person){
    if (err) return err;
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done, document = {new: true}) => {
  ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:    true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, function(err, person){
    if (err) return err;
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, people){
    if (err) return err;
    done(null, people);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name: 1})
        .limit(2)
        .select({age: 0})
        .exec(function(err, peopleNfoods){ 
          if (err) return err;
          done(null, peopleNfoods);
        });

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
