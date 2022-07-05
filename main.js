let todoList= [
  {todo:'123', completed: false, id: 0},
  {todo:'443', completed: true, id: 1},
]
const todos = document.querySelector('#todos')
const input = document.querySelector('.input-text')
const add = document.querySelector('.add-btn')
const filter = document.querySelector('.filter')
let i =1

todos.addEventListener('click', checkTodo)
add.addEventListener('click', addTodo)
filter.addEventListener('click', filterTodo)
input.addEventListener('keyup', e => {if(e.keyCode === 13){ add.click()}})

displayTodoList(todoList)

//------ render view ------
function displayTodoList(list) {
  let htmlcontent = ''
  list.forEach(function(todo){
    if (todo.completed === true){
      htmlcontent += `
      <li class="todo checked" id=${todo.id}>
      <a href="#"><i class="far fa-trash-alt trash"></i></a>
        <input type="checkbox" class="todo-checkbox" checked>
        ${todo.todo}
      </li>
    `
    } else {
      htmlcontent += `
      <li class="todo" id=${todo.id}>
      <a href="#"><i class="far fa-trash-alt trash"></i></a>
        <input type="checkbox" class="todo-checkbox">
        ${todo.todo}
      </li>
    `
    }
    
  })
  todos.innerHTML =  htmlcontent
}

// ------CRUD function---------

function addTodo(){
  let newTodo = input.value.trim()
  if(newTodo === ''){
   return
  }
  addNewTodo(newTodo)
  input.value =''
}

function addNewTodo(newTodo){
  todoList.push({todo:newTodo, completed: false, id:idGenerator()})
  displayTodoList(todoList) 
}
function checkTodo(event){
  
  if(event.target.matches(".todo-checkbox")) {
    switchState(event.target)
  } else if (event.target.matches(".trash")){
    removeTodo(event.target)
  }
}

function removeTodo(target){
  let todo = target.parentElement.parentElement
  let _todo = findItIndex(todo.id)
  todoList.splice(_todo, 1)
  todo.remove()
}

// ------ change state----------

function switchState(target){
   let text = target.parentElement
   let _switch = findItIndex(text.id)
   todoList[_switch].completed = !(todoList[_switch].completed)
   text.classList.toggle('checked') 
}

function filterTodo(event){
  if(event.target.id === 'all'){
    displayTodoList(todoList)
  } else if (event.target.id === 'active'){
    let activeTodo = filtered(false)
    displayTodoList(activeTodo)
  } else if (event.target.id === 'completed'){
    let completedTodo = filtered(true)
    displayTodoList(completedTodo)
  }
}

function filtered(state){
  let newList = todoList.filter(n => {
    return n.completed === state
  })
  return newList
}

//------ other function -------

function findItIndex(id){
  let todoText = todoList.map(n => {
    return n.id
  })
  
  return todoText.indexOf(Number(id))
}

function idGenerator(){
  i ++
  return i
}