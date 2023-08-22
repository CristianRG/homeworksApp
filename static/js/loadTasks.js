let tasks = {};

// obtenemos el json con tareas desde la api
async function getTasks(){
    let listTasks = await fetch('../api/v1/homeworks/');
    tasks = await listTasks.json();
}


// cargamos las tareas segun corresponda
function getTasksList(){
    let listTasks = [];
    tasks.today.forEach(e => {
        listTasks.push(e);
    });
    tasks.tomorrow.forEach(e => {
        listTasks.push(e);
    });
    tasks.future.forEach(e => {
        listTasks.push(e);
    });
    tasks.past.forEach(e => {
        listTasks.push(e);
    });
    return listTasks;
};

function getTasksPerDay(day){
    let listTasks = [];
    tasks[day].forEach(e => {
        listTasks.push(e);
    });
    return listTasks;
};

// cargamos la lista de tareas que recibe como parametro
function loadTasks(listTasks){
    let content = '';
    if(listTasks.length == 0){
        document.getElementById('tasks').innerHTML = `<div class="no-task">No hay ninguna tarea para mostrar</div>`;
    }else{
        // iteramos sobre cada una de las tareas para agregarlas al div
        listTasks.forEach(element => {
            content += `<div class="task">
                            <div class="info-task">
                                <h2>${element.title}</h2>
                                <p>
                                    ${element.description}
                                </p>
                            </div>
                            <div class="date-options">
                                <div class="dead-line">
                                    si
                                </div>
                                <div class="options">
                                    <span class="material-symbols-outlined">
                                        check_box
                                    </span>
                                    <span class="material-symbols-outlined">
                                        stylus
                                    </span>
                                    <span class="material-symbols-outlined">
                                        delete_forever
                                    </span>
                                </div>
                            </div>
                        </div>`
        });
        document.getElementById('tasks').innerHTML = content;
    }
};

// agregamos un escuchador de eventos a los botones para identificar cual ha sido clickeado
const buttonsDay = document.querySelectorAll('nav button');
buttonsDay.forEach(button => {
    // al hacer click en algun boton obtendremos los elementos de una lista de tareas segun el id del boton
    button.addEventListener('click', function(){

        let listTasks = [];

        switch (button.id) {
            case 'today':
                listTasks = getTasksPerDay('today');
                break;
            case 'coming':
                listTasks = getTasksPerDay('tomorrow');    
                break;
            case 'missing':
                listTasks = getTasksPerDay('future');
                break;
        };
        loadTasks(listTasks);
    });
});

// cuando cargue el documento deberá ejecutar primero algunas cosas
document.addEventListener('DOMContentLoaded', ()=>{
    getTasks();
})