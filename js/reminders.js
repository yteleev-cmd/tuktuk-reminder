import {
    reminders,
    currentTab
}
from "./state.js";



export function sortReminders(){


    reminders.sort(

        (a,b)=>

        getDate(a)
        -
        getDate(b)

    );


}



export function getDate(item){

    return new Date(

        item.date
        +
        "T"
        +
        (
            item.time
            ||
            "00:00"
        )

    );

}



export function isToday(date){


    const now =
    new Date();


    return (

        date.getFullYear()
        ===
        now.getFullYear()

        &&

        date.getMonth()
        ===
        now.getMonth()

        &&

        date.getDate()
        ===
        now.getDate()

    );

}




export function filterReminders(){


    const now =
    new Date();



    return reminders.filter(item=>{


        const date =
        getDate(item);



        if(
            currentTab === "today"
        ){

            return isToday(date);

        }



        if(
            currentTab === "future"
        ){

            return (

                date >= now

                &&

                !isToday(date)

            );

        }



        return true;


    });


}