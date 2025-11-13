let todosLosLibros=[];
//variable para pagina comic
const paneles = document.querySelectorAll('.opPanel');
const modal = document.getElementById('modal');





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
        //agregando eventos a los botones
        document.querySelectorAll('.btn-catalogo').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                console.log("clic en boton")
                const Categoria = btn.dataset.text;
                filtrarLibros(Categoria);
                
            })
        })
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
    
    btn.textContent= "Más";
    

    info.appendChild(cont_btn);
    cont_btn.appendChild(btn);
    // Mostrar el modal
    btn.addEventListener('click', () => {
        
        modal.classList.add('show');
        console.log("hola ")
        crearModal(libros, 'modal');
    });


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

function filtrarLibros(Categoria){
    const contenedor = document.getElementById('catalogoPrincipal');
    contenedor.innerHTML="";
    let filtrados;
    if(Categoria ==="Todos"){
        filtrados=todosLosLibros;

    }else{
        //Realiza el filtrado de libros
        filtrados=todosLosLibros.filter(l=> l.Categoria===Categoria);
    }
    mostrarLibros(filtrados,'catalogoPrincipal');

}

//Creando el modal
function crearModal(libros, idmodal){
    const contenedor_modal = document.getElementById(idmodal);
     contenedor_modal.innerHTML = ""; //Limpia antes de crear
    contenedor_modal.innerHTML = 
    `<div class="btn-cerrar" id="btn-cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
        </svg>
    </div>
    <div class="info1">
        <div class="cont-img">
            <img src="${libros.img}" alt="${libros.alt}">
        </div>
        <div class="cont-info">
            <h1>${libros.Nombre}</h1>
            <h2> <span>Precio:</span>  ${libros.Precio}</h2>
            <h2> <span>Descuento:</span>  ${libros.Descuento} %</h2>
            <h2>  <span>Categoria:</span>  ${libros.Categoria}</h2>
        </div>
    </div>
    <div class="info2">
        <div class="cont-btn">
            <button class="btn" id="btn-info">Información</button>
            <button class="btn" id="btn-sinop">Sinopsis</button>
        </div>
        <div class="info-detallada">
            <div class="seccion-info">
                <p class="parrafo-info"><span>Autor:</span>  ${libros.Autor}</p>
                <p class="parrafo-info"> <span>ISBN:</span>  ${libros.ISBN}</p>
                <p class="parrafo-info"> <span>No. de páginas:</span>  ${libros["No.Paginas"]}</p>
                <p class="parrafo-info"> <span>Editorial:</span>  ${libros.Editorial}</p>
                <p class="parrafo-info"> <span>Año de edición:</span>  ${libros["Año de edición"]}</p>
            </div>
            <div class="seccion-sinop"> 
                <p class="parrafo-sinop">${libros.Sinopsis}</p>
            </div>
        </div>
    </div>`;
    const btnCerrar = document.querySelector('#btn-cerrar');
    // Cerrar modal al hacer clic en el botón de cerrar
    btnCerrar.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    //Mostrar info o sinopsis

    const btnInfo= contenedor_modal.querySelector('#btn-info');
    const btnSinop= contenedor_modal.querySelector('#btn-sinop');
    const seccionInfo= contenedor_modal.querySelector('.seccion-info');
    const seccionSinop= contenedor_modal.querySelector('.seccion-sinop');
    //Mi estado inicial
    seccionInfo.style.display='block';
    seccionSinop.style.display='none';
    btnInfo.addEventListener('click', () => {
        seccionInfo.style.display = 'block';
        seccionSinop.style.display = 'none';
        btnInfo.classList.add('active');
        btnSinop.classList.remove('active');
    });

    btnSinop.addEventListener('click', () => {
        seccionInfo.style.display = 'none';
        seccionSinop.style.display = 'block';
        btnSinop.classList.add('active');
        btnInfo.classList.remove('active');
    });

}
