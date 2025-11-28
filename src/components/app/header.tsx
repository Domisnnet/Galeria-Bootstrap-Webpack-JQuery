"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { searchComponents } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Search, LoaderCircle, BrainCircuit } from 'lucide-react';
import type { Framework, ComponentInfo } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useActionState, useTransition } from 'react';

const frameworks: Framework[] = ['Bootstrap', 'Webpack', 'JQuery'];

const searchSchema = z.object({
  query: z.string().min(3, { message: 'Search query must be at least 3 characters.' }),
});

type HeaderProps = {
  selectedFramework: Framework;
  onFrameworkChange: (framework: Framework) => void;
  onSearchResults: (results: ComponentInfo[], query: string) => void;
};

export function Header({
  selectedFramework,
  onFrameworkChange,
  onSearchResults,
}: HeaderProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const initialState = { success: false, data: [], error: null };
  const [state, formAction] = useActionState(searchComponents, initialState);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: '' },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && state) {
      if (state.success) {
        onSearchResults(state.data, form.getValues('query'));
      } else if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Search Failed',
          description: state.error,
        });
      }
    }
  }, [form.formState.isSubmitSuccessful, state, onSearchResults, form, toast]);
  
  const handleFrameworkClick = (framework: Framework) => {
    onFrameworkChange(framework);
    form.reset();
  };

  const onSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight hidden md:block">Apresentação de Frameworks</h1>
        </div>
        <div className="flex-1">
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex justify-center gap-2">
              {frameworks.map((framework) => (
                <Button
                  key={framework}
                  variant={selectedFramework === framework ? 'secondary' : 'ghost'}
                  onClick={() => handleFrameworkClick(framework)}
                  className="rounded-full"
                >
                  {framework}
                </Button>))}
            </div>
            <Form {...form}>
              <form
                action={onSubmit}
                className="relative"
              >
                <input type="hidden" name="framework" value={selectedFramework} />
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder={`AI search for components in ${selectedFramework}...`}
                            className="pl-10 pr-[90px]"
                            {...field}
                          />
                           <Button type="submit" variant="accent" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-20" disabled={isPending}>
                            {isPending ? (
                              <LoaderCircle className="animate-spin" />
                            ) : (
                              "Search"
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="w-0 md:w-[220px]"/>
      </div>
    </header>
  );
}