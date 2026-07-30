import {
filterReminders,
getDate,
isToday
}
from "./reminders.js";


import {
escapeHtml,
escapeAttribute
}
from "./utils.js";




export function render(){


const content =
document.getElementById(
"content"
);



const now =
new Date();



const filtered =
filterReminders();



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




const overdue =
filtered.filter(
item=>
getDate(item)<now
);



const today =
filtered.filter(item=>

isToday(getDate(item))
&&
getDate(item)>=now

);



const future =
filtered.filter(item=>

!isToday(getDate(item))
&&
getDate(item)>=now

);



let html="";



if(overdue.length){

html += section(
"🔴",
"Просрочено",
overdue,
true
);

}



if(today.length){

html += section(
"🟡",
"Сегодня",
today
);

}



if(future.length){

html += section(
"🟢",
"Позже",
future
);

}



content.innerHTML =
html;


}






function section(
icon,
title,
items,
overdue=false
){


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

items.map(item=>

card(
item,
overdue
)

).join("")

}


</section>

`;

}





function card(
item,
overdue
){


return `


<article class="reminder ${overdue?"overdue":""}">


<div class="reminder-top">


<div class="reminder-icon">
🔔
</div>



<div class="reminder-content">


<div class="reminder-text">

${escapeHtml(item.text)}

</div>



<div class="reminder-date">

📅 ${item.date}

·

⏰ ${item.time}

</div>


</div>


</div>



<div class="reminder-actions">


<button class="done">

✓ Выполнено

</button>



<button class="more">

⋮

</button>


</div>


</article>


`;

}