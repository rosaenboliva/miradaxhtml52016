var galeria = [
   { persona:"Buddha ",
     frase:"En la confrontaciÃ³n entre el arrollo y la roca, el arrollo siempre ganarÃ¡, no por la fuerza, sino por la persistencia.",
     foto:"http://www.imagexia.com/img/Cara-de-Buda.jpg"
   },
   { persona:"Khalil Gibran ",
     frase:"El silencio del envidioso estÃ¡ lleno de ruidos.",
     foto:"http://www.hannaharendtcenter.org/wp-content/uploads/2015/05/111.jpg"
   },
   { persona:"Confucio ",
     frase: "Todo tiene belleza pero no todo el mundo la puede ver.",
     foto:"http://3.bp.blogspot.com/-VlsuMSoivLU/VeMlD-LymUI/AAAAAAABKPU/Q8PYwsFbqxg/s1600/confucio.jpeg"
   },
   { persona:"Lev Nikolievich Tolst",
     frase:"Mi felicidad consiste en que sÃ© apreciar lo que tengo y no deseo con exceso lo que no tengo.",
     foto:"http://malba.s3-website-sa-east-1.amazonaws.com/wp-content/uploads/2014/09/tolstoi-05.jpg"
   },
   { persona:"PlatÃ³n - ",
     frase:"El mÃ¡s importante y principal negocio pÃºblico es la buena educaciÃ³n de la juventud.",
     foto:"https://s-media-cache-ak0.pinimg.com/236x/ee/c4/f3/eec4f3420f7024c58f1b44de233d8ecd.jpg"
   },
   { persona:"Henrik Ibsen - ",
     frase:"Si dudas de ti mismo, estÃ¡s vencido de antemano.",
     foto:"https://ebooks.adelaide.edu.au/i/ibsen/henrik/gosse/images/bust2.jpg"
   },
   { persona:"Jean Cocteau ",
     frase:"Un vaso medio vacÃ­o de vino es tambiÃ©n uno medio lleno, pero una mentiras a medias, de ningÃºn modo es una media verdad.",
     foto:"http://forosdelavirgen.org/wp-content/uploads/2015/03/jesus-buddha-world.png"
   }
];
 
//clonamos la galeria por si se quiere restaurar posteriormente
var galeriaInicial = fnClone(galeria);
function fnClone (obj) {
    return JSON.parse(JSON.stringify(obj));
}