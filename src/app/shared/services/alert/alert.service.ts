import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly swalInstance = Swal.mixin({
    customClass: {
      popup: 'bg-body',
      confirmButton: 'bg-primary',
      cancelButton: 'bg-danger',
      title: 'text-body',
      htmlContainer: 'text-body',
    },
    reverseButtons: true,
  });
  constructor() {}

  fire(options: SweetAlertOptions): Promise<any> {
    return this.swalInstance.fire(options);
  }

  show(
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    showCancel: boolean = false,
    button?: string
  ): Promise<any> {
    let icon: any;
    let title: string;

    switch (type) {
      case 'success':
        icon = 'success';
        title = 'Sucesso';
        break;
      case 'info':
        icon = 'info';
        title = 'Informação';
        break;
      case 'warning':
        icon = 'warning';
        title = 'Atenção';
        break;
      case 'error':
        icon = 'error';
        title = 'Erro';
        break;
      default:
        icon = 'warning';
        title = type;
        break;
    }

    return Swal.fire({
      icon: icon,
      backdrop: 'bg-base-300',
      title: title,
      text: message,
      showCancelButton: showCancel,
      confirmButtonText: button ?? 'Ok',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        popup: '!bg-base-300',
        confirmButton: '!btn !btn-primary',
        cancelButton: showCancel ? '!btn !btn-neutral' : 'hidden',
        title: '!text-base-content',
        htmlContainer: '!text-base-content',
      },
    });
  }
}
