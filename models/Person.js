const mongoose = require("mongoose")

const Person = mongoose.models("Person",{
    name: String,
    age: Number,
    approved: Boolean
});

module.exports = Person;
