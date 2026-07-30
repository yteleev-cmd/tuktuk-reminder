import {
    getReminders
}
from "./state.js";


import {
    escapeHtml
}
from "./utils.js";


import {
    completeReminder
}
from "./api.js";



let currentTab = "all";



export function setTab(tab,button){


    currentTab = tab;


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

}




function getDate(item){


    return new Date(

        item.date
        +
        "T"
        +
        (
            item.time || "00:00"
        )

    );

}




function isToday(date){


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






export function render(){


    const content =
    document.getElementById(
        "content"
    );


    const now =
    new Date();


    const reminders =
    getReminders();




    const filtered =
    reminders.filter(item=>{


        const date =
        getDate(item);



        if(currentTab==="today"){

            return isToday(date);

        }




        if(currentTab==="future"){

            return (
                date >= now
                &&
                !isToday(date)
            );

        }



        return true;


    });





    if(filtered.length===0){


        content.innerHTML = `

        <div class="state">

            <div class="state-icon">
            🎉
            </div>


            <div class="state-title">
            Напоминаний нет
            </div>


            <div class="state-text">
            Всё спокойно
            </div>


        </div>

        `;


        return;

    }





    content.innerHTML =

    section(
        "🟢",
        "Напоминания",
        filtered
    );


}




function section(icon,title,items){


return `

<section class="section">


<div class="section-title">

${icon}

${title}


<span class="section-count">
${items.length}
</span>


</div>



${

items.map(item=>card(item)).join("")

}


</section>


`;

}






function card(item){


return `

<article class="reminder">


<div class="reminder-top">


<div class="reminder-icon">
🔔
</div>




<div class="reminder-content">


<div class="reminder-text">

${escapeHtml(item.text)}

</div>




<div class="reminder-date">

📅 ${escapeHtml(item.date)}

·

⏰ ${escapeHtml(item.time || "")}

</div>



</div>


</div>





<div class="reminder-actions">


<button
class="done"
onclick="completeReminder('${item.id}')">

✓ Выполнено

</button>




<button
class="more"
onclick="openReminderMenu('${item.id}')">

⋮

</button>


</div>



</article>


`;

}







// Выполнить напоминание

window.completeReminder =
async function(id){


    console.log(
        "Выполнить:",
        id
    );



    try{


        await completeReminder(id);



        if(window.loadReminders){

            window.loadReminders();

        }


    }


    catch(error){


        console.error(
            error
        );


        alert(
            "Ошибка изменения статуса"
        );


    }


};







// Меню троеточия

window.openReminderMenu =
function(id){


    console.log(
        "Меню:",
        id
    );


};






window.setTab = setTab;
