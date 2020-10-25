window.onscroll = function(){scrollFunction()};

function scrollFunction(){

    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        document.querySelector('.header').style.top = '-15%';
    }else{
        document.querySelector('.header').style.top = '0%';
    }
}