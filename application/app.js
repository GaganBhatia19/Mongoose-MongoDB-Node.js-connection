const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/personalDatabase0');

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',()=>{
    console.log('connected to database')
})

// after connecting to database create a schema in this app

//Schema is basically a logical model and it defines the type of data we want to store in our database. Carefully notice it's a logical model.

// Inside a schema we define the kind of data we want to insert in our database and which is required from the client

// Schema is a structure supported by the DBMS coming from the DBMS background

// Here Schema is like a shape of document/object we want to store inside the database

const testSchema = new mongoose.Schema({
    // attributeName:DataType
    name:String,
    age:Number,
});

// after creating schema, create model(model here is the real object that we insert in the database)

// now we compile our schema into model.

const model = mongoose.Model('test',testSchema);