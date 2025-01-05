import { drizzle } from 'drizzle-orm/d1';
    import { NextRequest, NextResponse } from 'next/server';
    import { z } from 'zod';
    import { shippingTable } from '@/db/schema';
    import { eq } from 'drizzle-orm';

    const schema = z.object({
      piNumber: z.string(),
      date: z.string(),
      edt: z.string(),
      eta: z.string(),
      companyName: z.string(),
    });

    export async function GET(req: NextRequest) {
      try {
        const db = drizzle(process.env.D1);
        const shippingDetails = await db.select().from(shippingTable);
        return NextResponse.json(shippingDetails);
      } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    }

    export async function POST(req: NextRequest) {
      try {
        const db = drizzle(process.env.D1);
        const body = await req.json();
        const validatedBody = schema.parse(body);
        const inserted = await db.insert(shippingTable).values(validatedBody).returning();
        return NextResponse.json(inserted);
      } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    }
