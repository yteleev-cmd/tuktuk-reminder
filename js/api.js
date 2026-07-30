import {
    getUserId
}
from "./telegram.js";



const LOAD_WEBHOOK =
"https://hook.eu1.make.com/wfwptrf4nlkieqbdxoeci4mcce8t0ht3";



const CREATE_WEBHOOK =
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



    if(
        !data.success
    ){

        throw new Error(
            "Ошибка загрузки напоминаний"
        );

    }



    return data.reminders || [];


}









export async function createReminder(reminder){


    const payload = {


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


    };



    console.log(
        "Отправляем в Make:",
        payload
    );



    const response =
    await fetch(

        CREATE_WEBHOOK,

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