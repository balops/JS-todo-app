import { v4 as uuidv4 } from 'uuid'

let toDos = []

//Fetch existing todo from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('toDos')

    try {
        toDos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        toDos = []
    }
}

//Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('toDos', JSON.stringify(toDos))
}

const getTodos = () => toDos

const createTodo = (text) => {
    toDos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos()
}

const removeTodo = (id) => {
    const todoIndex = toDos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        toDos.splice(todoIndex, 1)
        saveTodos()
    }
}

//Toggle the completed value for a given todo
const toggleToDo = (id) => {
    const todo = toDos.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleToDo }
