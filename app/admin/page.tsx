'use client';

    import { useState, useEffect } from 'react';
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '@/components/ui/table';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from '@/components/ui/dialog';
    import { Label } from '@/components/ui/label';
    import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from '@/components/ui/form';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import * as z from 'zod';
    import Link from 'next/link';

    const formSchema = z.object({
      piNumber: z.string().min(1, { message: 'P/I Number is required' }),
      date: z.string().min(1, { message: 'Date is required' }),
      edt: z.string().min(1, { message: 'EDT is required' }),
      eta: z.string().min(1, { message: 'ETA is required' }),
      companyName: z.string().min(1, { message: 'Company Name is required' }),
    });

    type FormData = z.infer<typeof formSchema>;

    export default function AdminDashboard() {
      const [shippingData, setShippingData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          piNumber: '',
          date: '',
          edt: '',
          eta: '',
          companyName: '',
        },
      });

      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/shipping');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setShippingData(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      const onSubmit = async (data: FormData) => {
        try {
          const response = await fetch('/api/shipping', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          fetchData();
          form.reset();
        } catch (e: any) {
          setError(e.message);
        }
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <div className="mb-4">
            <Link href="/review">
              <Button>View Shipping Details</Button>
            </Link>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Shipping Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Shipping Details</DialogTitle>
                <DialogDescription>
                  Add new shipping details to the database.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="piNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>P/I Number</FormLabel>
                        <FormControl>
                          <Input placeholder="P/I Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="Date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="edt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EDT</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="EDT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ETA</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="ETA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>P/I Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>EDT</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Company Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.piNumber}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.edt}</TableCell>
                    <TableCell>{item.eta}</TableCell>
                    <TableCell>{item.companyName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      );
    }
