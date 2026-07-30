import {
    getUserId
}
from "./telegram.js";



const LOAD_WEBHOOK =
"https://hook.eu1.make.com/wfwptrf4nlkieqbdxoeci4mcce8t0ht3";



const ACTION_WEBHOOK =
"https://hook.eu1.make.com/r7xkkfr1ug4a33v54zqi8ebf0hl71zyx";






export async function fetchReminders(){


    const response =
    await fetch(

        LOAD_WEBHOOK,

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                user_id:
                getUserId()

            })

        }

    );



    let data =
    await response.json();



    console.log(
        "Загрузка:",
        data
    );



    if(data.Body){

        data =
        typeof data.Body === "string"

        ?

        JSON.parse(data.Body)

        :

        data.Body;

    }



    if(!data.success){

        throw new Error(
            "Ошибка загрузки напоминаний"
        );

    }



    return data.reminders || [];


}









export async function createReminder(reminder){


    return sendAction({

        action:"create",


        user_id:
        getUserId(),


        text:
        reminder.text,


        date:
        reminder.date,


        time:
        reminder.time,


        repeat:"",


        status:"Активно"

    });


}









export async function completeReminder(id){


    return sendAction({

        action:"complete",


        user_id:
        getUserId(),


        id:id,


        status:"Выполнено"

    });


}









async function sendAction(payload){


    console.log(
        "Действие:",
        payload
    );



    const response =
    await fetch(

        ACTION_WEBHOOK,

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },


            body:

            JSON.stringify(
                payload
            )

        }

    );



    return await response.json();


}
