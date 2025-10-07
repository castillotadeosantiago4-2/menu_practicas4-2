    function mostrarTareas(mes) {
    const  tareas = {
        septiembre:
        [
            {texto: 'VIDEO - CSS - JS', url:'/static/proyectos/P1video4-2/videos.html'},
            {texto: "AUDIO- CSS - JS AUDIO",url: "/static/proyectos/P2audio4-2/audio.html"},
        ],
        octubre:[
            {texto: "“Práctica Fotografías Varios –CASTILLOTADEO",url: "static/proyectos/Práctica 4 Fotografías/index.html"},
            {texto: "html- css - Js Combinacion objetos",url: "https://misitio.com/ej-4"},
        ],
        noviembre:  [
            {texto: "html- css - Js Responsivos",url: "https://misitio.com/ej-5"},
            {texto: "html- css - Js Animacion",url: "https://misitio.com/ej-6"},
        ]


    };
    const lista = document.getElementById("lista-tareas");
    lista.innerHTML = "";
    lista.classList.add('oculto')

    tareas[mes].forEach(tarea => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${tarea.url}" target="_blank">${tarea.texto}</a>`;
        lista.appendChild(li);
        lista.classList.remove('oculto')




    });
}
function mostrarMensaje() {
    const mensaje = document.getElementById("mensaje");
    if (comentario.value.trim() === "") {
        alert("Por favor, ingresa un comentario antes de enviar.");
    } else {
        alert("Gracias por tu retroalimentacion.");
        document.getElementById("comentario").value = "";
    }

}

function ocultarLista()
{
    const lista = document.getElementById('lista-tareas');
    lista.classList.add('oculto');
    lista.innerHTML = '';
}