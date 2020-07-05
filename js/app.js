// variables
const presupuestoUsuario =prompt('¿Cual es tu presupuesto Semanal?');
const formulario=document.getElementById('agregar-gasto');
let cantidadPresupuesto;



// clases
//Clase de presupuesto

class Presupuesto{
    //Le pasa como parametro lo que se escriba en el DOM
    constructor(presupuesto){
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
    }
    //Método para ir restando del presupuesto actual. Acá resta el presupuesto
    presupuestoRestante(cantidad=0){
        return this.restante-=Number(cantidad);
    }
    
}
//Clase de interfaz maneja todo lo relacionado a el HTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan=document.querySelector("span#total");
        const restanteSpan=document.querySelector("span#restante");

        //insertar al HTML
        //puse asi y funciona
        // presupuestoSpan.innerHTML=cantidad;
        presupuestoSpan.innerHTML=`${cantidad}`;
        restanteSpan.innerHTML=`${cantidad}`;
        
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje= document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //quitar el alert despues de 3 segundos
        setTimeout(()=>{
            document.querySelector('.primario .alert').remove();
            //si le agrego esto resetea el formulario, y si estoy escibiendo mientras pasa los 3000 va a borrar los que escriba
            formulario.reset();
        },3000);
    }

    //inserta los gastos a la lista
    //to puse asi
    // agregarGastoListado(nombre, cantidadGasto){
        //el asi
    agregarGastoListado(nombre, cantidad){
        const gastosListado=document.querySelector('#gastos ul');

        //creamos un LI para agregar los gastos
        const li=document.createElement('li');
        
        // añadimos algunas clases de boostraps
        li.className='list-group-item d-flex justify-content-between align-items-center';

        //insertamos el gasto
        li.innerHTML=`
        ${nombre}
        <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>
        `;

        //insertar al html
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante
    presupuestoRestante(cantidad){

        const restante=document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario=cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML=`${presupuestoRestanteUsuario}`;
        
        this.comprobrarPresupuesto();
    }

    //Cambiar de color el presupuesto restante
    comprobrarPresupuesto(){
        const presupuestoTotal=cantidadPresupuesto.presupuesto;
        const presupuestoRestante=cantidadPresupuesto.restante;
        
        //comprobar el 25%
        if((presupuestoTotal/4)>presupuestoRestante){
            const restante=document.querySelector('.restante');
            restante.classList.remove('alert-success','alert-warning');
            restante.classList.add('alert-danger');
        //comprobar el 50%   
        }else if((presupuestoTotal/2)>presupuestoRestante){
            const restante=document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
        
    }

}



// Envent listeners

document.addEventListener('DOMContentLoaded', ()=>{
    if (presupuestoUsuario===null || presupuestoUsuario===""){
        window.location.reload();
    }else{
        //instanciar un presupuesto
        cantidadPresupuesto= new Presupuesto(presupuestoUsuario);
        // Instanciar la clase de interfaz
        const ui= new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});


formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    // leer del fomulario de gastos

    const nombreGasto=document.querySelector('#gasto').value;
    const cantidadGasto=document.querySelector('#cantidad').value;

    // instaciar la interfaz
    const ui= new Interfaz();
    
    //comprobar que los campos no esten vacios
    if(nombreGasto==="" || cantidadGasto===""){
        //dos parametro mensaje y tipo
        ui.imprimirMensaje("Hubo un error", "error");
    }else{
        //insertar en el HTML+
        ui.imprimirMensaje('Se agrego el gasto.', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

});