const express = require("express")
const bodyParser = require("body-parser")
// const request = require("request")
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    console.log("Post");
    const fname = req.body.fname; 
    const lname = req.body.lname; 
    const email = req.body.email; 
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data)

    const url = "https://us10.api.mailchimp.com/3.0/lists/54998f44a4";
    const options = {
        method:"POST",
        auth:"jnanshish:4e8445104871cb977faffe5dd5009cbd-us10"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        }
        else{
            res.sendFile(__dirname +"/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running in port 3000");
})


// api key
// 4e8445104871cb977faffe5dd5009cbd-us10

// list id
// 54998f44a4