import {
    createReminder
}
from "./api.js";



function openAddReminder(){


    const sheet =
    document.getElementById(
        "add-sheet"
    );


    sheet.classList.add(
        "show"
    );


    setDefaultDateTime();


}





function setDefaultDateTime(){


    const now =
    new Date();


    const date =
    now.toISOString()
    .split("T")[0];


    now.setMinutes(
        now.getMinutes()+10
    );


    const time =
    now.toTimeString()
    .slice(0,5);



    document
    .getElementById(
        "reminder-date"
    )
    .value = date;



    document
    .getElementById(
        "reminder-time"
    )
    .value = time;


}





function closeAddReminder(){


    const sheet =
    document.getElementById(
        "add-sheet"
    );


    sheet.classList.remove(
        "show"
    );


}





async function saveReminder(){



    const text =
    document
    .getElementById(
        "reminder-text"
    )
    .value
    .trim();



    const date =
    document
    .getElementById(
        "reminder-date"
    )
    .value;



    const time =
    document
    .getElementById(
        "reminder-time"
    )
    .value;



    if(!text){


        alert(
            "Введите текст"
        );


        return;

    }



    if(!date || !time){


        alert(
            "Выберите дату и время"
        );


        return;

    }





    try{


        const button =
        document.querySelector(
            ".save-button"
        );


        button.disabled=true;

        button.innerHTML =
        "Создание...";



        await createReminder({

            text,

            date,

            time

        });




        closeAddReminder();




        document
        .getElementById(
            "reminder-text"
        )
        .value="";




        if(window.loadReminders){

            window.loadReminders();

        }


    }


    catch(error){


        alert(
            error.message
        );


    }


    finally{


        const button =
        document.querySelector(
            ".save-button"
        );


        button.disabled=false;

        button.innerHTML =
        "Создать";


    }


}





window.openAddReminder =
openAddReminder;


window.closeAddReminder =
closeAddReminder;


window.saveReminder =
saveReminder;