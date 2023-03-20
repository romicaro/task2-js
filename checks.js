/* let categories = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
data.events.forEach(each => {
    if ( ! categories.includes(each.category) ) {
        categories.push(each.category)
    }    
})
console.log(categories) */




function defineTemplate(eventos) {
    return `
    <div class="tarjeta"> 
        <img class="img-tarjeta" src="${eventos.image}" alt="${eventos.name}">
        <h3>${eventos.name}</h3>
        <div class="caja-parrafo">
            <p class="descripcion">${eventos.description}</p>
        </div>
        <div class="pie-tarjeta">
            <p class="p-tarjeta">Price: $${eventos.price}</p>
            <a class="p-tarjeta info" href="./details.html?nombre=${eventos._id}">More Info</a>
        </div>
    </div>
`
}



function printTemplates(id_etiqueta,filtro) {
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


//console.log(data.events.filter(each => each.category === "Race"))


/*@captureData captura los datos de checks checkeados y del input text*/
function captureData(eventos, date) {
    let texto = document.getElementById('id_search').value.toLowerCase()//agregué toLowerCase()
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
    console.log(texto)
    console.log(checks)
    let filtro = eventos
    if(pagina.textContent === 'Upcoming Events'){
        filtro = filtro.filter(each => {
            return (each.date >= date)
        })
    }
    if(pagina.textContent === 'Past Events'){
        filtro = filtro.filter(each => {
            return (each.date < date)
        })
    }
    filtro = filtro.filter(each => {
        return (each.name.toLowerCase().includes(texto)) && (checks.length === 0 || checks.includes(each.category))
        console.log(filtro)
    })
    console.log("ver filtro!!!!!!!!!!!!!!")
    console.log(filtro)
    console.log(pagina.textContent)
    console.log(texto)
    if (filtro.length>0) {
        printTemplates('#card-container',filtro)
    } else {
        notFound('#card-container')
    }
}




function printChecks(id_etiqueta,array_categories,eventos) {
    let container = document.querySelector(id_etiqueta)
    array_categories = array_categories.map(each=> {
        return `
        <fieldset>
            <label class="contact-label" for="${each}">${each}</label>
            <input onclick="captureData(${eventos})" class="class_checks contact-input" type="checkbox" value="${each}" name="tipo" id="${each}">
        </fieldset>
        `
    })
    array_categories.push(`<input onkeyup="captureData(${eventos})" id="id_search" class="contact-input" type="text" name="texto" placeholder="search">`)
    container.innerHTML = array_categories.join('')
}
//printChecks('#table-checks',categories)

/* function defineTabla(dato){
    return `
    <td class="tabla">${dato}</td>
    `
} */

function printTabla(id_etiqueta, datos){
    let container = document.querySelector(id_etiqueta)
    datos = datos.map(each => {
        return `
        <td class="tabla">${each}</td>
        `
    })
    console.log(datos)
    container.innerHTML = datos.join('')
}

function printTabla2(id_etiqueta, datos){
    let container = document.querySelector(id_etiqueta)
    datos = datos.map(each => {
        return `
                <tr class="tr">
                    <td class="tabla">${each.categoria}</td>
                    <td class="tabla">${each.ingresos}</td>
                    <td class="tabla">${each.asistencia}</td>
                </tr>
        `;
    })
    console.log(datos)
    container.innerHTML = datos.join('')
}

/* function printTabla3(id_etiqueta, datos){
    console.log(datos)
    let container = document.querySelector(id_etiqueta)
    let arreglo = []
    datos.forEach(each => {
        let linea = [each.categoria, each.ingresos, each.asistencia]
        console.log(linea)
        linea = linea.map(each => {
            return `
            <td class="tabla">${each}</td>
            `
        })
        console.log(linea)
    arreglo.push(`<tr>`+linea[0]+`</tr>`)
    
    })
    console.log(arreglo)
    container.innerHTML = datos.join('') */

