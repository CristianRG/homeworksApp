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