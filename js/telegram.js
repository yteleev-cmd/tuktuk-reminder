export const tg =
window.Telegram
?
window.Telegram.WebApp
:
null;



if(tg){

    tg.ready();

    tg.expand();

}




export function getUserId(){


    if(
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ){

        return String(
            tg.initDataUnsafe.user.id
        );

    }


    // тест в браузере

    return "264483752";


}