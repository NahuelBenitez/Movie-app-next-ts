"use client"
import React from 'react';
import Navbar from '@/components/Header';
import MyForm, { formSchema } from '@/components/SearchForm';
import { z } from "zod"
import  { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const API_KEY = 'b6ed65ffa6c8e07e4d174be61cfa5160';
const API_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string; 
  poster_path: string;
  
}

const Home = () => {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  const [movies, setMovies] = useState<Movie[]>([]);

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
        console.log('Respuesta de la API:', response.data);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Navbar />
      <MyForm onSubmit={onSubmit} />
      <div>
      <h1 className='text-center text-2xl'>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>
            <p>Fecha de lanzamiento: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Home;
