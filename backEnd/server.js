const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./model/Student'); // Schema for students
const url = require('./config/database').url; // local mongodb url
// const bodyParser = require('body-parser');
const app = express();

//connecting mongodb through mongoose
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
            .then(()=> console.log('db connected ...'))
            .catch( err => console.log(err));

//cors for req at different ports            
app.use(cors());

//express parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Port number
const PORT = process.env.PORT | 3000;

// finds all the names of the students present in the db
// {_id: 0, name:1}
app.get('/students', (req, res)=>{
    Student.find({},(err,docs) =>{
        console.log(docs);
        res.json(docs);
    })
});

//post request
app.post('/register', (req, res)=>{

    if(req.body._id == '')
        insertStudent(req, res);
    else
        updateStudent(req, res);
});

function insertStudent(req, res){
    const newStudent = new Student(req.body);
        newStudent.save()
        .then((user) => res.json(user))
        .catch( err => console.log(err));
}

function updateStudent(req, res){
    Student.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err, docs) =>{
        if(!err) console.log("Value updated ", docs);
        else res.json(docs);
    });
}

//To delete the student
app.get('/delete/:id',(req, res) =>{
    Student.findByIdAndDelete(req.params.id, (err, docs) =>{
        if(err) console.log(err);
        else console.log("Data deleted");
    })
})

//on clicking the student
app.get('/student/:id', (req, res) =>{
    Student.findById(req.params.id, (err, docs) =>{
      if (err) console.log(err);
      else res.json(docs)

    })
});

//on clicking on each of the students
app.get('/studentDetails', (req, res)=>{
    const name = "Bishal";
    Student.find({_id:req.body._id},(err, docs) =>{
        console.log(docs);    
        res.json(docs)
    });
   
});

//starting server
app.listen(PORT, ()=>{
    console.log(`listenning to PORT:${PORT}`)
})