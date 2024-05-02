import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "rohranjan";
const yourPassword = "IAmTheBest";
const yourAPIKey = "1d3caac4-897e-45b7-884a-634558da647d";
const yourBearerToken = "3023e519-c303-43b4-9bf3-20cbb5360a4f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
    const response=await axios.get(API_URL+'random')
    res.render("index.ejs",{content: JSON.stringify(response.data)})
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const response=await axios.get(API_URL+"all?page=1", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });

    res.render("index.ejs",{content:JSON.stringify(response.data)})
  } catch (error) {
    res.render("index.ejs",{content:error.message})
  }
    

  
});


const parameters={
  params: {
   score: 5,
   apiKey:yourAPIKey
   }
}


app.get("/apiKey",async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  //https://secrets-api.appbrewery.com/filter?emScore=5&apiKey=${yourAPIKey}
    
  try {
    const response=await axios.get(API_URL+'filter?',parameters);
    res.render("index.ejs",{content:JSON.stringify(response.data)})

  } catch (error) {
    res.render("index.ejs",{content:error.message})
  }



});




const config={
  headers:{
    Authorization:"Bearer "+yourBearerToken
  }

}
app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  
     try {
      
      const response= await axios.get('https://secrets-api.appbrewery.com/secrets/1',config);
      res.render("index.ejs",{content:JSON.stringify(response.data)});

     } catch (error) {
      res.render("index.ejs",{content:error.message})
     }
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
