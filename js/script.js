{
    const tasks = [
        {
            content: "nagrać lekcję",
            done: false,
        },
        {
            content: "zjeść pierogi",
            done: true,
        },
    ];

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
        tasks[index].done=!tasks[index].done;
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
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration:line-through\"" : ""}> 
            <button class=js-done>zrobione?</button>
          <button class=js-button>usuń zadanie</button> 
            ${task.content}
            </li>`
                ;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents ();
    };






    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}