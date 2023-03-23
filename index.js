let pagina = document.getElementById("pagina-activa")
function createTemplate(events, currentDate) {
    let templates = []
    for (let one of events) {
        if (pagina.textContent === 'Home') {
            templates.push(template(one.image, one.name, one.description, one.price, one.id));
        }
        if (pagina.textContent === 'Upcoming Events') {
            if (one.date >= currentDate) {
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
        if (pagina.textContent === 'Past Events') {
            if (one.date < currentDate) {
                templates.push(template(one.image, one.name, one.description, one.price, one.id));
            }
        }
    }
    let selector = document.getElementById("card-container")
    selector.innerHTML = templates.join("")
}
function defineTemplate(eventos) {
    return `
    <div class="tarjeta"> 
        <a href="./details.html?nombre=${eventos.id}"><img class="img-tarjeta" src="${eventos.image}" alt="${eventos.name}"></a>
        <h3>${eventos.name}</h3>
        <div class="caja-parrafo">
            <p class="descripcion">${eventos.description}</p>
        </div>
        <div class="pie-tarjeta">
            <p class="p-tarjeta">Price: $${eventos.price}</p>
            <a class="p-tarjeta info" href="./details.html?nombre=${eventos.id}">More Info</a>
        </div>
    </div>
`
}

function printTemplates(id_etiqueta, filtro) {
    let container = document.querySelector(id_etiqueta)  /* trae el elemento con ese id */
    filtro = filtro.map(defineTemplate)
    container.innerHTML = filtro.join('')
}

function notFound(id_etiqueta) {
    let container = document.querySelector(id_etiqueta)
    container.innerHTML = `
    <div class="card m-2 card-box">
        <div class="card-body d-flex flex-column align-items-center">
            <h3 class="card-title d-flex flex-column align-items-center justify-center">EVENTO NO ENCONTRADO</h3>
        </div>
    </div>
    `
}

async function captureData() {
    const { currentDate, events } = await fetch('https://api-amazingevents.onrender.com/api/amazing-events').then((res) => res.json());
    array = events
    date = currentDate
    let texto = document.getElementById('id_search').value.toLowerCase()//agregué toLowerCase()
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
    console.log('captura de textbox:')
    console.log(texto)
    console.log('captura de checks:')
    console.log(checks)
    let filtro = array
    console.log(filtro)
    filtro = array.filter(each => {
        return (each.name.toLowerCase().includes(texto)) && (checks.length === 0 || checks.includes(each.category))
    })
    console.log(filtro)
    if (pagina.textContent === 'Upcoming Events') {
        filtro = filtro.filter(each => {
            return (each.date >= date)
        })
    }
    if (pagina.textContent === 'Past Events') {
        filtro = filtro.filter(each => {
            return (each.date < date)
        })
    }
    if (filtro.length > 0) {
        printTemplates('#card-container', filtro)
    } else {
        notFound('#card-container')
    }
}

async function fetchApi() {
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
            if (!categories.includes(each.category)) {
                categories.push(each.category)
            }
        })
        array = response.events
        date = response.currentDate
        

        

        function printChecks(id_etiqueta, array_categories) {
            if (pagina.textContent === 'Home' || 'Upcoming Events' || 'Past Events') {

                let container = document.querySelector(id_etiqueta)
                array_categories = array_categories.map(each => {
                    return `
        <fieldset >
            <input onclick="captureData()" class="class_checks contact-input" type="checkbox" value="${each}" name="tipo" id="${each}">
            <label class="contact-label" for="${each}">${each}</label>
        </fieldset>
        `
                })
                array_categories.push(`<input onkeyup="captureData()" id="id_search" class="contact-input" type="text" name="texto" placeholder="search">`)
                container.innerHTML = array_categories.join('')
            }
        }

        printChecks('#table-checks', categories, response)
        captureData()

    } catch (error) {
        console.log(error)
    }
}
fetchApi()
