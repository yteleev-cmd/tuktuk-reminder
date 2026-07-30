import {
    getUserId
}
from "./telegram.js";


const WEBHOOK_URL =
"https://hook.eu1.make.com/wfwptrf4nlkieqbdxoeci4mcce8t0ht3";



export async function fetchReminders(){


    const response =
    await fetch(

        WEBHOOK_URL,

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                user_id:getUserId()

            })

        }

    );



    const text =
    await response.text();



    console.log(
        "Сырой ответ Make:",
        text
    );



    let data =
    JSON.parse(text);



    // если Make завернул в Body

    if(data.Body){

        data =
        typeof data.Body === "string"

        ?

        JSON.parse(data.Body)

        :

        data.Body;

    }



    if(data.body){

        data =
        typeof data.body === "string"

        ?

        JSON.parse(data.body)

        :

        data.body;

    }



    console.log(
        "Ответ Make:",
        data
    );



    if(
        !data ||
        data.success !== true
    ){

        throw new Error(
            "Некорректный ответ Make"
        );

    }



    let result =
    data.reminders || [];



    if(
        typeof result === "string"
    ){

        result =
        JSON.parse(result);

    }



    if(!Array.isArray(result)){

        result =
        [result];

    }



    return result.map(item=>{


        if(
            typeof item === "string"
        ){

            item =
            JSON.parse(item);

        }



        return {

            id:String(
                item.id ?? ""
            ),


            text:String(
                item.text ??
                "Без текста"
            ),


            date:String(
                item.date ??
                ""
            ),


            time:String(
                item.time ??
                ""
            ),


            repeat:String(
                item.repeat ??
                ""
            ),


            status:String(
                item.status ??
                ""
            )

        };


    });


}