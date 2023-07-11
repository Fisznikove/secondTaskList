{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };


    const taskToggleDone = (index) => {
        tasks[index].done = !tasks[index].done;
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
            <li class="list__item ${task.done ? "list__item--done" : ""}" > 
            <button class="js-done list__button list__button--done">✔</button>
            ${task.content}<button class="js-button list__button list__button--remove">🗑</button> 
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