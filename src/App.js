import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: ''
    }
  }

  handleChangeNewTask = (e) => {
    this.setState({ newTask: e.target.value })
  }

  handleAddTask = (e) => {
    e.preventDefault()
    if (this.state.newTask) {
      const newTask = { id: this.state.tasks.length + 1, name: this.state.newTask }
      this.setState({ tasks: this.state.tasks.concat(newTask), newTask: '' })
    } else {
      this.setState({ newTask: '' })
    }
  }

  handleDoneTask = (id) => {
    const doneTask = this.state.tasks.find(item => item.id === id)
    const tasks = this.state.tasks.filter(item => item.id !== id)
    const newTasks = [...tasks, {...doneTask, done: !doneTask.done }].sort((a, b) => a.id - b.id)
    this.setState({ tasks: newTasks })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li className={task.done ? 'done' : ''} onClick={() => this.handleDoneTask(task.id)} key={task.id}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.handleAddTask.bind(this)}>
            <input className={this.state.newTask.length === 0 ? 'error' : ''} onChange={this.handleChangeNewTask.bind(this)} type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
