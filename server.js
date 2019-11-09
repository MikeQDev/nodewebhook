var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook',function(req,res){
var branch=req.body.ref;
var commit=req.body.head_commit;
console.log('Got update on branch:'+branch);
console.log(JSON.stringify(commit));
res.end();
});

app.listen(5555,function(){
  console.log("Started on PORT 5555");
})

