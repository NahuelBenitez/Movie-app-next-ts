// components/MovieCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card key={movie.id}className="w-96" >
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-2/3 h-auto mx-auto"
        />
      </CardContent>
      <CardFooter>
        <CardDescription>Release Date: {movie.release_date}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
