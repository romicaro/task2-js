// @cardDetails define la card de detalle dinámica
function cardDetails(evento) {
    return `
        <div class="d-tarjeta detail">
            <img class="d-img-tarjeta" src="${evento.image}" alt="${evento.name}">
            <div class="d-info-tarjeta">
                <h3>${evento.name}</h3>
                <h4>Date: ${evento.date}</h4>
                <h4>Place: ${evento.place}</h4>
                <div class="d-caja-parrafo">
                    <p class="descripcion">${evento.description}</p>
                </div>
                <div class="d-pie-tarjeta">
                    <p class="d-p-tarjeta">Price: $${evento.price}</p>
                    <a class="d-p-tarjeta info" href="./index.html">Regresar</a>
                </div>
            </div>
        </div>`;
}

function printTemplates(id_etiqueta,detalle) {
    let container = document.querySelector(id_etiqueta)
    let details = cardDetails(detalle)
    container.innerHTML = details //en este caso no es necesario el join() porque no es un array (directamente es un string)
}
//printTemplates('#detail-container',detalle)

async function fetchApiStats(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        //console.log(fetchResponse)
        let response = await fetchResponse.json()
        array = response.events
        let query = location.search
        let params = new URLSearchParams(query)
        let nroEvento = params.get("nombre")
        console.log(nroEvento)
        array.filter(each => each.id == nroEvento)
        filter = array.filter(each => each.id === nroEvento)
        console.log(filter)
        printTemplates('#detail-container',filter[0]) //falta agregar detalle
    } catch{
        console.log('Algo salió mal')
    }
}
fetchApiStats()
