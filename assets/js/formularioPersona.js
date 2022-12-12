new Vue({
	el: "#formulario", 
	data: {
		formulario: data_formulario,
	},
	methods: {
		alerta: function (event) {
	  		Swal.fire('USUARIO REGISTRADO', 'El registro del usuario ha sido exitoso','success')
			    .then(() => {
			       window.location.href = '/'; 
			    });
	    },
	    alertaEdicion: function (event) {
	  		Swal.fire('USUARIO ACTUALIZADO', 'El registro del usuario se ha actualizado con exito','success').then(() => {
			       window.location.href = '/'; 
			    });
	    },
	    alertaEliminar: function (event) {
	  		Swal.fire('USUARIO ELIMINADO', 'El registro del usuario se ha eliminado del sistema', 'success').then(() => {
			       window.location.href = '/'; 
			    });
	    },
		sendData: function(){
			
			if(this.formulario.nombres == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.apellidos == ""){
				return Swal.fire('Error', 'Es necesario colocar los apellidos','error');
            };
            if(this.formulario.contrasena == ""){
				return Swal.fire('Error', 'Es necesario colocar una contraseña','error');
            };
            if(this.formulario.correo == ""){
				return Swal.fire('Error', 'Es necesario colocar un correo electrónico','error');
            };
			if(this.formulario.telefono == ""){
				return Swal.fire('Error', 'Es necesario colocar un telefono','error');
            };
            if(this.formulario.direccion == ""){
				return Swal.fire('Error', 'Es necesario colocar una dirección','error');
            };
            if(this.formulario.tipo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar el tipo de usuario','error');
            };
            if(this.formulario.tipo == 'Alumno' || this.formulario.tipo == 'Maestro' ){
                if(this.formulario.grupo == "Seleccione una opción"){
                    return Swal.fire('Error', 'Es necesario colocar un grupo asignado','error');
                };
                if(this.formulario.grupo == "Otro" && this.formulario.otro == ""){
                    return Swal.fire('Error', 'Introduzca el nombre del nuevo grupo','error');
                }
                
            }
            if(this.formulario.tipo == 'Directivo'){
                if(this.formulario.estatus == "Seleccione una opción"){
                    return Swal.fire('Error', 'Es necesario colocar un estatus','error');
                };
                if(this.formulario.cargo == ""){
                    return Swal.fire('Error', 'Es necesario colocar un cargo','error');
                };
            }
            
            

			document.getElementById("loading").style.display = "block";
			fetch('/v1/nueva-persona', {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
			    document.getElementById("loading").style.display = "none";
            	this.alerta();
			}).catch(function (error){
            	Swal.fire("Error","Error al guardar registro del usuario: " + error,'error');
                console.error(error);
            });
		},
		actualizarUsuario: function(matricula){
			if(this.formulario.nombres == ""){
				return Swal.fire('Error', 'Es necesario colocar un nombre','error');
            };
            if(this.formulario.apellidos == ""){
				return Swal.fire('Error', 'Es necesario colocar los apellidos','error');
            };
            if(this.formulario.contrasena == ""){
				return Swal.fire('Error', 'Es necesario colocar una contraseña','error');
            };
            if(this.formulario.correo == ""){
				return Swal.fire('Error', 'Es necesario colocar un correo electrónico','error');
            };
			if(this.formulario.telefono == ""){
				return Swal.fire('Error', 'Es necesario colocar un telefono','error');
            };
            if(this.formulario.direccion == ""){
				return Swal.fire('Error', 'Es necesario colocar una dirección','error');
            };
            if(this.formulario.tipo == "Seleccione una opción"){
				return Swal.fire('Error', 'Es necesario colocar el tipo de usuario','error');
            };
            if(this.formulario.tipo == 'Alumno' || this.formulario.tipo == 'Maestro' ){
                if(this.formulario.grupo == "Seleccione una opción"){
                    return Swal.fire('Error', 'Es necesario colocar un grupo asignado','error');
                };
                if(this.formulario.grupo == "Otro" && this.formulario.otro == ""){
                    return Swal.fire('Error', 'Introduzca el nombre del nuevo grupo','error');
                }
                
            }
            if(this.formulario.tipo == 'Directivo'){
                if(this.formulario.estatus == "Seleccione una opción"){
                    return Swal.fire('Error', 'Es necesario colocar un estatus','error');
                };
                if(this.formulario.cargo == ""){
                    return Swal.fire('Error', 'Es necesario colocar un cargo','error');
                };
            }
			document.getElementById("loading").style.display = "block";
			fetch('/v1/actualizar-persona/' + matricula, {
                method: 'POST',
                body: JSON.stringify(this.formulario),
                headers:{
                	'Content-Type': 'application/json'
                }
            }).then(() => {
            	document.getElementById("loading").style.display = "none";
            	this.alertaEdicion(); 
			}).catch(function (error){
				Swal.fire("Error","Error al actualizar el registro del usuario: " + error,'error');
                console.error(error);
            });
			
		},
		eliminarUsuario: function(matricula){
			Swal.fire({
			  title: 'Cuidado, eliminando registro de usuario...',
			  text: "El registro se eliminara definitivamente",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
				if (result.isConfirmed) {
					fetch('/v1/eliminar-persona/' + matricula, {
	                method: 'POST',
	                body: JSON.stringify(this.formulario),
	                headers:{
	                	'Content-Type': 'application/json'
	                }
		            }).then(() => {
		            	this.alertaEliminar(); 
					}).catch(function (error){
		            	Swal.fire("Error","Error al eliminar el registro del usuario: " + error,'error');
		                console.error(error);
		            });
		        }
			});
			
		}
	},
	
})