// HINTS:
// 1. Import express and axios
import express, { response } from "express";
import axios from "axios";
// 2. Create an express app and set the port number.
const app=express();
const port=3000;
const API_ID='https://secrets-api.appbrewery.com/random';
// 3. Use the public folder for static files.
app.use(express.static('public'))
// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

app.get('/',async(req,res)=>{

    try {
        const response= await axios.get(API_ID)
        const secret=response.data.secret;
        const user=response.data.username;
        res.render("index.ejs",{secret:secret,user:user})
    } catch (error) { 
        console.log(response.data)
        res.status(500)
    }

})


// 6. Listen on your predefined port and start the server.
app.listen(port,(req,res)=>{
    console.log('Server is lising at port number',port)})
