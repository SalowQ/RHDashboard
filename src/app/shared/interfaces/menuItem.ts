export interface MenuItem {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
  order: number;
  idMenuParent: number;
}
