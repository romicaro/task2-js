async function fetchApiStats(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        console.log(fetchResponse)
        let response = await fetchResponse.json()
        console.log(response);
     
        //ESTADISTICAS - events statistics
        let ePast = [] //eventos pasados
        response.events.forEach(each => {
            if (each.date < response.currentDate) {
                ePast.push(each)
            }
        })
        console.log(ePast)
        let sorted = ePast.sort((each1, each2) => each1.assistance / each1.capacity - each2.assistance / each2.capacity)
        console.log(ePast)
        let minAssistance = (ePast[0].name)
        let minPorcAssistance = ((ePast[0].assistance / ePast[0].capacity) * 100).toFixed(2) + "%"
        console.log(minAssistance)
        console.log(minPorcAssistance)
        /* sorted = ePast.sort((each1, each2) => each2.assistance / each2.capacity - each1.assistance / each1.capacity) */
        //console.log(ePast)
        let maxAssistance = (ePast[ePast.length-1].name)
        let maxPorcAssistance = ((ePast[ePast.length-1].assistance / ePast[ePast.length-1].capacity) * 100).toFixed(2) + "%"
        console.log(maxAssistance)
        console.log(maxPorcAssistance)
        let sorted2 = response.events.sort((each1,each2) => each2.capacity - each1.capacity)
        let maxCapacity = (response.events[0].name)
        let capacityMax = (response.events[0].capacity)
        console.log(maxCapacity)
        console.log(capacityMax)
        let lineaTabla = [maxAssistance, minAssistance, maxCapacity]
        console.log(lineaTabla)
        printTabla('#titleStatistics', lineaTabla)
        lineaTabla = [maxPorcAssistance, minPorcAssistance, capacityMax]
        /* let tablaEvents = [{titulo:maxAssistance, valor:maxPorcAssistance},{titulo:minAssistance, valor:minPorcAssistance},{titulo:maxCapacity, valor:capacityMax}] */
        /* console.log(tablaEvents) */
        console.log(lineaTabla)
        printTabla('#valoresStatistics', lineaTabla)

        

        //TABLA ESTADISTICA PARA UPCOMING EVENTS
        



        //TABLA ESTADISTICA PARA PAST EVENTS
        let categories = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
        ePast.forEach(each => {
            if ( ! categories.includes(each.category)) {
            categories.push(each.category)
        }    
        })
        console.log(categories)
        let pastStatistics = []
        let recursos = 0
        let asistencia = 0
        let acc = 0
        categories.forEach(each => {
            recursos = 0
            asistencia = 0
            acc = 0
            ePast.forEach(one => {
                if (each == one.category) {
                    recursos = recursos + one.assistance * one.price
                    asistencia = asistencia + one.assistance / one.capacity
                    acc = acc + 1
                    console.log(each)
                    console.log(recursos)
                    console.log(asistencia)
                }    
            })
            asistencia = (asistencia * 100 / acc).toFixed(2) 
            console.log(acc)
            console.log(each)
            console.log(recursos)
            console.log(asistencia)
            pastStatistics.push({categoria:each, ingresos:recursos, asistencia:asistencia +"%"})
            console.log(pastStatistics)
        })
        printTabla2('#tablaPast',pastStatistics)

       


    } catch{
        console.log('Algo salió mal')
    }
}
fetchApiStats()
