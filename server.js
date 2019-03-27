const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//initiating express
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//reference to the database using knex
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
})

//for password month check
const monthNames = ["january", "february","march", "april", "may", "june", "july","august", "september","october", "november", "december"];


app.get('/', (req,res) => {res.send("It is working")});
app.post('/signin', (req,res) => {
  const {user, password} = req.body;
  const cuser = 'admin'; //correct username
  const cpass = new Date(); //correct password
  const cpassDate = cpass.getDate(); //extracting date from correct password
  const cpassYear = cpass.getFullYear(); //extracting year from correct password
  const cpassMonth = monthNames[cpass.getMonth()]; //extracting the correct month in words
  var arrmonth = password.match(/[a-z]/g); //extracting all letters from entered password
  var month = arrmonth.join(""); //month extracted from entered password being converted to string
  var date = password.split(month)[0]; //date extracted from entered password
  var year = password.split(month)[1]; //year extracted from entered password
  if(month == cpassMonth && date == cpassDate && year == cpassYear){ //checking
    res.json("In");
  }
  else{
    res.status(400).json("Out");
  }
  if(!user || !password){
    return res.status(400).json('Incorrect form submission');
  }
})

app.get('/bardata', (req,res) => {
  knex.select().table('bar')
  .then(data =>{
    res.json(data);
  })
})

app.get('/piedata', (req,res) => {
  knex.select().table('pie')
  .then(data =>{
    res.json(data);
  })
})

app.listen(process.env.PORT || 3000 , () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
