var port=5555;
var triggerBranch='refs/heads/development';

var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
const { exec } = require('child_process');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function performDeploy() {
exec('./deploy.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    console.error('FAILED TO DEPLOY @ '+new Date());
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  console.log('SUCCESSFULLY DEPLOYED @ '+new Date());
});
}

app.post('/webhook',function(req,res){
var branch=req.body.ref;
var commit=req.body.head_commit;
res.end();
console.log('Got update on branch `'+branch+'`');
console.log(JSON.stringify(commit));
if (triggerBranch === branch) {
	console.log("Trigger branch specified! Perform deploy");
        performDeploy();
}
});

app.listen(port,function(){
  console.log("Started webhook on PORT "+port);
  console.log("Listening for changes on BRANCH `"+triggerBranch+"`");

})

