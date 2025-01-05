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

    export default function ReviewPage() {
      const [shippingData, setShippingData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

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

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
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
