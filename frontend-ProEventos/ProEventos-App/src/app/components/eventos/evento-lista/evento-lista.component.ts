import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/_models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  
  
  // modalRef: BsModalRef;
  modalRef = {} as BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  
  public widthImg = 100;
  public heightImg = 80;
  public marginImg = 2;
  public exibirImagem= true;
  private filtroListado = '';
  
  public get filtroLista() : string{
    return this.filtroListado;
  }
  
  public set filtroLista(value: string){
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  
  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      )
    }
    
    
    constructor(
      private eventoService: EventoService,
      private modalService: BsModalService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router
      ) { }
      
      public ngOnInit(): void {
        this.spinner.show();
        this.getEventos();
        
      }
      
      public alterarImagem(): void{
        this.exibirImagem= !this.exibirImagem;
      }
      
      public getEventos(): void {
        const observer = {
          next: (eventos: Evento[]) => {
            this.eventos = eventos;
            this.eventosFiltrados = this.eventos;
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error('Error ao Carregar os Eventos', 'Error!');
          },
          complete: () => this.spinner.hide()
        };
        this.eventoService.getEventos().subscribe(observer);
        
      }
      
      openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      }
      
      confirm(): void {
        this.modalRef.hide();
        this.toastr.success('O Evento foi deletado com sucesso', 'Deletado!');
      }
      
      decline(): void {
        
        this.modalRef.hide();
      }

      detalheEvento(id: number): void{
        this.router.navigate([`eventos/detalhe/${id}`]);
      }
      
    }
    