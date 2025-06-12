import { Component } from '@angular/core';
import { ItemMenu } from '../../interfaces/itemMenu';

@Component({
  selector: 'app-sidebar-menu',
  imports: [],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  menuList: ItemMenu[] = [
    {
      id: 1,
      title: 'Página Inicial',
      description: 'Página inicial da aplicação',
      url: '/',
      icon: 'home',
      order: 1,
      idMenuParent: 0,
    },
    {
      id: 3,
      title: 'Funcionários',
      description: 'Páginas de funcionários',
      url: '',
      icon: 'person',
      order: 3,
      idMenuParent: 0,
    },
    {
      id: 2,
      title: 'Parâmetros',
      description: 'Páginas de parâmetros',
      url: '',
      icon: 'settings',
      order: 2,
      idMenuParent: 0,
    },
    {
      id: 5,
      title: 'Horários',
      description: 'Páginas de horários',
      url: '/parametros/horarios',
      icon: '',
      order: 2,
      idMenuParent: 2,
    },
    {
      id: 6,
      title: 'Itens de menu',
      description: 'Páginas de itens de menu',
      url: '/parametros/itens-menu',
      icon: '',
      order: 3,
      idMenuParent: 2,
    },
    {
      id: 4,
      title: 'Cargos',
      description: 'Páginas de cargos',
      url: '/parametros/cargos',
      icon: '',
      order: 1,
      idMenuParent: 2,
    },
    {
      id: 8,
      title: 'Férias',
      description: 'Páginas de férias',
      url: '/funcionarios/ferias',
      icon: '',
      order: 2,
      idMenuParent: 3,
    },
    {
      id: 9,
      title: 'Cadastro',
      description: 'Páginas de cadastro de funcionários',
      url: '/funcionarios/ferias',
      icon: '',
      order: 1,
      idMenuParent: 3,
    },
    {
      id: 7,
      title: 'Setores',
      description: 'Páginas de setores',
      url: '/parametros/setores',
      icon: '',
      order: 4,
      idMenuParent: 2,
    },
  ];

  ngOnInit() {
    this.menuList = this.menuList.sort((a, b) => a.order - b.order);
  }

  hasChildren(item: ItemMenu): boolean {
    if (this.menuList.some((listItem) => listItem.idMenuParent === item.id)) {
      return true;
    }
    return false;
  }
}
