import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/persona.model';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas-registradas',
  templateUrl: './personas-registradas.component.html',
  styles: []
})
export class PersonasRegistradasComponent implements OnInit {
  persona :Usuario[]=[];

  constructor(public router : Router, public service: PersonaService) { }

  ngOnInit() {
    this.service.cargarUsuarios();
  }
  
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.usuario = {
      id: null,
      nombres: "",
      apellidos: "",
      cedula: null,
      telefono: null,
      correo: ""
    };
  }

  llenarForm(us: Usuario) {
    this.service.usuario = Object.assign({}, us);
  }

  llenarTabla(usuario: Usuario) {
    this.service.cargarUsuarios();
  }

  getUsuarioCorreo(form: NgForm) {
    console.log(form.value.correo);
    this.service.cargarUsuarios(form.value.correo);
    form.resetForm();
  }

  eliminarUsuario(usuario : Usuario){
    Swal.fire({
      title:'¿Estas Seguro?',
      text:'Esta a punto de borrar a ' + usuario.nombres,
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then( borrar => {
      if(borrar){
        this.service.borrarUsuario(usuario.id).subscribe( resp => {
          console.log(resp);
          this.service.cargarUsuarios();
          this.resetForm();
        });
      }
    })
  }

}
