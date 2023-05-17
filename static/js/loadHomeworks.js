let index = 0;
const MIN = 1;
let MAX = 1;
let date = new Date();
let day = date.getDate()
let month = date.getMonth()+1
let year = date.getFullYear()
let today = false;
let tomorrow = false;

window.addEventListener('DOMContentLoaded', async ()=> {
    const response = await fetch('/api/v1/homeworks');
    const data = await response.json();
    let homeworks = data;
    homeworks = listHomeworks(homeworks);
    MAX = homeworks.length;
    renderHomeworks(homeworks);
    renderPagination();
    updateStatusPagina();
});

function listHomeworks(homeworkList){
    let homework = [];
    const newList = [];

    homeworkList['today'].forEach(element => {
        if(homework.length < 8){
            homework.push(element);
        }else{
            newList.push(homework);
            homework = [];
        }
    });
    homeworkList['tomorrow'].forEach(element => {
        if(homework.length < 8){
            homework.push(element);
        }else{
            newList.push(homework);
            homework = [];
        }
    });
    if(homework.length > 0){
        newList.push(homework);
    }
    return newList;
}


function renderHomeworks(homeworks){
    if(homeworks.length > 0){
        const homeworkList = document.querySelector('.tasks');
        homeworkList.innerHTML = '';

        homeworks[index].forEach(element => {
            const elementHomework = document.createElement('div');
            const elementIntoHomework = document.createElement("div")
            const elementStatus = document.createElement('div');
            const elementDate = document.createElement('h2')
            elementHomework.classList = 'card'
            elementIntoHomework.classList = "To-do"
            elementStatus.classList = "status";
            elementIntoHomework.id = element.id

            let fecha = element.deadline;
            fecha = fecha.split(' ');
            let dateHomework = `${fecha[3]}-${date.getUTCMonth(fecha[2])+1}-${fecha[1]}`

            if(dateHomework == `${year}-${month}-0${day}` && today == false){
                elementDate.innerHTML = `<h2>Today</h2>`;
                homeworkList.append(elementDate);
                today = true;
            }
            else if(dateHomework == `${year}-${month}-0${day+1}` && tomorrow == false){
                elementDate.innerHTML = `<h2>Tomorrow</h2>`;
                homeworkList.append(elementDate);
                tomorrow = true;
            }

            elementIntoHomework.innerHTML = `
            <p class='text-todo' id='${element.id}'>${element.subject} - ${element.title}</p>
            <br>
            <p class='text-todo' id='${element.id}'>${element.description}</p>
            `
            elementStatus.innerHTML = `
            <div class='circle_status'>
            </div>
            `

            elementHomework.append(elementIntoHomework)
            elementHomework.append(elementStatus)

            // elementHomework.innerHTML = `
            // <div class='To-do' id='${element.id}'>
            //     <p class='text-todo' id='${element.id}'>${element.subject} - ${element.title}</p>
            // </div>
            // <div class='status'>
            //     <div class='circle_status'>
            //     </div>
            // </div>
            // `;
            elementIntoHomework.addEventListener("click", (e)=> {
                const id = e.target.getAttribute("id");
                editHomework(id)
            })
            
            homeworkList.append(elementHomework)

        });
    }
};

function renderPagination(){
    let page = index;
    const pagina = document.querySelector('.pagina');
    pagina.innerHTML = '';
    const indexPagina = document.createElement('p');
    indexPagina.innerHTML = `<p>${page+1}</p>`; 
    pagina.append(indexPagina)
}

const nextPage = document.querySelector('.next');
const buttonNext = document.getElementById('next-page');
nextPage.addEventListener('click', () => {
    if(index+1 < MAX){
        buttonNext.disabled = false;
        index++;
        today = false;
        tomorrow = false;
        renderHomeworks(homeworks);
        renderPagination();
    }
    if(index+1 == MAX){
        buttonNext.disabled = true;
    }

    updateStatusPagina();
});

const beforePage = document.querySelector('.before');
const buttonBefore = document.getElementById('before-page');
beforePage.addEventListener('click', () => {
    if(index+1 > MIN){
        buttonBefore.disabled = false;
        index--;
        today = false;
        tomorrow = false;
        renderHomeworks(homeworks);
        renderPagination();
    }
    if(index+1 == MIN){
        buttonBefore.disabled = true;
    }

    updateStatusPagina();
});

function updateStatusPagina(){
    
    if(index+1 == MAX){
        buttonNext.disabled = true;
    }
    if(index+1 == MIN){
        buttonBefore.disabled = true;
    }

    if(index+1 < MAX){
        buttonNext.disabled = false;
    }
    else if(index+1 > MIN){
        buttonBefore.disabled = false;
    }
    
}

async function editHomework(id){

    const element = await fetch(`/api/v1/homework/${id}`)
    const data = await element.json()
    const homework = data[0]

    const windowEdit = document.querySelector("#windowEdit");

    let subject = document.getElementById('subject');
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    // document.getElementById('deadline').value = "2023-05-09";

    subject.value = homework.subject;
    title.value = homework.title;
    description.value = homework.description;
    

    windowEdit.style.visibility = "visible"
    // deadline.value = "2023-05-09";

    const buttonClose = document.querySelector("#close-edit")
        buttonClose.addEventListener("click", ()=> {
        windowEdit.style.visibility = "hidden"
    })

    
    console.log(deadline.value)
}