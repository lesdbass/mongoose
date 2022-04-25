const mongoose = require('mongoose')
const personSchema=new mongoose.Schema({
    name : {
        type : String,
        require: true,
        unique : true
    },
    age : { 
        type : Number,
        min :1,
        max : 150
    },
    favoriteFoods :[String],
    createdAt : Date,
    updatedAt : Date 
})

module.exports=mongoose.model("person",personSchema)

