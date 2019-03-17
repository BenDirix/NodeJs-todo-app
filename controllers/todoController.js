let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let MongoConnectionString = require('../MongoDbConnectionString');

var urlEncodedParser = bodyParser.urlencoded({
  extended: false
});
// Connect to mongodb database
mongoose.connect(MongoConnectionString);

// Create a schema - it's like blueprint
let todoSchema = new mongoose.Schema({
  item: String,
})
// Create a model based on the schema
let TodoModel = mongoose.model('Todo', todoSchema);

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    // Get data from mongodb and pass it to view
    TodoModel.find({}, (err,data)=>{
      if(err) throw err;
      res.render('todo',{todoList: data});
    })
  });

  app.post('/todo', urlEncodedParser, (req, res) => {
    // Get data from view and add it to mongodb
    let newTodo = TodoModel(req.body).save((err, data) =>{
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    // Delete requested item from mongodb
    TodoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data)=>{
      if(err) throw err;
      res.json(data);
    });
  });

}