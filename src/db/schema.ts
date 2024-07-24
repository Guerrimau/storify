
import { time } from 'console';
import { int } from 'drizzle-orm/mysql-core';
import { integer, varchar, pgTable, serial, text, boolean, timestamp, numeric } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('UsersTable',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    celular: varchar('phone', {length: 15}).notNull(),
    email: text('email').notNull().unique(),
    address_details: text('address_details').notNull(),
    company_name: text('company_name').notNull(),
    role: boolean('role').notNull(),
});

export const OrderTable = pgTable('OrderTable',{
    id: serial('id').primaryKey(),
    client_id: integer('client_id').notNull()
    .references(()=> UsersTable.id, { onDelete: 'cascade' }),
    delivery_date: timestamp('delivery_date').notNull().defaultNow(),
    total: numeric('total').notNull(),
    status: timestamp('status').notNull().defaultNow()
    .$onUpdate(()=> new Date()),
    paid: boolean('paid').notNull().default(false),
});

export const OrderItemTable = pgTable('OrderItemTable',{
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull()
    .references(()=> OrderTable.id, { onDelete: 'cascade' }),
    item_id: integer('item_id').notNull()
    .references(()=> ProductTable.id, { onDelete: 'cascade' }),
    price: numeric('price').notNull(),
    unit: varchar('unit', {length: 10}).notNull(),
    quality: numeric('quality').notNull(),
    price_per_unit: numeric('price_per_unit').notNull(),
    total_price: numeric('total_price').notNull(),
    amount: numeric('amount').notNull(),
});

export const ProductTable = pgTable('ProductTable',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    initial_price: numeric('price').notNull(),
    stock: numeric('stock').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
});

export const ProductCategoryTable = pgTable('ProductCategoryTable',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
});

export const ProviderTable = pgTable('ProviderTable',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    phone: varchar('phone', {length: 15}).notNull(),
    email: text('email').notNull().unique(),
    address: text('address').notNull(),
    address_details: text('address_details').notNull(),
    company_name: text('company_name').notNull(),
    role: boolean('role').notNull(),
});

export type InsertUser = typeof UsersTable.$inferInsert;
export type SelectUser = typeof UsersTable.$inferSelect;

export type InsertOrder = typeof OrderTable.$inferInsert;
export type SelectOrder = typeof OrderTable.$inferSelect;

export type InsertOrderItem = typeof OrderItemTable.$inferInsert;
export type SelectOrderItem = typeof OrderItemTable.$inferSelect;

export type InsertProduct = typeof ProductTable.$inferInsert;
export type SelectProduct = typeof ProductTable.$inferSelect;

export type InsertProductCategory = typeof ProductCategoryTable.$inferInsert;
export type SelectProductCategory = typeof ProductCategoryTable.$inferSelect;

export type InsertProvider = typeof ProviderTable.$inferInsert;
export type SelectProvider = typeof ProviderTable.$inferSelect;