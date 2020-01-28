import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import {  NgForm } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 errorMessage = "";

  constructor( public service : PersonaService,  ) { 


  }

  ngOnInit() {
    this.resetFormulario();
  }

  resetFormulario(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.usuario = {
      id: null,
      nombres: "",
      apellidos: "",
      cedula: null,
      telefono:null,
      correo: ""
    };
  }

  onGuardar(form: NgForm) {
    if (form.value.id == null) this.insertarUsuario(form);
    else this.updateUsuario(form);
  }

  onReset(form: NgForm) {
    this.resetFormulario(form);
  }

  insertarUsuario(form: NgForm) {
    this.service.crearUsuario(form.value).subscribe(
      res => {
        Swal.fire('Usuario Registrado');
        this.resetFormulario(form);
        this.service.cargarUsuarios();
      },
      error => {
        if (
          error.error.errors.cedula == null &&
          error.error.errors.corre == null
        )
          this.errorMessage = error.message;
        else if (error.error.errors.cedula != null)
          this.errorMessage = error.error.errors.cedula[0];
        else if (error.error.errors.correo != null)
          this.errorMessage = error.error.errors.correo[0];
          Swal.fire("Error",'El correo ya existe','error')

        console.log(error.error.errors.correo);
        console.log(error.error.errors.cedula == null);
      }
    );
  }

  updateUsuario(form: NgForm) {
    this.errorMessage = "";
    this.service.putUsuario(form.value).subscribe(res => {
      Swal.fire('usuario modificado')
      this.resetFormulario(form);
      this.service.cargarUsuarios();
    });
  }


  
}
