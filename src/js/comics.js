let todosLosComics = []; 
//Función obtener json de comics
function obtenerJSONcomics(){
    fetch('data/comics.json')
    .then((responde)=> responde.json())
    .then((comics) =>{
        todosLosComics = comics;
        mostrarComics(comics, 'catalogo');

    })
    .catch((error)=>
    console.log('Error Cargando json', error)
    );
        
    
}
function mostrarComics(comics, contenedorID){
    const contenedor = document.getElementById(contenedorID);
    contenedor.innerHTML = ``;
    comics.forEach((comics) =>{
        const tarjetaComics = crearTarjetaComic(comics);
        contenedor.appendChild(tarjetaComics);
    })
}
 
function crearTarjetaComic(comics){
    const tarjeta = document.createElement('div'); 
    tarjeta.classList.add('sec-comic')
    tarjeta.innerHTML = ` 
        <div class="cont-img">
                <img src="${comics.img}" alt="${comics.alt}">


            </div>
            <div class="inf-comic">

                <h2>Nombre: ${comics.Nombre}</h2>
                <p>Autor: ${comics.Autor}</p>
                <p>Precio: ${comics.Precio} </p>
                 <p>No. Páginas: ${comics['No.Paginas']}</p>
            </div>
            <div class="cont-btn">
                <button class="btn btn-comic"> Más </button>
                <button class="btn btn-comic"> Agregar </button>
            </div>
    `;
    return tarjeta;
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerJSONcomics();
})
