const express = require('express');
let Movie = require('./model');
let app = express();
app.set('view engine','ejs');
app.get('/',(req,res) => {
    Movie.find({},function(err,movies){
        res.render('index',{movies})
    })
});
app.listen(8080,()=>{
console.log('8080 on')
});