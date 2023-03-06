let pagina = document.getElementById("pagina-activa")
function createTemplate(){
    let events = data.events
    let currentDate = data.currentDate;
    let templates = []
    for(let one of events){
        if(pagina.textContent === 'Home'){
        templates.push(template(one.image, one.name, one.description, one.price, one._id));
        }
        if(pagina.textContent === 'Upcoming Events'){
            if(one.date >= currentDate){
                templates.push(template(one.image, one.name, one.description, one.price, one._id));
            }
        }
        if(pagina.textContent === 'Past Events'){
            if(one.date < currentDate){
                templates.push(template(one.image, one.name, one.description, one.price, one._id));
            }
        }
        if(pagina.textContent === 'Details'){

        }
    }
    console.log(templates);


    let selector = document.getElementById("card-container")
    selector.innerHTML = templates.join("") 
}

createTemplate()
