import {
  boolean,
  integer,
  real,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone").notNull().unique(),
  address: text("address").notNull(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  orders: many(orders),
}));

export const userRoles = pgEnum("role", ["EMPLOYEE", "ADMIN"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone").notNull().unique(),
  role: userRoles("role").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  initialPrice: real("initial_price").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  totalPrice: real("total_price").notNull(),
  address: text("address").notNull(),
  status: text("status").notNull(),
  paid: boolean("paid").notNull().default(false),
  deliveryDate: date("delivery_date").notNull(),
  clientId: integer("client_id").notNull(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  client: one(clients, {
    fields: [orders.clientId],
    references: [clients.id],
  }),
  items: many(orderItems),
}));

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  units: real("units").notNull(),
  pricePerUnit: real("price_per_unit").notNull(),
  totalPrice: real("total_price").notNull(),
  unitType: varchar("unit_type").notNull(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const providers = pgTable("providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
});

export type OrderDB = typeof orders.$inferSelect;
export type NewOrderDB = typeof orders.$inferInsert;

export type OrderItemDB = typeof orderItems.$inferSelect;
export type NewOrderItemDB = typeof orderItems.$inferInsert;

export type UserDB = typeof clients.$inferSelect;
export type NewUserDB = typeof clients.$inferInsert;

export type ClientDB = typeof clients.$inferSelect;
export type NewClientDB = typeof clients.$inferInsert;

export type ProductDB = typeof products.$inferSelect;
export type NewProductDB = typeof products.$inferInsert;
