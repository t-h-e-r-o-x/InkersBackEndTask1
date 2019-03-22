const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host:'localhost',
    user: 'root',
    port: '3306',
    password: 'test',
    database: 'graph'
  }
})

const monthNames = ["january", "february","march", "april", "may", "june", "july","august", "september","october", "november", "december"];


app.get('/', (req,res) => {res.send("It is working")});
app.post('/signin', (req,res) => {
  const {user, password} = req.body;
  const cuser = 'admin'; //correct username
  const cpass = new Date(); //correct password
  const cpassDate = cpass.getDate();
  const cpassYear = cpass.getFullYear();
  const cpassMonth = monthNames[cpass.getMonth()];
  var arrmonth = password.match(/[a-z]/g);
  var month = arrmonth.join(""); //month extracted from entered password
  var date = password.split(month)[0]; //date extracted from entered password
  var year = password.split(month)[1]; //year extracted from entered password
  /*console.log(cpassMonth);
  console.log(month);
  console.log(cpassYear);
  console.log(year);
  console.log(cpassDate);
  console.log(date); */
  if(month == cpassMonth && date == cpassDate && year == cpassYear){
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
