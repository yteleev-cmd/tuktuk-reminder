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

                "Content-Type":
                "application/json"

            },


            body:

            JSON.stringify({

                user_id:
                String(
                    getUserId()
                )

            })

        }

    );



    if(!response.ok){

        throw new Error(
            "Ошибка загрузки: "
            +
            response.status
        );

    }



    let data =
    await response.json();



    console.log(
        "RAW LOAD:",
        data
    );



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



    console.log(
        "PARSED LOAD:",
        data
    );



    if(!data.success){

        throw new Error(
            "Ошибка загрузки напоминаний"
        );

    }



    return (

        data.reminders

        ||

        []

    ).map(item=>({


        id:
        item.id
        ??
        item.ID
        ??
        item.Id,



        text:
        item.text
        ??
        item.Text
        ??
        item.текст
        ??
        "",



        date:
        item.date
        ??
        item.Date
        ??
        "",



        time:
        item.time
        ??
        item.Time
        ??
        "",



        status:
        item.status
        ??
        item.Status
        ??
        "Активно"


    }));

}









export async function createReminder(reminder){


    return sendAction({

        action:"create",

        user_id:
        String(
            getUserId()
        ),


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
        String(
            getUserId()
        ),


        id:
        String(
            id
        ),


        status:"Выполнено"

    });


}









async function sendAction(payload){


    console.log(
        "ACTION:",
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



    if(!response.ok){

        throw new Error(
            "Ошибка действия: "
            +
            response.status
        );

    }



    const text =
    await response.text();



    if(!text){

        return {
            success:true
        };

    }



    try{

        return JSON.parse(text);

    }

    catch{

        return {
            success:true,
            raw:text
        };

    }


}
