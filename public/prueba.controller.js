

window.onload=async()=>{
    
    llenarSelectAreas()
    llenarCheckRoles()
    tablaListadoEmpleadoCreado()
    btnGuardarEditarEmpleado.onclick=async()=>{
      await guardarEmpleadoCreado()
    }
}

//funciones 

async function llenarSelectAreas(){

    const areas= await arreglo_areas()
    const select = document.getElementById('list_areas'); 
    
    areas.forEach(area => {
        const option = document.createElement('option'); 
        option.value = area.id; 
        option.textContent = area.nombre; 
        select.appendChild(option); 
    });
}


async function llenarCheckRoles() {

    const roles=await arreglo_roles()
    
    const listaRolesDiv = document.getElementById("lista_roles");


    roles.forEach(role => {
        
        const checkboxDiv = document.createElement('div');

        checkboxDiv.classList.add('form-check');
    
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.id = `role_${role.id}`;
        checkbox.value = role.id;
    
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = `role_${role.id}`;
        label.textContent = role.nombre;
    
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
    
        listaRolesDiv.appendChild(checkboxDiv);
    });
}



async function tablaListadoEmpleadoCreado() {
    const empleados=await arreglo_empleados()
    console.log(empleados)
    const tbody = document.getElementById('tabla-empleados');
    tbody.innerHTML = '';

    empleados.forEach(emp => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${emp.nombre}</td>
            <td>${emp.email}</td>
            <td>${emp.sexo=='m'? 'masculino':'femenino'}</td>
            <td>${emp.area}</td>
            <td>${emp.boletin==1? 'si':'no'}</td>
            <td><button class="btn btn-warning btn-sm">Modificar</button></td>
            <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
        `;

        tbody.appendChild(row);
    });
}



async function guardarEmpleadoCreado() {

    if(formulariCreacionEmpleado.reportValidity()){
        console.log('empleado guardado')
        const arregloEmpleadoGuardar={
            nombre:nombre_empleado.value,
            email:correo_empleado.value,
            sexo:document.querySelector('input[name="sexo"]:checked').value,
            area_id:list_areas.value,
            descripcion:descripcion_campo.value,
            boletin: document.getElementById('boletin').checked ? 1 : 0
        }

        console.log(arregloEmpleadoGuardar)
       await guardarEmpleado(arregloEmpleadoGuardar)
       await limpiarFormulario()
        await tablaListadoEmpleadoCreado()

    }
    
}


async function limpiarFormulario(){
    const formulario = document.getElementById('formulariCreacionEmpleado');
    formulario.reset();
    const radiosSexo = document.querySelectorAll('input[name="sexo"]');
    radiosSexo.forEach(radio => radio.checked = false);
    const selectAreas = document.getElementById('list_areas');
    if (selectAreas.options.length > 0) {
        selectAreas.selectedIndex = 0; 
    }
    const textareaDescripcion = document.getElementById('descripcion_campo');
    textareaDescripcion.value = '';
    const checkboxBoletin = document.getElementById('boletin');
    checkboxBoletin.checked = false;


}




//Aqui obtengo las consultas realizadas en la base de datos

const arreglo_areas=async()=> {
    try {
        const response = await fetch('http://localhost:8000/prueba/areas'); 
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
    }
}


const arreglo_roles=async()=> {
    try {
        const response = await fetch('http://localhost:8000/prueba/roles'); 
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
    }
}


const arreglo_empleados=async()=> {
    try {
        const response = await fetch('http://localhost:8000/prueba/empleado'); 
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
    }
}

const guardarEmpleado=async(arregloEmpleadoGuardar)=>{
    try {
        const response = await fetch('http://localhost:8000/prueba/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arregloEmpleadoGuardar)
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Empleado guardado:', data);
           
        } else {
            console.error('Error al guardar el empleado:', data.message);
          
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
      
    }
}