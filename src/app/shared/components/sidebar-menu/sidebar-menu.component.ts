import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  menuList: MenuItem[] = [
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
      order: 2,
      idMenuParent: 0,
    },
    {
      id: 2,
      title: 'Parâmetros',
      description: 'Páginas de parâmetros',
      url: '',
      icon: 'settings',
      order: 3,
      idMenuParent: 0,
    },
    {
      id: 5,
      title: 'Horários',
      description: 'Páginas de horários',
      url: '/construcao',
      icon: '',
      order: 2,
      idMenuParent: 2,
    },
    {
      id: 6,
      title: 'Itens de menu',
      description: 'Páginas de itens de menu',
      url: '/construcao',
      icon: '',
      order: 3,
      idMenuParent: 2,
    },
    {
      id: 4,
      title: 'Cargos',
      description: 'Páginas de cargos',
      url: '/construcao',
      icon: '',
      order: 1,
      idMenuParent: 2,
    },
    {
      id: 8,
      title: 'Férias',
      description: 'Páginas de férias',
      url: '/construcao',
      icon: '',
      order: 2,
      idMenuParent: 3,
    },
    {
      id: 9,
      title: 'Listagem',
      description: 'Páginas de listagem de funcionários',
      url: '/funcionarios/listagem',
      icon: '',
      order: 1,
      idMenuParent: 3,
    },
    {
      id: 7,
      title: 'Setores',
      description: 'Páginas de setores',
      url: '/construcao',
      icon: '',
      order: 4,
      idMenuParent: 2,
    },
  ];

  ngOnInit() {
    this.menuList = this.menuList.sort((a, b) => a.order - b.order);
  }

  hasChildren(item: MenuItem): boolean {
    if (this.menuList.some((listItem) => listItem.idMenuParent === item.id)) {
      return true;
    }
    return false;
  }
}
