
"use client"
// pages/Home.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Navbar from '@/components/Header';
import MyForm, { formSchema } from '@/components/SearchForm';
import MovieCard from '@/components/MovieCard';
import MovieSkeleton from '@/components/Skeleton';
import { z } from 'zod';

const API_KEY = 'b6ed65ffa6c8e07e4d174be61cfa5160';
const API_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ results: Movie[] }> = await axios.get(`${API_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        });

        setMovies(response.data.results);
        setLoading(false); // Indica que las películas han sido cargadas
        console.log('Respuesta de la API:', response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false); // Manejar el error y establecer loading a falso
      }
    };

    fetchData();
  }, []);

  const onSearchSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ results: Movie[] }> = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          query: values.movie,
          page: 1,
        },
      });

      setMovies(response.data.results);
      setLoading(false); // Indica que las películas de la búsqueda han sido cargadas
      console.log('Respuesta de la API para la búsqueda:', response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false); // Manejar el error y establecer loading a falso
    }
  };

  return (
    <div className="bg-blue-950">
      <Navbar />
      <MyForm onSubmit={onSearchSubmit} />
      <div className=''>
        <h1 className="text-center text-2xl">Resultados de la Búsqueda</h1>
        <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {loading
            ? movies.map((_, index) => <MovieSkeleton key={index} />)
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
