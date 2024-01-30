import React, { useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStore } from '@/utils/storeMovies'; // Importa el store

interface MyFormProps {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
}

export const formSchema = z.object({
  movie: z.string().min(1).max(150),
});

const MyForm: React.FC<MyFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movie: '',
    },
  });

  const searchTerm = useStore(state => state.searchTerm); // Mueve la llamada a useStore fuera del Hook de efecto
  const setSearchTerm = useStore(state => state.setSearchTerm); // Obtiene la función setSearchTerm del store

  useEffect(() => {
    // Asegúrate de que estás en el lado del cliente antes de intentar acceder a useStore
    if (typeof window !== 'undefined') {
      form.setValue('movie', searchTerm);
    }
  }, [searchTerm]); // Agrega searchTerm como dependencia del Hook de efecto

  const onFormSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setSearchTerm(data.movie); // Almacena el término de búsqueda en el store
    onSubmit(data);
  };

  const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
    console.error(errors);
  };

  return (
    <div className="py-16 m-4">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit, onError)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="movie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Buscar Pelicula</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Harry Potter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={'success'}>Buscar</Button>
        </form>
      </Form>
    </div>
  );
};

export default MyForm;
