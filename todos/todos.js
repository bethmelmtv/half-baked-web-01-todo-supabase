import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

const loadingEl = document.querySelector('.loading-spinner'); // we didnt add invisible? 



todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);

    await createTodo({ 
        todo: data.get('todo'), //left hand side is column from sb, right side is grabbing input of user 
        complete: false,
    });

    todoForm.reset();

    //create a function that fetches and displays
    await displayTodos();
    
});



function toggleLoadingSpinner() {
    loadingEl.classList.toggle('invisible'); //what does this do?
}


async function displayTodos() {
    // fetch the todos

    toggleLoadingSpinner(); //this shows the load item 

    todosEl.textContent = ''; //empties out container// this is where want to put the new todos// were clearing out to avoid duplicates 

    const todoList = await getTodos();

    // create a div and a p tag
    for (let todoItem of todoList) {
        // console.log(todoItem);
        const newToDo = renderTodo(todoItem);
        // console.log(newToDo);
        // be sure to give each todo an event listener
        newToDo.addEventListener('click', async () => {
            //   on click, complete that todo
            await completeTodo(todoItem.id);
            displayTodos(); // 
        });
        todosEl.append(newToDo);
        // console.log(todosEl);
    }


    toggleLoadingSpinner();

}




// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout(); //how come it dosent need await
});



deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();

    await displayTodos();

    // then refetch and display the updated list of todos
});


window.addEventListener ('load', () => {
    displayTodos();
});