let tasks = {};

// obtenemos el json con tareas desde la api
async function getTasks(){

    try {
        let listTasks = await fetch('../api/v1/homeworks/');
        tasks = await listTasks.json();

    } catch (error) {
        console.log('Error '+error);
        return {error: "Content not avaliable"};
    }

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
        document.getElementById('tasks').innerHTML = `  <div class="no-task">
                                                            <i class="fi fi-rs-sparkles"></i>
                                                            Any task yet!
                                                        </div>`;
    }else{
        // iteramos sobre cada una de las tareas para agregarlas al div
        listTasks.forEach(element => {
            // comprobamos si las tareas ya fueron realizadas. true para terminadas y false para pendientes
            if (element.status == false){
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
            }
            
        });
        if(content == ''){
            document.getElementById('tasks').innerHTML = `  <div class="no-task">
                                                            <i class="fi fi-rs-sparkles"></i>
                                                            Any task yet!
                                                        </div>`;    
        }else{
            document.getElementById('tasks').innerHTML = content;
        }
    }
};

// actualizamos los contadores de tareas
function updateCountTasks(){
    let totalAsigned = getTasksList().length;
    let totalRemaining = getTasksPerDay('past').length;
    document.getElementById('total-asigned').innerHTML = totalAsigned;
    document.getElementById('total-remaining').innerHTML = totalRemaining;
}

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
                listTasks = getTasksPerDay('past');
                break;
        };
        loadTasks(listTasks);
    });
});

// cuando cargue el documento deberá ejecutar primero algunas cosas
document.addEventListener('DOMContentLoaded', ()=>{



    getTasks();

    // intervalo para verificar si se ha obtenido correctamente las tareas
    let intervalTime = 0;
    const loadingTasks = setInterval(function(){
        try {
            loadTasks(getTasksPerDay('today'));
            updateCountTasks();
            clearInterval(loadingTasks);
        } catch (error) {
            // console.log('Error... Reintentando...');
            intervalTime++;
        }

        if(intervalTime > 5){
            // alert('Error al obtener los datos...');
            clearInterval(loadingTasks);
        }
    }, 200);

    // setTimeout(()=>{
    //     loadTasks(getTasksPerDay('today'));
    //     updateCountTasks();
    // }, 1000);  
});