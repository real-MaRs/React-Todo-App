var React = require("react");
var ReactDOM = require('react-dom');
var About = require("./about");
require('./css/index.css')

import{Router, Route, browserHistory, Link} from 'react-router';

//module requires, yay webpack
var ToDoItem = require('./todoItem');
var AddItem = require('./addItem');

var App = React.createClass({
  render: function() {
    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={TodoComponent}></Route>
        <Route path={"/about"} component={About}></Route>
      </Router>
    );
  }
});

//Create component
var TodoComponent = React.createClass({

  getInitialState: function() {
    return {
      todos:["wash up", "eat some cheese", "take a nap", "buy flowers"],
      age:30
    }
  },

  render: function() {

    var todos = this.state.todos;
    todos = todos.map(function(item, index){
      return (
        <ToDoItem item={item} key={index} onDelete={this.onDelete}/>
      );
    }.bind(this));

    return(
      <div id="todo-list">
        <Link to={'/about'}>About</Link>
        <p>The busiest people have the most leisure...</p>
        <ul>
        {todos}
        </ul>
        <AddItem onAdd={this.onAdd}/>
      </div>
    );
  },//render

  //Custon functions
  onDelete: function(item) {
    //if true, removes from the array
    var updatedTodos = this.state.todos.filter(function(val, index){
      return item !==val;
    });
    this.setState({
      todos: updatedTodos
    });
  },

  onAdd: function(item) {
    var updatedTodos = this.state.todos;
    updatedTodos.push(item);
    this.setState({
      todos: updatedTodos
    });
  }
});

//put component into html page
ReactDOM.render(<App/>, document.getElementById('todo-wrapper'));
