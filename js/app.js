import {
    fetchReminders
}
from "./api.js";


import {
    setReminders
}
from "./state.js";


import {
    render
}
from "./render.js";





window.loadReminders =
async function(){


    const content =
    document.getElementById(
        "content"
    );


    content.innerHTML =
    '<div class="loader"></div>';



    try{


        const data =
        await fetchReminders();



        setReminders(data);



        render();


    }


    catch(error){


        console.error(
            error
        );


        content.innerHTML = `

        <div class="state">


            <div class="state-icon">
            ⚠️
            </div>


            <div class="state-title">
            Ошибка
            </div>


            <div class="state-text">

            ${error.message}

            </div>


        </div>

        `;


    }


};





window.openAddReminder =
function(){


    alert(
        "Создание напоминания"
    );


};





loadReminders();