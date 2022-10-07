const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/rishulrRegistration").then(()=>{
    console.log(`Connection successfully`);
}).catch((e) =>{
   console.log(` no Connection`);
})
