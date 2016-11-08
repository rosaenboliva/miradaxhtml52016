var t, actual, tabIdx = 1, editing = false;

$(function(){
  galeriaOriginal = [
      { persona:"Buddha - à¤¬à¥à¤¦à¥à¤§à¤¾",
         frase:"En la confrontaciÃ³n entre el arrollo y la roca, el arrollo siempre ganarÃ¡, no por la fuerza, sino por la persistencia.",
         foto:"http://www.imagexia.com/img/Cara-de-Buda.jpg"
       },
       { persona:"Khalil Gibran - Ø¬Ø¨Ø±Ø§Ù† Ø®Ù„ÙŠÙ„ Ø¬Ø¨Ø±Ø§Ù† Ø¨Ù† Ù…ÙŠØ®Ø§Ø¦Ù„ Ø¨Ù† Ø³Ø¹Ø¯",
         frase:"El silencio del envidioso estÃ¡ lleno de ruidos.",
         foto:"http://www.hannaharendtcenter.org/wp-content/uploads/2015/05/111.jpg"
       },
       { persona:"Confucio - å­”å­",
         frase: "Todo tiene belleza pero no todo el mundo la puede ver.",
         foto:"http://3.bp.blogspot.com/-VlsuMSoivLU/VeMlD-LymUI/AAAAAAABKPU/Q8PYwsFbqxg/s1600/confucio.jpeg"
       },
       { persona:"Lev NikolÃ¡ievich TolstÃ³i - Ð›ÐµÐ² ÐÐ¸ÐºÐ¾Ð»Ð°ÐµÐ²Ð¸Ñ‡ Ð¢Ð¾Ð»ÑÑ‚Ð¾Ð¹",
         frase:"Mi felicidad consiste en que sÃ© apreciar lo que tengo y no deseo con exceso lo que no tengo.",
         foto:"http://malba.s3-website-sa-east-1.amazonaws.com/wp-content/uploads/2014/09/tolstoi-05.jpg"
       },
       { persona:"PlatÃ³n - Î Î»Î¬Ï„Ï‰Î½",
         frase:"El mÃ¡s importante y principal negocio pÃºblico es la buena educaciÃ³n de la juventud.",
         foto:"https://s-media-cache-ak0.pinimg.com/236x/ee/c4/f3/eec4f3420f7024c58f1b44de233d8ecd.jpg"
       },
       { persona:"Henrik Ibsen - hÉ›nÉ¾Éªk ËˆjoËhÉ‘n ËˆÉªpsÉ™n",
         frase:"Si dudas de ti mismo, estÃ¡s vencido de antemano.",
         foto:"https://ebooks.adelaide.edu.au/i/ibsen/henrik/gosse/images/bust2.jpg"
       }
    ];
    
  if (!localStorage.galeria) {
    galeria = galeriaOriginal;
    localStorage.galeria = JSON.stringify(galeria);
  }
  else {
    galeria = JSON.parse(localStorage.galeria);
  }
  
  //se muestra el contenido
  $('#content').fadeIn(); 
  
  //Se crean las pestaÃ±as
  $( "#tabs" ).tabs();
  
  //Al cambiar a la pestaÃ±a de lista, se ocultan los botones de editar y eliminar
  $('a[href="#tab1"], a[href="#tab2"]').on('click', function(){
    tabIdx = $(this).attr('data-tabindex');
    
    if (tabIdx == 1){
      if (galeria.length > 0)
        $('#btnEdit,#btnDel').fadeIn();
    }else{
      $('#btnEdit,#btnDel').fadeOut();
    }
    
    if ($('#nuevaCita').css('display') === 'block') {
      toggleNuevaCita();
    }
  });
  
  //se oculta la opciÃ³n de nueva cita
  $('#nuevaCita').toggle();
  
  
  $('#txtCita,#txtImagen,#txtPersona').keypress(function(e){
    if (e.which === 13){
      guardarCita();
      saveDB();
    }
  });
  
  //Eventos botonera
  //ADD
  $(document).on('click', '#btnAdd', function(){
    if ($('#nuevaCita').css('display') === 'block') {
      t = setTimeout( function(){select((actual) % galeria.length);}, 3000);
    }else{
      clearTimeout(t);
    }
    toggleNuevaCita();
    $('#txtCita').focus();
  });
  
  
  //EDIT
  $(document).on('click', '#btnEdit', function(){
    if (tabIdx == 2){
      actual = $(this).attr('data-idx');
    }
    editCita();
  });
  
  
  //DELETE
  $(document).on('click', '#btnDel', function(){
    if (tabIdx == 2){
      actual = $(this).attr('data-idx');
    }
    deleteCita();
    saveDB();
  });
  
  
  //SAVE
  $(document).on('click', '#btnOk', function(){
    guardarCita();
    saveDB();
  });
  
  
  //Cuadro de confirmaciÃ³n
  $("#dialog").dialog({ 
    dialogClass: 'no-close',
    title: 'Â¿Restaurar galerÃ­a?',
    autoOpen: false,
    modal: true,
    buttons: [{
      text: 'Â¡Adelante!', 
      icons: { primary: "ui-icon-check" },
      click: function(){
        showNoCitas(false);
        restaurarDB();
        $('#carousel').animate({opacity: 0}, 'slow');
        setTimeout(function(){ $('#carousel').animate({opacity: 1}, 'slow'); }, 400);
        $(this).dialog("close"); }
    },
    {
      text: 'Mejor no...',
      icons: { primary: 'ui-icon-close' },
      click: function(){ $(this).dialog("close");}
    }]
  });
  
  
  //RESTORE
  $(document).on('click', '#btnRestore', function(){
    $('#dialog').dialog("open");
  });
  
  $("#dialog").css('display', 'none');

  
  actual = 0;
  
  if (tabIdx == 1){
    if (galeria.length > 0) {
      $('#btnEdit,#btnDel').fadeIn();
    }
    else{
      $('#btnEdit,#btnDel').fadeOut();
    }
  }else{
    $('#btnEdit,#btnDel').fadeOut();
  }

  
  if (galeria.length > 0) {
    generar_selector();
    select(actual);
    loadCitas();
  }else{
    showNoCitas(true);
  }
  
  
  $(document).tooltip({
    track: true,
    tooltipClass: 'custom-tooltip'
  });
});
// END OF READY


// FUNCIONES
function loadCitas(){
  $('#citas').html('');
  
  
  $.each(galeria, function(index, value){
    $('#citas').append('<li class="cita"><span>' + value.frase + ' ' + value.persona + '</span>' +
    '<div class="btn" data-action="edit" data-idx="'+index+'"><img class="icon-sm-mid" src="media/img/edit.png" alt="edit" title="Editar cita"/></div>'+
    '<div class="btn" data-action="del" data-idx="'+index+'"><img class="icon-sm-mid" src="media/img/X_square_red.png" alt="delete" title="Eliminar cita"/></div></li>');
  });
  
  $('div.btn[data-action="del"]').on('click', function(){
    actual = $(this).attr('data-idx');
    deleteCita();
  });
  
  $('div.btn[data-action="edit"]').on('click', function(){
    actual = $(this).attr('data-idx');
    editCita();
  });
  
  $('li.cita').disableSelection();
  $('#citas').fadeIn();
}



function guardarCita(){
  var cita = $('#txtCita').val(),
      pers = $('#txtPersona').val(),
      rutaImg = $('#txtImagen').val(),
      guardar = true;
    
  if ((cita.trim() !== ''))  {
    if (pers.trim() === ''){ 
      pers = 'AnÃ³nimo';
      
      if (rutaImg.trim() === '')
        rutaImg = 'media/img/Anonymous.svg';
    }
    else if (rutaImg.trim() === ''){
      $("#txtImagen").animate({'background-color': '#ff7c7c', 'color': '#fff'}, 'fast');
      $("#txtImagen").effect("bounce", {direction: 'right', distance: 5, times: 3}, 500);
      $("#txtImagen").animate({'background-color': '#fff', 'color': '#000'}, 'fast');
      guardar = false;
    }
      
    if (guardar){
      if (editing) {
        galeria[actual].persona = pers;
        galeria[actual].frase = cita;
        galeria[actual].foto = rutaImg;
      }
      else{
        actual = galeria.push({persona: pers,
                               frase: cita,
                               foto: rutaImg})-1;
        showNoCitas(false);
        
        if (tabIdx == 1)
          $('#btnEdit,#btnDel').fadeIn();
      }
      
      editing = false;
      
      $('#citas').fadeOut();
      setTimeout(function(){ loadCitas();}, 400);
      
      generar_selector();
      select(actual);
    }
  }
  else{
    $("#txtCita").animate({'background-color': '#ff7c7c', 'color': '#fff'}, 'fast');
    $("#txtCita").effect("bounce", {direction: 'right', distance: 5, times: 3}, 500);
    $("#txtCita").animate({'background-color': '#fff', 'color': '#000'}, 'fast');
  }
}


function toggleNuevaCita(){
  $('#nuevaCita').toggle('fadeIn');  
  
  setTimeout(function(){
    if ($('#nuevaCita').css('display') !== 'block'){
      editingIdx = -1;
      $('#txtCita').val('');
      $('#txtPersona').val('');
      $('#txtImagen').val('');
    }
  }, 600);
}


function editCita(elm){
  editing = true;
  clearTimeout(t);
  
  if ($('#nuevaCita').css('display') === 'none'){
    toggleNuevaCita();
  }
  
  $('#txtCita').val('');
  $('#txtCita').val(galeria[actual].frase);
  $('#txtPersona').val(galeria[actual].persona);
  $('#txtImagen').val(galeria[actual].foto);
  $('#txtCita').focus();
}


function deleteCita(){
  clearTimeout(t);
  $('#citas').fadeOut();
  galeria.splice(actual, 1);
  
  if (galeria.length > 0){
    galeria.sort();
    
    setTimeout(function(){ loadCitas();}, 400);
    generar_selector();
    
    if (actual > 0) 
      actual--;
      
    select(actual);
  }
  else{
    clearTimeout(t);
    showNoCitas(true);
  }
}




function select(i){
  actual = i;

  $("#carosuel_selector a").removeClass("on off").addClass(function(j){
    return (j===i) ? "on" : "off";
  });

  if ($('#nuevaCita').css('display') === 'block') {
    toggleNuevaCita();
  }
  
  $("#persona").fadeOut(function(){ if (galeria[i]) $("#persona").html(galeria[i].persona); }).fadeIn();
  $("#frase").fadeOut(function(){ if (galeria[i]) $("#frase").html(galeria[i].frase); }).fadeIn();
  $("#foto").fadeOut(function(){ if (galeria[i]) $("#foto").attr("src", galeria[i].foto); }).fadeIn();

  clearTimeout(t);
  
  t = setTimeout( function(){select((i + 1) % galeria.length);}, 3000);
}


function generar_selector(){ // regenera la botonera
  var selector = $("#selector");

  selector.html("");
  
  galeria.forEach(function(elem,i) {
    selector.append("<li><a onClick='select("+i+")'></a></li>");
  });
}

function saveDB(){
  localStorage.galeria = JSON.stringify(galeria);
}


function showNoCitas(show){
  if (show){
    $('#carousel').fadeOut();
    $('#msgNoCitas, #msgNoCitas2').fadeIn();
  }else{
    $('#msgNoCitas, #msgNoCitas2').fadeOut();
    $('#carousel').fadeIn();
  }
}

function restaurarDB(){
  galeria = galeriaOriginal;
  saveDB();
  actual = 0;
  generar_selector();
  select(actual);
  loadCitas();
  $('#btnEdit,#btnDel').fadeIn();
}