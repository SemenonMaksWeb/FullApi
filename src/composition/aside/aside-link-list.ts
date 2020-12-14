export interface InterfaceLink {
  id: number;
  text: string;
  to?: string;
  array?: InterfaceLink[];
}
export const links: InterfaceLink[] = [
  {
    id: 1,
    text: 'Главная',
    to: '/',
  },
  {
    id: 2,
    text: 'Вакансии',
    array: [
      {
        id: 4,
        text: 'Все вакансии',
        to: '/vacancy/',
      },
      {
        id: 5,
        text: 'Должности вакансии',
        to: '/vacancy/position',
      },
    ],
  },
  {
    id: 3,
    text: 'Пользователи',
    to: '/user',
  },
];
