import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

    export const shippingTable = sqliteTable('shipping_details', {
      id: integer('id').primaryKey({ autoIncrement: true }),
      piNumber: text('pi_number').notNull(),
      date: text('date').notNull(),
      edt: text('edt').notNull(),
      eta: text('eta').notNull(),
      companyName: text('company_name').notNull(),
    });
