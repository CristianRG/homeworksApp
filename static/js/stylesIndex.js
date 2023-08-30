document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('today');
    button.classList.add('active');
});

const buttons = document.querySelectorAll('nav button');

buttons.forEach((e)=>{
    e.addEventListener('click', function(){
        buttons.forEach((element)=>{
            element.classList.remove('active');
        });
    e.classList.add('active');
   });
});

const modalWindowAddTask = document.getElementById('new-task');
modalWindowAddTask.addEventListener('click', ()=>{
    // mostramos la ventana modal
    document.getElementById('modal-window').style.display = 'flex';
});

// funcion para comprobar que todos los campos han sido llenados
document.getElementById('add-new').disabled = true;
function checkFields(){
    const title = document.getElementById('title').value;
    const date = document.getElementById('due-date').value;
    
    if((title.trim('').length < 1 || date.trim('').length < 1)){
        console.log('dhshdskh')
        document.getElementById('add-new').disabled = true;
    }else{
        document.getElementById('add-new').disabled = false;
    }

}

const inputTitle = document.getElementById('title').addEventListener('keyup', checkFields);
const inputDate = document.getElementById('due-date').addEventListener('change', checkFields);

const closeWindow = document.getElementById('cancel');
closeWindow.addEventListener('click', (event)=>{
    event.preventDefault();
    // limpiamos los campos del formulario y ocultamos el modal
    document.getElementById('title').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('description').value = '';
    // cerramos la ventana en caso de cancelar la operacion
    document.getElementById('modal-window').style.display='none';
});