let pagina = document.getElementById("pagina-activa")
console.log(pagina)
function createTemplate(events, currentDate){    
    let templates = []
    for(let one of events){
        if(pagina.textContent === 'Home'){
        templates.push(template(one.image, one.name, one.description, one.price, one.id));
        }
        if(pagina.textContent === 'Upcoming Events'){
            if(one.date >= currentDate){
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
        if(pagina.textContent === 'Past Events'){
            if(one.date < currentDate){
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
    }
    let selector = document.getElementById("card-container")
    selector.innerHTML = templates.join("") 
}

async function fetchApi(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        //console.log(fetchResponse)
        let response = await fetchResponse.json()
        //console.log(response);
        createTemplate(response.events, response.currentDate)
        //console.log(response);
        let categories = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
        response.events.forEach(each => {
            if ( ! categories.includes(each.category) ) {
            categories.push(each.category)
        }    
        })
        console.log('/////////////////')
        printChecks('#table-checks',categories,response.events)
        captureData(response.events, response.currentDate)

        //DETALLE
        let query = location.search
        let params = new URLSearchParams(query)
        let nroEvento = params.get("nombre")
        let evento = response.events
        console.log(evento)
        let detalle = evento.find(each => each.id === nroEvento*1)
        printTemplates('#detail-container',detalle)



        //ESTADISTICAS
        let ePast = [] //eventos pasados
        response.events.forEach(each => {
            if (each.date < response.currentDate) {
                ePast.push(each)
            }
        })
        let sorted = ePast.sort((each1, each2) => each1.assistance / each1.capacity - each2.assistance / each2.capacity)
        let minAssistance = (ePast[0].name)
        let minPorcAssistance = (ePast[0].assistance / ePast[0].capacity) * 100 + "%"
        sorted = ePast.sort((each1, each2) => each2.assistance / each2.capacity - each1.assistance / each1.capacity)
        let maxAssistance = (ePast[0].name)
        let maxPorcAssistance = (ePast[0].assistance / ePast[0].capacity) * 100 + "%"
        let sorted2 = response.events.sort((each1,each2) => each2.capacity - each1.capacity)
        let maxCapacity = (response.events[0].name)
        let capacityMax = (response.events[0].capacity)
        let lineaTabla = [maxAssistance, minAssistance, maxCapacity]
    } catch{
        console.log('Algo salió mal')
    }
}
fetchApi()
