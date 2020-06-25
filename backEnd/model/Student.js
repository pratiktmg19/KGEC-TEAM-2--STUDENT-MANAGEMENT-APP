const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    department:{
        type:String
        
    },
    passingYear:{
        type:Number,
        required:false

    },
    contact:[{
        email:{
            type:String
          
        },
        phone:{
            type:Number
           
        }
    }],
    socialMedia:[
        {
            link1:{
                type:String,
            },
            link2:{
                type:String
            }
        }
    ]
},
);

module.exports = mongoose.model('Student', studentSchema);