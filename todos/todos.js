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

    todosEl.textContent = ''; //empties out container// not sure why 


    const todoList = await getTodos(); // this line gets to dos saved from users supabase 
    
    // display the list of todos

    for (let todoItem of todoList) {
        const todoItemEl = document.createElement('p');
        
        todoItemEl.classList.add('todo-item');
        todoItemEl.textContent = `${todoItem.todo}`; //what does this line do

        if (todoItem.complete === true) { // .complete is coming from supabase?
            todoItemEl.classList.add('done');//were adding class to the whole div element
        } else {
            todoItemEl.addEventListener('click', async () => {

                await completeTodo(todoItem.id); //where are we pulling id from here 

                displayTodos();
            });

    // be sure to give each todo an event listener
//
    // on click, complete that todo

        }

        todosEl.append(todoItemEl);
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