import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import { render } from "ejs";

const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "Qwerty@123",
  port: 5432,
});

db.connect();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function visited_Country()
{
  let visited_country_code=[];
  const result = await db.query("SELECT country_code FROM visited_country");
  result.rows.forEach(country => {visited_country_code.push(country.country_code);
  });
return visited_country_code;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const visited_country=await visited_Country();
  console.log(visited_country);
  res.render("index.ejs",{countries:visited_country, total:visited_country.length});
  
});


app.post('/add',async(req,res)=>{
  const country_name=req.body.country;
  try{
    const result=await db.query(
      "SELECT country_code FROM countries where country_name=($1)",
      [country_name]);

      try {
        const data=result.rows[0];
        const countrycode=data.country_code;
        await db.query(
          "INSERT INTO visited_country (country_code) VALUES ($1)",
          [countrycode]
          )
          res.redirect('/');
      } catch (err) {
        console.log(err);
        const country=await visited_Country();
        res.render("index.ejs",
        {
          countries: country,
          total: country.length,
          error: "Country has already been added, try again.",
        })

      }
  }catch(err){
    console.log(err);
    const country=await visited_Country();
    res.render("index.ejs",{
      countries: country,
      total: country.length,
      error: "Country name does not exist, try again.",
    })
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



