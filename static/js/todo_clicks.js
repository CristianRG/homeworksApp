
// function clickTask(){
	
// };

// (function clickTask() => {
// 	e = document.getElementById("to_do");
// 	e.addEventListener("click", sendAlert)
// })()

// agregamos un detector de eventos a la variable task que obtiene el id del elemento to_do
// cuando se hace click esta ejecuta algo

// let task = document.getElementById("to_do").addEventListener("click", function() {
// 	// alert('you have clicked in the task! with id `${task.target}`');
// 	let value = 5;
// 	open('/edit/'+value+'/')
	
// })

// mediante el objeto documento hacemos uso de su atributo querySelectorAll para obtener todos los elementos que tengan lo especificado,
// despues iteramos sobre la lista obtenida y con una funcion anonima le agregamos un EventListener a cada elemento obtenido, finalmente estos
// escucharan cada click y guardaremos el valor de su id mediante una constante usando target.getAttribute(id)

document.addEventListener("DOMContentLoaded", ()=> {
	console.log(document.querySelectorAll('.To-do').length)
	document.querySelectorAll('.To-do').forEach(el => {
		el.addEventListener('click', e => {
			const id = e.target.getAttribute('id');
			open('/edit/'+id+'/')
		});
	});
})

async function edit(){
	const homeworks = await document.querySelectorAll(".To-do");
	console.log(homeworks.length)
}

edit()