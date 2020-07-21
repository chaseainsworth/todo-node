const fs = require('fs');

const data = fs.readFileSync('/Users/DevOps/Documents/code-immersives/term-1/week-10/todo-node/todos.csv', 'utf-8');

const dataNewLines = data.split("\n");



const loadTodos = function(str) {

let result = [];

for (let i = 0; i < dataNewLines.length; i++) {

result.push(dataNewLines[i].split(","));

}
return result;
}

let file = loadTodos(dataNewLines);

// console.log(file);

const displayTodos = function(arr) {

    for (let i = 0; i < file.length; i++) {
        
        if (file[i][1] === "uncomplete") {
            console.log(file[i][0] + " - " + "✅");
            
        } if (file[i][1] === "complete") {
            console.log(file[i][0] + " - " + "✖");
        }
        
    }
    
}

const readline = require('readline');

const interface = readline.createInterface({input: process.stdin, output: process.stdout})

const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

` 

const handleMenu = function(argument) {
    if (argument === "1") {
        interface.question("what todo do you want to add?", addFunction);
    } else {
        console.log("Thanks for using our app, Goodbye.")
    }
    interface.close();
}

interface.question(menu, handleMenu);

const addFunction = function(argumentOne) {
    
    let addNewTask = [];
    
    addNewTask.unshift(argumentOne);
    
    addNewTask.push("uncomplete");
    
    file.unshift(addNewTask);
    
    console.log(displayTodos(file));
    
}
