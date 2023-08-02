{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

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

    const bindEvents = () => {
        const buttonRemove = document.querySelectorAll(".js-button");
        buttonRemove.forEach((buttonRemove, index) => {
            buttonRemove.addEventListener("click", () => {
                removeTask(index);
            });

        });


        const buttonToggleDone = document.querySelectorAll(".js-done");
        buttonToggleDone.forEach((buttonToggleDone, index) => {
            buttonToggleDone.addEventListener("click", () => {
                taskToggleDone(index);
            });

        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item"> 
             <button class="js-done list__button list__button--done">✔</button>
            <span class="task__list ${task.done ? "list__item--done" : ""}" > 
            ${task.content}</span>
            <button class="js-button list__button list__button--remove">🗑</button> 
            </li>`
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
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