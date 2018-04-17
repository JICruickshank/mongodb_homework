const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient
const ObjectID = require("mongodb").ObjectID;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if(err) {
    console.log(err);
    return;
  }
  const db = client.db("code_clan");
  console.log("connected to database");

  server.post("/api/students", function(req, res) {
    const students = db.collection("students");
    const studentToAdd = req.body;
    students.save(studentToAdd, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("saved to database");
      res.status(201);
      res.json(studentToAdd);
    })
  })

  server.get("/api/students", function(req, res) {
    const students = db.collection("students");
    students.find().toArray(function(err, allStudents) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allStudents);
    })
  })

})

server.listen(3000, function(){
  console.log("Listening on port 3000");
});


// server.get("/", function(req, res) {
//   const students = db.collection("students");
//
// })
