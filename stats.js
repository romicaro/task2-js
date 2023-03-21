async function fetchApiStats(){
    try {
        let urlApi = 'https://api-amazingevents.onrender.com/api/amazing-events'
        let fetchResponse = await (await fetch(urlApi))
        //console.log(fetchResponse)
        let response = await fetchResponse.json()
        //console.log(response);
     
        //ESTADISTICAS - events statistics
        let ePast = [] //eventos pasados
        response.events.forEach(each => {
            if (each.date < response.currentDate) {
                ePast.push(each)
            }
        })
        //console.log(ePast)
        let sorted = ePast.sort((each1, each2) => each1.assistance / each1.capacity - each2.assistance / each2.capacity)
        let minAssistance = (ePast[0].name)
        let minPorcAssistance = ((ePast[0].assistance / ePast[0].capacity) * 100).toFixed(2) + "%"
        let maxAssistance = (ePast[ePast.length-1].name)
        let maxPorcAssistance = ((ePast[ePast.length-1].assistance / ePast[ePast.length-1].capacity) * 100).toFixed(2) + "%"
        let sorted2 = response.events.sort((each1,each2) => each2.capacity - each1.capacity)
        let maxCapacity = (response.events[0].name)
        let capacityMax = (response.events[0].capacity)
        //console.log(maxCapacity)
        //console.log(capacityMax)
        let lineaTabla = [maxAssistance, minAssistance, maxCapacity]
        //console.log(lineaTabla)
        printTabla('#titleStatistics', lineaTabla)
        lineaTabla = [maxPorcAssistance, minPorcAssistance, capacityMax]
        printTabla('#valoresStatistics', lineaTabla)

        

        //TABLA ESTADISTICA PARA UPCOMING EVENTS
        let categ = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
        let eUpcoming = [] //eventos futuros
        response.events.forEach(each => {
            if (each.date > response.currentDate) {
                eUpcoming.push(each)
            }
        })

        eUpcoming.forEach(each => {
            if ( ! categ.includes(each.category)) {
            categ.push(each.category)
        }    
        })

        let upcomingStatistics = []
        let upcomingRecursos = 0
        let upcomingAsistencia = 0
        let upcomingAcc = 0
        categ.forEach(each => {
            upcomingRecursos = 0
            upcomingAsistencia = 0
            upcomingAcc = 0
            eUpcoming.forEach(one => {
                if (each == one.category) {
                    upcomingRecursos = upcomingRecursos + one.estimate * one.price
                    upcomingAsistencia = upcomingAsistencia + one.estimate / one.capacity
                    upcomingAcc = upcomingAcc + 1
                }    
            })
            upcomingAsistencia = (upcomingAsistencia * 100 / upcomingAcc).toFixed(2) 
            upcomingStatistics.push({categoria:each, ingresos:upcomingRecursos, asistencia:upcomingAsistencia +"%"})
        })
        printTabla2('#tablaUpcoming', upcomingStatistics)


        //TABLA ESTADISTICA PARA PAST EVENTS
        let categories = [] //tipos va a ser el array que va a tener las categorias SIN repetirse
        ePast.forEach(each => {
            if ( ! categories.includes(each.category)) {
            categories.push(each.category)
        }    
        })
        //console.log(categories)
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
                }    
            })
            asistencia = (asistencia * 100 / acc).toFixed(2) 
            pastStatistics.push({categoria:each, ingresos:recursos, asistencia:asistencia +"%"})
        })
        printTabla2('#tablaPast', pastStatistics)

    } catch{
        //console.log('Algo salió mal')
    }
}
fetchApiStats()
