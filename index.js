let pagina = document.getElementById("pagina-activa")
console.log(pagina)
function createTemplate(events, currentDate){
    //let events = data.events
    //let currentDate = data.currentDate;
    let templates = []
    console.log(pagina.textContent)
    console.log(currentDate)
    for(let one of events){
        if(pagina.textContent === 'Home'){
        templates.push(template(one.image, one.name, one.description, one.price, one.id));
        }
        if(pagina.textContent === 'Upcoming Events'){
            if(one.date >= currentDate){
                //console.log(one.name)
                //console.log(one.date)
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
        if(pagina.textContent === 'Past Events'){
            if(one.date < currentDate){
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
        if(pagina.textContent === 'Details'){

        }
    }
    //console.log(templates);


    let selector = document.getElementById("card-container")
    selector.innerHTML = templates.join("") 
}

//createTemplate()


async function fetchApi(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        console.log(fetchResponse)
        let response = await fetchResponse.json()
        console.log(response);
        createTemplate(response.events, response.currentDate)
        let categories = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
        response.events.forEach(each => {
            if ( ! categories.includes(each.category) ) {
            categories.push(each.category)
        }    
        })
        console.log(categories)
        printChecks('#table-checks',categories,response.events)
        //printTemplates('#card-container',response.events)
        captureData(response.events, response.currentDate)
    } catch{
        console.log('Algo salió mal')
    }
}
fetchApi()

/* let text = document.getElementById('id_search').value
console.log(text) */