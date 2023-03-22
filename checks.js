
/*@captureData captura los datos de checks checkeados y del input text*/


function printTabla(id_etiqueta, datos){
    let container = document.querySelector(id_etiqueta)
    datos = datos.map(each => {
        return `
        <td class="tabla">${each}</td>
        `
    })
    //console.log(datos)
    container.innerHTML = datos.join('')
}

function printTabla2(id_etiqueta, datos){
    let container = document.querySelector(id_etiqueta)
    datos = datos.map(each => {
        return `<tr>
                    <td class="tabla">${each.categoria}</td>
                    <td class="tabla">${each.ingresos}</td>
                    <td class="tabla">${each.asistencia}</td>
                </tr>`;
    })
    //console.log(datos)
    container.innerHTML = datos.join('')
}

/* async function fetchApiChecks(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        //console.log(fetchResponse)
        let response = await fetchResponse.json()
        array = response.events
        
        let texto = document.getElementById('id_search').value.toLowerCase()//agregué toLowerCase()
        let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
        console.log('captura de textbox:')
        console.log(texto)
        console.log('captura de checks:')
        console.log(checks)


    } catch{
        console.log('Algo salió mal')
    }
}
fetchApiChecks()
 */