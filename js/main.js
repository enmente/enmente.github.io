$('#cubitos1').addClass('up');
$('#cubitos2').addClass('down');
$('#cubitos3').addClass('up');
var tematicasInsc = [];
class Curso {
    constructor(nombre, objetivos, perfil, tematicas, tiempo, cursoDescription, photoURL, inicio, termino, precio, inscripcion, vacantes, priority,tipe,pdf) {
        this.nombre = nombre;
        this.cursoDescription = cursoDescription;
        this.objetivos = objetivos;
        this.priority = priority;
        this.tipe = tipe;
        this.photoURL = photoURL;
        this.perfil = perfil;
        this.tematicas = tematicas;
        this.tiempo = tiempo;
        this.inicio = inicio;
        this.termino = termino;
        this.precio = precio;
        this.inscripcion = inscripcion;
        this.vacantes = vacantes;
    }

}

class Objetivos {
    constructor(general, especificaciones) {
        this.general = general;
        this.especificaciones = especificaciones;
    }
}
class Tiempo {
    constructor(horas, clases, semanas, total, dias) {
        this.horas = horas;
        this.clases = clases;
        this.semanas = semanas;
        this.total = total;
        this.dias = dias;
    }
}

var cursos = [];

var interval1 = setInterval(function() {
    if ($('#cubitos1').hasClass('up')) {
        $('#cubitos1').removeClass('up');
        $('#cubitos1').addClass('down');
    } else {
        $('#cubitos1').removeClass('down');
        $('#cubitos1').addClass('up');
    }
}, 1500);

function getNameDay(inti) {
    switch (inti + 1) {
        case 1:
            {
                return "Domingo";
            }
            break;
        case 2:
            {
                return "Lunes";
            }
            break;
        case 3:
            {
                return "Martes";
            }
            break;
        case 4:
            {
                return "Miercoles";
            }
            break;
        case 5:
            {
                return "Jueves";
            }
            break;
        case 6:
            {
                return "Viernes";
            }
            break;
        case 7:
            {
                return "Sabado";
            }
            break;
    }
}

function getMonthName(inti) {
    switch (inti + 1) {
        case 1:
            {
                return "Enero";
            }
            break;
        case 2:
            {
                return "Febrero";
            }
            break;
        case 3:
            {
                return "Marzo";
            }
            break;
        case 4:
            {
                return "Abril";
            }
            break;
        case 5:
            {
                return "Mayo";
            }
            break;
        case 6:
            {
                return "Junio";
            }
            break;
        case 7:
            {
                return "Julio";
            }
            break;
        case 8:
            {
                return "Agosto";
            }
            break;
        case 9:
            {
                return "Setiembre";
            }
            break;
        case 10:
            {
                return "Octubre";
            }
            break;
        case 11:
            {
                return "Noviembre";
            }
            break;
        case 12:
            {
                return "Diciembre";
            }
            break;
    }
}

function getDate(timeStamp) {
    var day = new Date(timeStamp).getDate();
    var dayofWeek = new Date(timeStamp).getDay();
    var dayName = getNameDay(day);
    var monthName = getMonthName(new Date(timeStamp).getMonth());
    return getNameDay(dayofWeek)+' '+day+' de '+monthName;
}


$('#menuFixed').click(function(event) {
    $('#menuContainer').toggleClass('meanuAppear');;
});
var cursos = [];
$(document).ready(function() {
    var scroll = $(window).scrollTop();
    var totalHeight = $(window).height();
    $('#headerContainer').attr('style', 'opacity:' + (1 - scroll / totalHeight * 2));
    var database = firebase.database();

    database.ref('Cursos').once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.child('available').val()) {
                    var curso = new Curso();
                    curso.nombre = childSnapshot.child('Nombre').val();
                    curso.photoURL = childSnapshot.child('photoURL').val();
                    curso.cursoDescription = childSnapshot.child('Descripcion').val();
                    curso.perfil = childSnapshot.child('Perfil').child('Detalle').val();
                    curso.inicio = childSnapshot.child('fechaClases').val();
                    curso.termino = childSnapshot.child('fechaClasesTerm').val();
                    curso.precio = childSnapshot.child('precio').val();
                    curso.vacantes = childSnapshot.child('vacantes').val();
                    curso.inscripcion = childSnapshot.child('fechaInsc').val();
                    curso.tipe = childSnapshot.child('tipe').val();
                    curso.priority = childSnapshot.child('priority').val();
                    curso.pdf = childSnapshot.child('pdf').val();
                    var objEspec = [];
                    var tematicas = [];
                    curso.objetivos = new Objetivos();
                    childSnapshot.child('Objetivos').child('Especificos').forEach(function(childSnapshot2) {
                        objEspec.push(childSnapshot2.val());
                    });
                    curso.objetivos.general = childSnapshot.child('Objetivos').child('General').val();
                    curso.objetivos.especificaciones = objEspec;
                    var dias = [];
                    childSnapshot.child('Dias').forEach(function(childSnapshot4) {
                        dias.push(childSnapshot4.val());
                    });
                    curso.tiempo = new Tiempo(
                        childSnapshot.child('Tiempo').child('horas').val(),
                        childSnapshot.child('Tiempo').child('clases').val(),
                        childSnapshot.child('Tiempo').child('semanas').val(),
                        childSnapshot.child('Tiempo').child('total').val(),
                        dias
                    );
                    childSnapshot.child('Tematicas').forEach(function(childSnapshot3) {
                        tematicas.push(childSnapshot3.val());
                    });
                    curso.tematicas = tematicas;
                    cursos.push(curso);
                }
            });
            cursos.sort(function(a, b){return a.priority-b.priority});
            cursos.forEach(function(curso) {

                var index = (cursos.indexOf(curso) + 1);
                tagHTML =
        '<div class="curso">'+
            '<div class="cursoImage">'+
                '<div class="infoWrapper imageImage" style="background-image: url('+curso.photoURL+');">'+
                    '<div style="height: 100%; width: 100%; background: rgba(0,0,0,0.4);display: flex;justify-content: center;align-items: flex-end;">'+
                    ' <img draggable=false src="../img/fondo_blanco.png" style="height: 150px;transform: rotate(180deg) translateY(-1px); width: 100%">'+
                    '</div>'+
                '</div>'+
                '<div class="info">'+
                        '<h1 class="tipeCurso">'+curso.tipe+'</h1>'+
                        '<h2  class="nombreCurso">'+curso.nombre+'</h2>'+
                        '<div id="cursoDescripcion'+index+'" class="cursoDescripcion">'+ curso.cursoDescription+'</div>'+
                        '<h2 id="suspendido'+index+'">...</h2>'+
                        '<div id="readMore'+index+'" class="readMore">Leer más</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Perfil:</div><div id="perfil" class="answer">'+(curso.perfil)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Precio:</div><div id="precio" class="answer">S/ '+(curso.precio)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Cierre de inscripcion:</div><div id="inscripcion" class="answer">'+getDate(curso.inscripcion)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Inicio del taller:</div><div id="inicio" class="answer">'+getDate(curso.inicio)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Fin del taller:</div><div id="termino" class="answer">'+getDate(curso.termino)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Vacantes:</div><div id="vacantes" class="answer">'+(curso.vacantes)+'</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Horas semanales:</div><div id="horas" class="answer">'+(curso.tiempo.total)+' horas</div>'+
                        '</div>'+
                        '<div class="listTile">'+
                            '<div class="labeli">Duración:</div><div id="duracion" class="answer">'+(curso.tiempo.semanas)+' semanas</div>'+
                        '</div>'+
                        '<div class="primaryButtonWrapper">'+
                            '<a href="'+curso.pdf+'" id="pdf'+index+'" style="margin: auto;font-size: 1em;padding-left: 20px;max-width: 400px;padding-right: 20px; background-color: white; color:#EC1748" class="primaryButton pdf" download>Ver PDF</a>'+
                        '</div>'+
                        '<div style="height:30px"></div>'+
                        '<div class="primaryButtonWrapper">'+
                            '<div id="inscribirme'+index+'" style="margin: auto;font-size: 1em;padding-left: 20px;max-width: 400px;padding-right: 20px;"class="primaryButton inscribirme">Inscribirme</div>'+
                        '</div>'+
                    '</div>'+
            '</div>'+
        '</div>';
                document.getElementById('cursosContainer').insertAdjacentHTML('beforeend', tagHTML);
            });
        });
});
$('#modalRegister').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
});


$('#before').click(function(event) {
    var actual = $("div:has(.actual)");
    var next = $("div:has(.actual)").next();
    actual.removeClass('actual');
    next.addClass('actual');
});
function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}
function tematicaClick(e){
     e = e || window.event;
    var target = e.target || e.srcElement;

    if(!$(target).hasClass('tematicaClicked')){
        $(target).addClass('tematicaClicked');
        tematicasInsc.push(target.innerHTML);
    }else{
        $(target).removeClass('tematicaClicked');
        tematicasInsc.splice($.inArray(target.innerHTML, tematicasInsc), 1);
    }
    console.log(tematicasInsc);
}

$(document).on('click', '.readMore', function(event) {
    event.preventDefault();
    var index = event.target.id.replace(/^\D+/g, '');
    if ($('#readMore' + index).text() == 'Leer menos') {
        $('#cursoDescripcion' + index).removeAttr('style');
        $('#suspendido' + index).removeAttr('style');
        $('#readMore' + index).text('Leer mas');
    } else {
        $('#cursoDescripcion' + index).attr('style', 'height: auto;');
        $('#suspendido' + index).attr('style', 'display: none;');
        $('#readMore' + index).text('Leer menos');
    }
});

$(document).on('click', '.inscribirme', function(event) {
    event.preventDefault();
    
    var index = event.target.id.replace(/^\D+/g, '');
    var curso = cursos[index-1];
    $('#modali').addClass('showModal');
    $('#nombreTaller').html(curso.nombre);

});

$('#modali').click(function(event) {
    $('#modali').removeClass('showModal');
});
$('#congrats').click(function(event) {
    event.stopPropagation();
    event.preventDefault();
    $('#congrats').removeClass('showModal');
});
$('#terminar').click(function(event) {
    event.stopPropagation();
    event.preventDefault();
    if($('#inscripcionForm')[0].checkValidity()){
        var e = document.getElementById("Region");
        var region = e.options[e.selectedIndex].value;
        var database = firebase.database();
        var unique = database.ref('Inscripciones').push();
        unique.set({
                    "Nombre":$('#nombres').val(),
                    "Apellido":$('#apellidos').val(),
                    "Correo": $('#correo').val(),
                    "Region": region,
                    "Contacto": $('#contacto').val(),
                    "Curso": $('#nombreTaller').val(),
            });
            tematicasInsc.forEach(element => {
                unique.child('Tematicas').push().set(element);
            });
       var template_params = {
           "reply_to": "noreply@enmente.pe",
           "inscriptor_name":$('#nombres').val(),
           "inscriptor_curso": $('#nombreTaller').val(),
           "inscriptor_correo":  $('#correo').val(),
           "inscriptor_contacto": $('#contacto').val()
        }

        var service_id = "default_service";
        var template_id = "template_FCZQf2QL";
        emailjs.send(service_id,template_id,template_params);
         $('#modali').removeClass('showModal');
         $('#congrats').addClass('showModal');
    }else{
        alert('¡No has llenado todo el  formulario!');
    }
});


setTimeout(function() {
    var interval2 = setInterval(function() {
        if ($('#cubitos2').hasClass('up')) {
            $('#cubitos2').removeClass('up');
            $('#cubitos2').addClass('down');
        } else {
            $('#cubitos2').removeClass('down');
            $('#cubitos2').addClass('up');
        }
    }, 1500);
}, 500);

setTimeout(function() {
    var interval3 = setInterval(function() {
        if ($('#cubitos3').hasClass('up')) {
            $('#cubitos3').removeClass('up');
            $('#cubitos3').addClass('down');
        } else {
            $('#cubitos3').removeClass('down');
            $('#cubitos3').addClass('up');
        }
    }, 1500);
}, 1500)

$('#cubitos4').addClass('down');
$('#cubitos5').addClass('up');
$('#cubitos6').addClass('down');

var interval4 = setInterval(function() {
    if ($('#cubitos5').hasClass('up')) {
        $('#cubitos5').removeClass('up');
        $('#cubitos5').addClass('down');
    } else {
        $('#cubitos5').removeClass('down');
        $('#cubitos5').addClass('up');
    }
}, 1500);

setTimeout(function() {
    var interval5 = setInterval(function() {
        if ($('#cubitos4').hasClass('up')) {
            $('#cubitos4').removeClass('up');
            $('#cubitos4').addClass('down');
        } else {
            $('#cubitos4').removeClass('down');
            $('#cubitos4').addClass('up');
        }
    }, 1500);
}, 500);

setTimeout(function() {
    var interval6 = setInterval(function() {
        if ($('#cubitos6').hasClass('up')) {
            $('#cubitos6').removeClass('up');
            $('#cubitos6').addClass('down');
        } else {
            $('#cubitos6').removeClass('down');
            $('#cubitos6').addClass('up');
        }
    }, 1500);
}, 1500)

$(window).scroll(function(event) {
    var scroll = $(window).scrollTop();
    var totalHeight = $(window).height();
    var totalWidth = $(window).width();
    var imageHeight = Math.tan(Math.PI/6)*totalWidth*0.5;
    $('#headerContainer').attr('style', 'opacity:' + (1 - scroll / totalHeight * 2));
    //console.log(scroll-totalHeight-imageHeight);
    if ((scroll-totalHeight) >= 0) {
        var translate=Math.min(((scroll-totalHeight-imageHeight)),0);
        $('.title').addClass('displayed');
        $('#talleres').addClass('displayed');
        //$('#somos').css('transform', 'translateY('+translate+'px)');
    } else {
        $('.title').removeClass('displayed');
        $('#talleres').removeClass('displayed');
        //$('#somos').css('transform', 'translateY(' + (-scroll) + 'px)');      
    }

});

function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}
$('#talleres').click(function(event) {
    goToByScroll('cursosContainer');
});
function dragy(event) {
    var width = $(event.target).width() / 2;
    var height = $(event.target).height() / 2;
    var positionX = event.touches[0].clientX - width;
    var positionY = event.touches[0].clientY - height;
    var totalWidth = $(window).width();
    var totalHeight = $(window).height();
    $(event.target).attr('style', 'left:' + positionX / totalWidth * 100 + "% !important; " + 'top:' + positionY / totalHeight * 100 + "% !important");

}

function dragy2(event) {
    var width = $(event.target).width() / 2;
    var height = $(event.target).height() / 2;
    $(document).on("mousemove", function(event2) {
        var positionX = event2.pageX - width;
        var positionY = event2.pageY - height;
        var totalWidth = $(window).width();
        var totalHeight = $(window).height();
        $(event.target).attr('style', 'left:' + positionX / totalWidth * 100 + "% !important; " + 'top:' + positionY / totalHeight * 100 + "% !important; " + 'bottom:' + (100 - positionY / totalHeight * 100) + "% !important; " + 'right:' + (100 - positionY / totalHeight * 100) + "% !important; ");
    });
}

var cubito1 = document.getElementById("cubitos1");
var cubito2 = document.getElementById("cubitos2");
var cubito3 = document.getElementById("cubitos3");
var cubito4 = document.getElementById("cubitos4");
var cubito5 = document.getElementById("cubitos5");
var cubito6 = document.getElementById("cubitos6");

$('#cubitos1').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos1").off();
    $(document).off();
});
$('#cubitos2').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos2").off();
    $(document).off();
});
$('#cubitos3').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos3").off();
    $(document).off();
});
$('#cubitos4').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos4").off();
    $(document).off();
});
$('#cubitos5').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos5").off();
    $(document).off();
});
$('#cubitos6').mousedown(function(event) {
    dragy2(event);
});
$(document).mouseup(function() {
    $("#cubitos6").off();
    $(document).off();
});
cubito1.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});


cubito2.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});
cubito3.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});
cubito4.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});
cubito5.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});
cubito6.addEventListener('touchmove', (event) => {
    event.stopPropagation();
    dragy(event);
}, {
    capture: true,
    passive: true
});

$('.icon').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
});
$('#empecemos').click(function(event) {
    event.preventDefault();

    $('#maskMenu').css('display', 'flex !important');
    $('#maskMenu').addClass('displayed');
});
$('#maskMenu').click(function(event) {
    event.preventDefault();
    $('#maskMenu').removeClass('displayed');
    $('#maskMenu').css('display', 'none !important');

});