let template = (imagen, titulo, descripcion, precio, id) => {
    return `
        <div class="tarjeta">
            <a href="./details.html?nombre=${id}"><img class="img-tarjeta" src="${imagen}" alt="Cinema"></a>
            <h3>${titulo}</h3>
            <div class="caja-parrafo">
                <p class="descripcion">${descripcion}</p>
            </div>
            <div class="pie-tarjeta">
                <p class="p-tarjeta">Price: $${precio}</p>
                <a class="p-tarjeta info" href="./details.html?nombre=${id}">More Info</a>
            </div>
        </div>`;
}