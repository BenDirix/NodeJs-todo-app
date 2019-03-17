let express = require('express');
var todoController = require('./controllers/todoController');
let app = express();

// set up template engine to use ejs
app.set('view engine', 'ejs');
// static files to load external css file
app.use('/assets', express.static('assets'))
// fire controllers
todoController(app);

// listen to port
app.listen(3000);
console.log("You are listening to port 3000");