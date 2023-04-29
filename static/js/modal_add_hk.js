let buttonAdd = document.querySelector('#add_task');
let windowModal = document.querySelector('#windowModal');
let buttonClose = document.querySelector('#add_close');
const buttonCloseX = document.querySelector('.close');

buttonAdd.addEventListener('click', ()=> {
    windowModal.style.visibility = 'visible';
})

buttonCloseX.addEventListener('click', ()=> {
    windowModal.style.visibility = 'hidden';
})
