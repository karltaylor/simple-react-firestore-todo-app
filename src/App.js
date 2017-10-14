import React, { Component } from 'react';
import './App.css';

import db from './createStore'

const todoRef = db.collection("todos");

class App extends Component {
  constructor () {
    super()
    this.state = {
      todos: []
    }
  }

  addTodo = (e) => {
    e.preventDefault()

    const ref = todoRef.doc()
    ref.set({
      task: this.state.todo,
      createdAt:(new Date()).getTime(),
      done: false,
      id: ref.id
    })
    .then(function(docRef) {
      console.log(docRef)
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  deleteTodo = (e) => {
    todoRef.doc(e.target.value).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  handleChange = (e) => {
    const t = e.target
    this.setState({
      [t.name]: t.value
    })
  }

  componentWillMount () {
    todoRef.orderBy('createdAt').onSnapshot((docSnapShot) => {
      let todos = []
      docSnapShot.forEach(doc => {todos.push(doc.data())})
      this.setState({
        todos,
        loaded: true
      })
    })
  }

  renderTodoList () {
    const ListItem = this.state.todos.map((todo, index) => {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
          {todo.task}
          <button value={todo.id} className="btn btn-sm btn-danger" onClick={this.deleteTodo}>X</button>
        </li>
      )
    })

    return (
      <ul className="list-group mt-2">
        {ListItem}
      </ul>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1>Firebase Test</h1>
        <form onSubmit={this.addTodo}>
          <div className="input-group">
            <input type="text" onChange={this.handleChange} name="todo" />
            <button className="btn btn-primary" type="submit" onClick={this.addTodo}>Add Todo</button>
          </div>
        </form>
        {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
