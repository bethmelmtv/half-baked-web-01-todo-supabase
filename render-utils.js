export function renderTodo(todoItem) {

    // create a div and a p tag
    const toDoDiv = document.createElement('div');
           // put the todo's text into the p tag
    const todoContent = document.createElement('p');

         // add the 'todo' css class no matter what
    // todoItemEl.classList.add('todo-item');

           // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    if (todoItem.complete === true) { // .complete is coming from supabase?
        todoContent.classList.add('done');//were adding class to the whole div element
    } else {
        todoContent.classList.add('not-done');
    }
    todoContent.textContent = todoItem.todo;

   // append stuff
    console.log(todoContent);
    toDoDiv.append(todoContent);
    console.log(toDoDiv);
    
      // return the div
    return toDoDiv;
    
}



 