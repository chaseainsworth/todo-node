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

const saveTodos = function(arr) {
    
    let result = [];
    
    for (let i = 0; i < file.length; i++) {
        result.push(file[i]);
    }
    
    let finalData = result.join("\n");
    
    fs.writeFileSync('./todos.csv', finalData);

    console.log("\nYour command has been accepted.")

    interface.question(menuTwo, handleMenu);
}

const displayTodos = function(arr) {

    for (let i = 0; i < file.length; i++) {
        
        if (file[i][1] === "uncomplete") {
            console.log([i + 1].toString() + ". " + file[i][0] + " - " + "✖");
            
        } else if (file[i][1] === "complete") {
            console.log([i + 1].toString() + ". " + file[i][0] + " - " + "✅");
    }
}
}

const readline = require('readline');
// const { removeListener } = require('cluster');

const interface = readline.createInterface({input: process.stdin, output: process.stdout})

const menu = `
Welcome to the Task Tracker App - 

Your options are:

1. View the todo list.
2. Add a todo.
3. Remove a todo.
4. Mark a todo completed.
5. Mark a todo uncompleted.
6. Quit.

`

const menuTwo = `
What else would you like to do? 

Your options are:

1. View the todo list.
2. Add a todo.
3. Remove a todo.
4. Mark a todo completed.
5. Mark a todo uncompleted.
6. Quit.

` 

const handleMenu = function(argument) {
    
    if (argument === "1") {
        console.log("\nCurrent Todo List:\n");
        console.log(displayTodos(file));
        interface.question(menuTwo, handleMenu);
    
    } else if (argument === "2") {
        interface.question("\nwhat todo would you like to add? ", add);
    } else if (argument === "3") {
        interface.question("\nWhat todo would you like to remove? ", remove);
    } else if (argument === "4") {
        interface.question("\nWhich todo would you like to mark as completed? ", markComplete);  
    } else if (argument === "5") {
        interface.question("\nWhich todo would you like to mark as uncompleted? ", unmark);
    } else if (argument === "6") {
        console.log("\nThanks for using our app. Goodbye.");
        interface.close();
    } else {
        console.log("\nPlease try using a valid command.");
        interface.question(menu, handleMenu);
    }
}

interface.question(menu, handleMenu);

const add = function(argumentOne) {

    let addNewTask = [];
    
    addNewTask.unshift(argumentOne);
    
    addNewTask.push("uncomplete");
    
    file.push(addNewTask);
    
    saveTodos(file);
}

const remove = function(argumentTwo) {

    const number = argumentTwo - 1;

    file.splice(number, 1);
    
    saveTodos(file);
}

const markComplete = function(argumentThree) {

    const number = argumentThree - 1;

    if (file[number][1] === "uncomplete") {
        file[number][1] = "complete";
        
        saveTodos(file);

    } else if (file[number][1] === "complete") {
        console.log("\nThis task is already marked complete. Please try a different task.")
        interface.question(menuTwo, handleMenu);
    }
}

const unmark = function(argumentFour) {

    const number = argumentFour - 1;

    if (file[number][1] === "complete") {
        file[number][1] = "uncomplete";
        
        saveTodos(file);

    } else if (file[number][1] === "complete") {
        console.log("\nThis task is already marked uncomplete. Please try a different task.")
        interface.question(menuTwo, handleMenu);
    }
}




