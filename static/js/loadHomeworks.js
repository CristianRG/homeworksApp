let homeworks = [];
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
    homeworks = data;
    homeworks = listHomeworks(homeworks);
    MAX = homeworks.length;
    renderHomeworks(homeworks);
    renderPagination();
    updateStatusPagina();
});

function listHomeworks(homeworkList){
    let homeworks = [];
    const newList = [];

    homeworkList['today'].forEach(element => {
        if(homeworks.length < 8){
            homeworks.push(element);
        }else{
            newList.push(homeworks);
            homeworks = [];
        }
    });
    homeworkList['tomorrow'].forEach(element => {
        if(homeworks.length < 8){
            homeworks.push(element);
        }else{
            newList.push(homeworks);
            homeworks = [];
        }
    });
    if(homeworks.length > 0){
        newList.push(homeworks);
    }
    return newList;
}

function renderHomeworks(homeworks){
    if(homeworks.length > 0){
        const homeworkList = document.querySelector('.tasks');
        homeworkList.innerHTML = '';

        homeworks[index].forEach(element => {
            const elementHomework = document.createElement('div');
            const elementDate = document.createElement('h2')
            elementHomework.classList = 'card'

            let fecha = element.deadline;
            fecha = fecha.split(' ');
            let dateHomework = `${fecha[3]}-${date.getUTCMonth(fecha[2])+1}-${fecha[1]}`

            if(dateHomework == `${year}-${month}-${day}` && today == false){
                elementDate.innerHTML = `<h2>Today</h2>`;
                homeworkList.append(elementDate);
                today = true;
            }
            else if(dateHomework == `${year}-${month}-${day+1}` && tomorrow == false){
                elementDate.innerHTML = `<h2>Tomorrow</h2>`;
                homeworkList.append(elementDate);
                tomorrow = true;
            }
            
            elementHomework.innerHTML = `
            <div class='To-do' id='${element.id}'>
                <p class='text-todo' id='${element.id}'>${element.subject} - ${element.title}</p>
            </div>
            <div class='status'>
                <div class='circle_status'>
                </div>
            </div>
            `;
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
    
    if(index == MAX){
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



