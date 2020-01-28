import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../models/persona.model';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  usuario: Usuario;
  usuarios: Usuario[];


  constructor( public http : HttpClient) { }

  
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuarios';

    // console.log(usuario);
    return this.http.post(url , usuario).pipe(map(resp =>{
      console.log(usuario.id);
    }));
  }

  putUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuarios/' + usuario.id;

    // console.log(usuario);
    return this.http.put(url , usuario);
  }

  cargarUsuarios(correo: string = "") {
    let url = URL_SERVICIOS + '/usuarios';

    console.log(correo);
    this.http
      .get(url + correo)
      .toPromise()
      .then(res => (this.usuarios = res as Usuario[]));
  }


  
  borrarUsuario( id: number){

    let url = URL_SERVICIOS + '/usuarios/'+ id;


    return this.http.delete(url).pipe(map(resp => {
      return true;
    }));
   }
  

   }

