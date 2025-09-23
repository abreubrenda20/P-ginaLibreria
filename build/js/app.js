let todosLosLibros=[];
//variable para pagina comic
const paneles = document.querySelectorAll('.opPanel');

//variables carrucel

let atras = document.getElementById('atras');
let adelante = document.getElementById('delante');
let imagen = document.getElementById('img');
let texto = document.getElementById('texto');
let actual=0;
let sucursales=[];
function obtenerJSONSucursal(){
    fetch('data/sucursales.json')
    //regresa una promesa
    .then(responde=>responde.json())
    .then(tiendas=>{
        sucursales=tiendas;
        mostrarSucursal();

        atras.addEventListener('click', ()=>{
        actual-=1;
        if(actual==-1){
            actual=sucursales.length-1;
        }
        mostrarSucursal();
        });

        adelante.addEventListener('click', ()=>{
            actual+=1;
            if(actual==sucursales.length){
                actual=0;
            }
            mostrarSucursal();
        });
    })
    .catch(error=> console.error('Error cargando el JSON de sucursales', error))
}

function mostrarSucursal(){
    let s = sucursales[actual];
    imagen.innerHTML=`
            <img src="${s.img}" alt="${s.alt}">
        `;
        texto.innerHTML=`
            <h2>${s.nombresucursa}</h2>
            <p>${s.direccion}</p>
            <p>${s.pais}</p>
            <p>${s.cp}</p>
            <p>${s.delegacion}</p>
            <p>${s.correo}</p>
            <p>${s.telefono}</p>
        
        `;
}


paneles.forEach(panel => {
  panel.addEventListener('click', () => {
    // Si ya está activo y vuelves a hacer clic, no hagas nada
    if (panel.classList.contains('active')) return;

    removeActivePanel(); // quita active de todos
    panel.classList.add('active'); // agrega al clicado
  });
});

function removeActivePanel(){
    paneles.forEach(panel=>{
        panel.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', function(){
    obtenerJSON();
    obtenerJSONSucursal();
})

function obtenerJSON(){
    fetch('data/libros.json')
    //regresa una promesa
    .then(responde=>responde.json())
    .then(libros=>{
        todosLosLibros=libros;
        mostrarLibros(libros, 'catalogoPrincipal')
    })
    .catch(error=> console.error('Error cargando el JSON de Libros', error))
}



function mostrarLibros(libros, contenedorID){
    const contenedor= document.getElementById(contenedorID);
    libros.forEach(libros =>{
        const tarjetaLibros= crearTarjetaCatalogo(libros);
        contenedor.appendChild(tarjetaLibros);
    });
}

function crearTarjetaCatalogo(libros){
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('contenedor-card');
    const nuevo = document.createElement('div');
    nuevo.classList.add('cont-nuevo');
    tarjeta.appendChild(nuevo);
    const cont_img= document.createElement('div');
    cont_img.classList.add('img-nuevo');
    cont_img.innerHTML=`
        <img src = "${libros.img}" alt = "${libros.alt}"/>
    `;
    nuevo.appendChild(cont_img);

    const info = document.createElement('div');
    info.classList.add('info-nuevo');
    info.innerHTML= `
        <h3>${libros.Nombre}</h3>
        <p>${libros.Autor}</p>
        <p>$${libros.Precio}</p>
    `;
    nuevo.appendChild(info);
    const cont_btn= document.createElement('div');
    cont_btn.classList.add('btns-nuevo');

    const btn = document.createElement('button');
    btn.classList.add('btn-card')
    btn.textContent= "Más"
    info.appendChild(cont_btn);
    cont_btn.appendChild(btn);

    const cont_btn2= document.createElement('div');
    cont_btn2.classList.add('btns-nuevo');
    const btn2 = document.createElement('button');
    btn2.classList.add('btn');
    btn2.innerHTML= `
        Agregar 
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
                viewBox="0 0 16 16" class="icono">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 
                .485.379L2.89 4H14.5a.5.5 0 0 1 
                .485.621l-1.5 6A.5.5 0 0 1 13 
                11H4a.5.5 0 0 1-.485-.379L1.61 
                3H.5a.5.5 0 0 1-.5-.5M3.14 
                5l.5 2H5V5zM6 5v2h2V5zm3 
                0v2h2V5zm3 0v2h1.36l.5-2zm1.11 
                3H12v2h.61zM11 8H9v2h2zM8 
                8H6v2h2zM5 8H3.89l.5 2H5zm0 
                5a1 1 0 1 0 0 2 1 1 0 0 
                0 0-2m-2 1a2 2 0 1 1 4 0 
                2 2 0 0 1-4 0m9-1a1 1 0 
                1 0 0 2 1 1 0 0 0 
                0-2m-2 1a2 2 0 1 1 4 0 
                2 2 0 0 1-4 0"/>
            </svg>
    `;
    tarjeta.appendChild(cont_btn2);
    cont_btn2.appendChild(btn2);

    return tarjeta;

}

