import { filterTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'

filterTodos()

document.querySelector('#filter-todo').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    filterTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    if (text.length > 0) {
        //let newtodo = e.target.elements.typeTodo.value
        createTodo(text)
        filterTodos()
        e.target.elements.text.value = ''
    }
})

document.querySelector('#toDoCheckbox').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    filterTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'toDos') {
        loadTodos()
        filterTodos()
    }
})