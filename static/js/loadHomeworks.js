let index = 0;
let homeworks = []
const MIN = 1;
let MAX = 1;
let date = new Date();
let day = date.getDate()
let month = date.getMonth()+1
let year = date.getFullYear()
let today = false;
let tomorrow = false;
let future = false;
let past = false;

window.addEventListener('DOMContentLoaded', async ()=> {
    const response = await fetch('/api/v1/homeworks');
    const data = await response.json();
    homeworks = data;
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
        if(homework.length < 5){
            homework.push(element);
        }else{
            newList.push(homework);
            homework = [];
        }
    });
    homeworkList['tomorrow'].forEach(element => {
        if(homework.length < 5){
            homework.push(element);
        }else{
            newList.push(homework);
            homework = [];
        }
    });
    homeworkList['future'].forEach(element => {
        if(homework.length < 5){
            homework.push(element);
        }else{
            newList.push(homework);
            homework = [];
        }
    });
    homeworkList['past'].forEach(element => {
        if(homework.length < 5){
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
            const elementIntoStatus = document.createElement('div')
            elementHomework.classList = 'card'
            elementIntoHomework.classList = "To-do"
            elementStatus.classList = "status";
            elementIntoStatus.classList = 'circle_status'
            elementIntoStatus.id = element.id
            
            elementIntoHomework.id = element.id

            let fecha = element.deadline;
            
            fecha = fecha.split(' ');
            let dayHomework = parseInt(fecha[1])
            // console.log(parseInt(dayHomework))
            // console.log(day)
            // console.log(dayHomework > day)
            
            let dateHomework = `${fecha[3]}-${date.getUTCMonth(fecha[2])+1}-${fecha[1]}`
            

            if(day.length < 2){
                day = parseInt(`0${day}`)
            }

            let fullDateToday = `${year}-${month}-${day}`
            let fullDateTomorrow = `${year}-${month}-${day+1}`
            

            if(dateHomework == fullDateToday && today == false){
                elementDate.innerHTML = `<h2>Today</h2>`;
                homeworkList.append(elementDate);
                today = true;
            }
            else if(dateHomework == fullDateTomorrow && tomorrow == false){
                elementDate.innerHTML = `<h2>Tomorrow</h2>`;
                homeworkList.append(elementDate);
                tomorrow = true;
            }
            else if(dayHomework > day+1 && future == false){
                elementDate.innerHTML = `<h2>Future</h2>`
                homeworkList.append(elementDate);
                future = true;
            }
            else if(dayHomework < day && past == false){
                elementDate.innerHTML = `<h2>Past</h2>`
                homeworkList.append(elementDate);
                past = true;
            }

            elementIntoHomework.innerHTML = `
            <p class='text-todo' id='${element.id}'>${element.subject} - ${element.title}</p>
            
            <p class='text-todo' id='${element.id}'>${element.description}</p>
            `
            if (element.status == 0){
                elementIntoStatus.style.borderColor = 'green'
            }else{
                elementIntoStatus.style.borderColor = 'red'
            }

            elementIntoHomework.addEventListener("click", (e)=> {
                const id = e.target.getAttribute("id");
                editHomework(id)
            })

            elementStatus.addEventListener('click', (e)=> {
                const id = e.target.getAttribute("id");

            })

            elementHomework.append(elementIntoHomework)
            elementStatus.append(elementIntoStatus)
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
        future = false;
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
        future = false;
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

    let id_homework = document.getElementById('homework')
    let subject = document.getElementById('subject');
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    // document.getElementById('deadline').value = "2023-05-09";

    id_homework.value = homework.id;
    subject.value = homework.subject;
    title.value = homework.title;
    description.value = homework.description;
    

    windowEdit.style.visibility = "visible"
    // deadline.value = "2023-05-09";

    const buttonClose = document.querySelector("#close-edit")
        buttonClose.addEventListener("click", ()=> {
        windowEdit.style.visibility = "hidden"
    })
}

async function changeStatus(id){
    const element = await fetch(`/api/v1/homework/${id}`);
    const data = await element.json();
    const homework = data[0];

    let status = document.getElementById(id)
    
    const response = await fetch(`/edit/${id}`,{
        method: 'POST'
    })
}