const express=require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express()
app.use(express.json())
dotenv.config();
const person=require('./schema/person');


// connect 
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser:true,useUnifiedTopology:true})

//save a record model

var addPerson = async () => {
    var p = new person({
        name : "Bassem Lessoued",
        age : 21,
        favoriteFoods :["Tajin","Pizza","Makloub"]
    })
    let user = await p.save((err,date) =>{
        if(err) return console.error(err)
        console.log(data)
    })

    
}

//addPerson()


//create many Records 
var arrayPerson =[
    {name : "Imen", age : 74 ,favoriteFoods :["Spaghetti","Sushi"]},
    {name : "Skander", age : 44 ,favoriteFoods :["Rendang","Ramen"]},
    {name : "Ramzi", age : 61 ,favoriteFoods :["Tom Yam Goong","Kebab"]},
    {name : "Monia Ben", age : 16 ,favoriteFoods :["Pho","Peking duck","Paella"]}
]

var addArryPerson = () => {
    person.create(arrayPerson, (err,data) => {
        if(err) return console.error(err)
        console.log(data)
    })
}

//addArryPerson()

// find

var findPersonByName=(personName)=> {
    person.find({name : personName} , (err,data) => {
        if(err) return console.log(err)
        console.log(data)
    })
}

//findPersonByName("Bassem Lessoued")



// Use model.findOne() to Return a Single Matching Document from Your Database
var findByFood = (food) => {
    person.findOne({favoriteFoods:food} ,(err,data)=>{
        if(err) return console.error(err)
        console.log(data)
    })
}

//findByFood("Kebab")


// Perform Classic Updates by Running Find, Edit, then Save

var findPersonById = (id )=> {
     person.findById(id , (err,data)=>{
        if(err) return console.error(err)
       console.log(data)
    })
}

//findPersonById("62665e712cf41aa86a554e3b")


let findEditAndSave = (id) => {
    const f = "Hamburger"
    person.findById(id,(err,data)=>{
        if(err) return console.log(err)
        //add humberger to table 
        data.favoriteFoods.push(f)
        //save
        data.save((err,datasave)=> {
            if(err) return console.error(err)
            console.log(datasave)
        })
    })
}

//findEditAndSave("62665e712cf41aa86a554e3b")


//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdateOne = (personName) =>{ 
    const a = 30 ;
    person.findOneAndUpdate({name:personName} , {age: a },{returnNewDocument : true },(err,data) => {
        err ? console.log(err) : console.log(data)
    })
}

//findAndUpdateOne("Bassem Lessoued")

//Delete One Document Using model.findByIdAndRemove
let removeById= (id) => {
    person.findByIdAndRemove(id,{returnOriginal : true },(err,removeDoc)=>{
        (err) ? console.error(err) : console.log(removeDoc)
    })
}

//removeById("62665e712cf41aa86a554e38")


//Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
    var f="Hamburger"
    person.find({favoriteFoods: f})
          .sort({name : 1})
          .limit(2)
          .select({age:0})
          .exec((err,p) => {
              (err) ? console.error(err) : done(null,p)
          })
}

 
 queryChain((err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})


app.listen(3000)