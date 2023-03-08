let eventos = data.events;
let query = location.search
console.log(query)
let params = new URLSearchParams(query)
console.log(params)
let nroEvento = params.get("nombre") * 1
console.log(nroEvento)


console.log(data.events)
console.log(nroEvento*1)
let evento = data.events
console.log(evento)
let detalle = evento.find(each => each._id === nroEvento*1)
console.log("imprimo array detalle")
    
console.log(detalle)




// @cardDetails define la card de detalle dinámica

function cardDetails(evento) {
    return `
        <div class="tarjeta">
            <img class="img-tarjeta" src="${evento.image}" alt="${evento.name}">
            <h3>${evento.name}</h3>
            <div class="caja-parrafo">
                <p class="descripcion">${evento.description}</p>
            </div>
            <div class="pie-tarjeta">
                <p class="p-tarjeta">Price: $${evento.price}</p>
                <a class="p-tarjeta info" href="./index.html">Regresar</a>
            </div>
        </div>`;
}

function printTemplates(id_etiqueta,detalle) {
    let container = document.querySelector(id_etiqueta)
    //let detalleFiltro = array_eventos.find(each => each.id === detalle * 1)
    //animal = array_animales.filter(each => each.nombre === animal)[0]
    console.log("imprimo filtro")
    //console.log(detalleFiltro)
    let details = cardDetails(detalle)
    container.innerHTML = details //en este caso no es necesario el join() porque no es un array (directamente es un string)
}
printTemplates('#detail-container',detalle)

