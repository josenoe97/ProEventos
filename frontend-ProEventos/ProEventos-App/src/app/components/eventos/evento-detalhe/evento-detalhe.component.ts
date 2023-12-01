import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  
  form: FormGroup | any;
  constructor() { }
  
  ngOnInit(): void {
    this.validation();
  }
  
  public validation(): void{
    this.form = new FormGroup({
      tema: new FormControl('', 
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]), 
      local: new FormControl('xpto', Validators.required), 
      dataEvento: new FormControl('xpto', Validators.required), 
      qtdPessoas: new FormControl('xpto', 
        [Validators.required, Validators.maxLength(120000)]), 
      imagemURL: new FormControl('xpto', Validators.required), 
      telefone: new FormControl('xpto', Validators.required), 
      email: new FormControl('xpto',
        [Validators.required, Validators.email]),  
    });
  }
}
