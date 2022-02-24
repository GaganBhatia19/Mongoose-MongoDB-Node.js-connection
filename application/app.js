const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/personalDatabase0'); // path to database

let db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',()=>{
    console.log('connected to database')
})

// after connecting to database create a schema in this app

//Schema is basically a logical model and it defines the type of data we want to store in our database. Carefully notice it's a logical model.

// Inside a schema we define the kind of data we want to insert in our database and which is required from the client

// Schema is a structure of data we want to insert in our database

// Here Schema is like a shape of document/object that is enforced via the application layer we want to store inside the database

// testSchema is object of Schema, of mongoose object.

const testSchema = new mongoose.Schema({
    // propertyName:DataType
    name:String,
    age:Number,
});

// we can also defines methods
testSchema.methods.myMethod = function(){
    console.log(
        this.name!=null?`hello there! this is ${this.name} here`:"hello from unknown"
    );
}

// Note: this work with schema should be done before creating a model 
// otherwise error will occur

// Once we create a model then we can't just modify our schema

// after creating schema, create model(model here is the real object that we insert in the database)

// now we compile our schema into model.

// Models are higher order constructors that take schema and create one instance of document equivalent to records in RDBMS

const MyModel = new mongoose.model("MyModelCollection",testSchema); //The string parameter which we pass here will become the name of the collection in database once we call save function further on

// MyModel will now work similar to a class

let mm = new MyModel({
    name: "Gagan",
    age: 19
})
// mm is an object of class MyModel
console.log(mm);

mm.myMethod();

// Notice that "connected to database" is printed after this above console.log this is because node.js is non-blocking and it doesn't block the execution of the program.

// So it first reads all the code and executes it and then it executes the callbacks and so the connection message.

// The data is not yet saved on the database so for saving the document in the mongodb database
/*
mm.save(function(err,mm){
    if(err) return console.log(err);
    return console.log("saved to database");
})
*/
// the document will be saved in the respective database in collection "mymodelcollections"(converts to plural form itself implicitly) this is the name that we pass earlier in mongoose.model() method

// the save function takes callback as an argument and as guess this callback will also be fired later
// The callback takes 2params one is err and other is object itself
// if we get any error while saving the document it will be printed on console. Or Otherwise it will be successfully stored in the collection of database

// for finding the data

MyModel.find({name:"Gagan"},(err,valuesReturnedAfterSearching)=>{
    if(err)return console.log(err)
    return console.log(valuesReturnedAfterSearching)
})
// while using this method for this time (as it is tutorial) comment out save method otherwise data will be inserted again or else there is no such issue

// find method is used in searching the particular object in collection
// So model name is used in order to use find()
/*
ModelClassName.find(
    // filter we have to pass
    {propertyName:value},
    function(error,documentObjectReturnedAfterSearching) {
        // callback
        if(error) return console.log(error);
        return console.log(documentObjectReturnedAfterSearching)
    }
)
*/