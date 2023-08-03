{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }];

        render();
    };

    const removeTask = (index) => {
        tasks = [...tasks.slice(0, index),
        ...tasks.slice(index + 1)];
        render();
    };

    const taskToggleDone = (index) => {
        tasks = [...tasks.slice(0, index),
        {
            ...tasks[index],
            done: !tasks[index].done,
        },
        ...tasks.slice(index + 1)];
        render();
    };

    const toggleAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    }

    const bindEvents = () => {
        const buttonRemove = document.querySelectorAll(".js-button");
        buttonRemove.forEach((buttonRemove, index) => {
            buttonRemove.addEventListener("click", () => {
                removeTask(index);
            });

        });

    };

    const bindToggleDoneEvents = () => {
        const buttonToggleDone = document.querySelectorAll(".js-done");
        buttonToggleDone.forEach((buttonToggleDone, index) => {
            buttonToggleDone.addEventListener("click", () => {
                taskToggleDone(index);
            });

        });
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list__item ${task.done && hideDoneTask ? "tasks__item--hidden" : ""}"> 
         <button class="js-done list__button list__button--done">✔</button>
        <span class="task__list ${task.done ? "list__item--done" : ""}" > 
        ${task.content}</span>
        <button class="js-button list__button list__button--remove">🗑</button> 
        </li>`
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const renderButtons = () => {
        let htmlButtonString = "";
        if (tasks.length === 0) {
            htmlButtonString = "";
        }
        else {
            htmlButtonString += `
        <button class= "js-toggleHideDoneTask header__buttons">
        ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class= "header__buttons tasks__button--hiddenAllDone js-doneAllTasks"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie
        </button>`
        }

        document.querySelector(".js-buttons").innerHTML = htmlButtonString;

    };

    const bindButtonEvents = () => {
        const hideTaskButton = document.querySelector(".js-toggleHideDoneTask");

        if (hideTaskButton) {
            hideTaskButton.addEventListener("click", toggleHideDoneTask);
        }

        const doneAllTasks = document.querySelector(".js-doneAllTasks");
        if (doneAllTasks) {
            doneAllTasks.addEventListener("click", toggleAllTaskDone)
        }
    };

    const render = () => {
        renderTask();
        renderButtons();
        bindEvents();
        bindToggleDoneEvents();
        bindButtonEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const cleanForm = document.querySelector(".js-newTask");


        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            cleanForm.value = "";
        }
        cleanForm.focus();

    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}