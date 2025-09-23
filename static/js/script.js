function mostrarTareas(mes) {
    const  tareas = {
        septiembre: 
        [
            {texto: "html- css - Js Audio",url: "https://misitio.com/ej-1"},
            {texto: "html- css - Js Video",url: "https://misitio.com/ej-2"},
        ],
        octubre:[
            {texto: "html- css - Js Multiples imagenes",url: "https://misitio.com/ej-3"},
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

function ocultarMensaje() {
    const lista = document.getElementById("lista-tareas");
    lista.classList.add('oculto')
    lista.innerHTML = "";
}
