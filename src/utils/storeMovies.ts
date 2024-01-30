import { create } from 'zustand';

import { persist } from 'zustand/middleware';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface State {
  searchTerm: string;
  searchResults: Movie[];
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Movie[]) => void;
}

export const useStore = create<State>(persist(
  (set) => ({
    searchTerm: '',
    searchResults: [],
    setSearchTerm: (term) => {
      //console.log('Setting searchTerm to', term); // Agrega un console.log aquí
      set((state) => ({ ...state, searchTerm: term }));
    },
    setSearchResults: (results) => {
      //console.log('Setting searchResults to', results); // Agrega un console.log aquí
      set((state) => ({ ...state, searchResults: results }));
    },
  }),
  {
    name: 'movie-search', // Nombre para el almacenamiento local
  }
));
