var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook',function(req,res){
var body=req.body;
console.log('RECV: '+JSON.stringify(body));
res.end();
});

app.listen(5555,function(){
  console.log("Started on PORT 5555");
})

