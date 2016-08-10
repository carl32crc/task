var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')
var app = express();

var publicFolder = __dirname + '/public';

var _tasks = [];

var counter = 100;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use( express.static(publicFolder) )

app.get('/tasks', function(req,res) {

	var _tasksList = _tasks.filter(function(item,i){
	   return  item.completed===false
	});

	res.render('tasks', {
		title: "--- List tasks ---",
		tasks: _tasksList
	});
})

app.post('/tasks', function(req,res) {
	if ( !req.body || !req.body.name ) res.send ("error!");
	var nameTask = req.body.name;
	var newTask = {
		id : ++counter,
		name: nameTask,
		completed: false
	}
	_tasks.push(newTask);
	res.redirect('/tasks')
})

app.get('/completed', function(req,res) {
	var _completed = _tasks.filter(function(item,i){
	   return  item.completed===true
	});
	res.render('completed', {
		title: "--- Completed tasks ---",
		completed: _completed
	});
})

//se pueden hacer dos posts en el mismo archivo?

app.put('/tasks', function(req,res) {
	var idToCompleted = req.query.id;
	if(idToCompleted!==undefined){
		_tasks = _tasks.filter(function(item,i) {
			if(item.id === parseInt(idToCompleted,10)){
				return _tasks=item.completed=true;
			}
				return _tasks;
		})
	}else{
		_tasks = _tasks.filter(function(item,i) {
			return _tasks=item.completed=true;
		})
	}

	res.end();
})

app.delete('/tasks', function(req,res) {
	var idToRemove = req.query.id;
	_tasks = _tasks.filter(function(item,i) {
		return item.id !== parseInt(idToRemove,10);
	})
	res.send("'/tasks' => id to remove = " + idToRemove);
})

app.listen(3000, function() {
	console.log("Listening on port 3000");
})