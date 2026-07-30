import {
fetchReminders
}
from "./api.js";


import {
setReminders,
setCurrentTab
}
from "./state.js";


import {
sortReminders
}
from "./reminders.js";


import {
render
}
from "./render.js";





window.loadReminders =
async function(){


    try {


        const data =
        await fetchReminders();



        setReminders(
            data
        );



        sortReminders();



        render();



    }
    catch(error){


        console.error(
            error
        );


        document
        .getElementById("content")
        .innerHTML =

        `

        <div class="state">

            <div class="state-icon">
            ⚠️
            </div>


            <div class="state-title">
            Ошибка загрузки
            </div>


            <div class="state-text">
            ${error.message}
            </div>


        </div>

        `;


    }


};






window.setTab =
function(
    tab,
    button
){


    setCurrentTab(
        tab
    );



    document
    .querySelectorAll(".tab")
    .forEach(item=>{

        item.classList.remove(
            "active"
        );

    });



    button.classList.add(
        "active"
    );



    render();


};





loadReminders();