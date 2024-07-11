import {create} from 'zustand';

// Buscar de uma API
const initialItems = [
  {
    id: 1,
    name: 'Alexandre Soares de Almeida',
  },
  {
    id: 2,
    name: 'Vasco Roberto Marinho Braga',
  },
  {
    id: 3,
    name: 'Adelson Júnior',
  },
];

/*
type Item = {
    id: number;
    name: string;
}

type UserStore = {
    user: Item[];
    addToUser: (item: Item) => void;
}
*/

const useUserStore = create(set => {
  return {
    user: [],
    addToUser: item => set(state => ({user: [...state.user, item]})),
    removeFromUser: id =>
      set(state => ({user: state.user.filter(item => item.id !== id)})),
  };
});
