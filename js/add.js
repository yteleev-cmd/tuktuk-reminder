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



    const year =
    now.getFullYear();



    const month =
    String(
        now.getMonth()+1
    )
    .padStart(2,"0");



    const day =
    String(
        now.getDate()
    )
    .padStart(2,"0");



    const date =
    `${year}-${month}-${day}`;





    now.setMinutes(
        now.getMinutes()+10
    );




    const hours =
    String(
        now.getHours()
    )
    .padStart(2,"0");



    const minutes =
    String(
        now.getMinutes()
    )
    .padStart(2,"0");



    const time =
    `${hours}:${minutes}`;





    document
    .getElementById(
        "reminder-date"
    )
    .value =
    date;





    document
    .getElementById(
        "reminder-time"
    )
    .value =
    time;



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

            text:String(text),

            date:String(date),

            time:String(time)

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


        console.error(
            error
        );


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
