let todosLosComics = [];
console.log('Hola Mundo');
//Función obtener json de comics

function obtenerJSONcomics() {
    console.log('Hola Mundo');
    fetch('../../data/comics.json')
        .then((responde) => responde.json())
        .then((comics) => {
            todosLosComics = comics;
            mostrarComics(comics, 'catalogo');
        })
        .catch((error) => console.log('Error Cargando json', error));
}
function mostrarComics(comics, contenedorID) {
    const contenedor = document.getElementById(contenedorID);
    contenedor.innerHTML = ``;
    comics.forEach((comics) => {
        const tarjetaComics = crearTarjetaComic(comics);
        contenedor.appendChild(tarjetaComics);
    });
}

function crearTarjetaComic(comics) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('sec-comic');
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

//Desactivar panel

function activarPanel(index) {
    const panel = document.querySelectorAll('.opPanel');
    panel.forEach((p, i) => {
        if (i === index) {
            p.classList.add('active');
        } else {
            p.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerJSONcomics();
    const panels = Array.from(document.querySelectorAll('.opPanel'));
    panels.forEach((panel, idx) => {
        panel.addEventListener('click', () => {
            activarPanel(idx);
        });
    });

    const btnMarvel = document.getElementById('btn-marvel');
    if (btnMarvel) {
        btnMarvel.addEventListener('click', (e) => {
            e.stopPropagation();
            activarPanel(0);
            mostrarComics(
                todosLosComics.filter((c) => c.Categoria === 'Marvel'),
                'catalogo'
            );
        });
    }

    const btnDc = document.getElementById('btn-dc');
    if (btnDc) {
        btnDc.addEventListener('click', (e) => {
            e.stopPropagation();
            activarPanel(1);
            mostrarComics(
                todosLosComics.filter((c) => c.Categoria === 'DC'),
                'catalogo'
            );
        });
    }

    const btnManga = document.getElementById('btn-manga');
    if (btnManga) {
        btnManga.addEventListener('click', (e) => {
            e.stopPropagation();
            activarPanel(2);
            mostrarComics(
                todosLosComics.filter((c) => c.Categoria === 'Manga'),
                'catalogo'
            );
        });
    }

    const btnR = document.getElementById('btn-r');
    if (btnR) {
        btnR.addEventListener('click', (e) => {
            e.stopPropagation();
            activarPanel(3);
            mostrarComics(
                todosLosComics.filter((c) => c.Categoria === 'Comic-Terror'),
                'catalogo'
            );
        });
    }
});
