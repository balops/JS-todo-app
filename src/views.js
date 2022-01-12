import { getTodos, toggleToDo, removeTodo } from './todos'
import { getFilters } from './filters'

//Render application todos based on filters
const filterTodos = () => {
    const todoEl = document.querySelector('#todos')
    const {searchText, hideCompleted} = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''

    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => todoEl.appendChild(generateTodoDOM(todo)))
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const rootDiv = document.createElement('label')
    const containerEl = document.createElement('div')
    const toDoCheckBox = document.createElement('input')
    const toDoSpan = document.createElement('span')
    const toDoButton = document.createElement('button')

    //setup checkbox
    toDoCheckBox.setAttribute('type', 'checkbox')
    toDoCheckBox.checked = todo.completed
    toDoCheckBox.addEventListener('change', () => {
        toggleToDo(todo.id)
        filterTodos()
    })
    containerEl.appendChild(toDoCheckBox)

    //setup todo text
    toDoSpan.textContent = todo.text
    containerEl.appendChild(toDoSpan)

    //Setup container
    rootDiv.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    rootDiv.appendChild(containerEl)

    //setup button
    toDoButton.textContent = 'remove'
    toDoButton.classList.add('button', 'button--text')
    rootDiv.appendChild(toDoButton)
    toDoButton.addEventListener('click', () => {
        removeTodo(todo.id)
        filterTodos()
    })

    return rootDiv
}

//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

export { filterTodos, generateTodoDOM, generateSummaryDOM}