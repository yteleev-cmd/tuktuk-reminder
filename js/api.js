import {
    getUserId
}
from "./telegram.js";



const LOAD_WEBHOOK =
"https://hook.eu1.make.com/wfwptrf4nlkieqbdxoeci4mcce8t0ht3";



const ACTION_WEBHOOK =
"ВСТАВЬ_СЮДА_ОБЩИЙ_WEBHOOK";







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



    if(data.Body){

        data =
        typeof data.Body === "string"

        ?

        JSON.parse(
            data.Body
        )

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










// СОЗДАНИЕ НАПОМИНАНИЯ

export async function createReminder(reminder){


    return sendAction({

        action:
        "create",


        user_id:
        getUserId(),


        text:
        reminder.text,


        date:
        reminder.date,


        time:
        reminder.time,


        repeat:
        "",


        status:
        "Активно"


    });


}










// ВЫПОЛНЕНИЕ

export async function completeReminder(id){


    return sendAction({

        action:
        "complete",


        user_id:
        getUserId(),


        id:id,


        status:
        "Выполнено"


    });


}










// ОБЩАЯ ОТПРАВКА В MAKE

async function sendAction(payload){


    console.log(
        "Отправляем:",
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



    let result =
    await response.json();



    console.log(
        "Ответ Make:",
        result
    );



    return result;


}