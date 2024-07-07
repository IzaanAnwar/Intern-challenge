import { InferInsertModel, InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  mysqlTable,
  text,
  varchar,
  type AnyMySqlColumn,
  int,
  time,
  timestamp,
  longtext,
  serial,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  address: varchar('address', { length: 255 }),
  phone: varchar('phone', { length: 10 }).unique(),
  password: varchar('password', { length: 255 }).notNull(),
  roll: int('roll'),
  departmentId: varchar('department_id', { length: 255 }).references(() => departments.id),
  uid: varchar('uid', { length: 255 }),
  role: text('role', { enum: ['user', 'supervisor', 'admin'] }),
  status: varchar('status', { length: 20, enum: ['active', 'suspended'] }).default('active'),
  supervisorId: varchar('supervisor_id', { length: 255 }).references((): AnyMySqlColumn => users.id),
});

export const equipments = mysqlTable('equipments', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  place: varchar('place', { length: 255 }).notNull(),
  status: varchar('maintenance_status', { length: 12, enum: ['active', 'maintenance', 'retired'] }).notNull(),
  description: text('description').notNull(),
});

export const slots = mysqlTable('slots', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  equipmentId: varchar('equipment_id', { length: 255 })
    .notNull()
    .references(() => equipments.id),
  slotType: varchar('slot_type', { length: 12, enum: ['MORNING', 'DAY', 'EVENING', 'NIGHT'] }).notNull(),
  slotCost: int('slot_cost').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  slotDuration: int('slot_duration').notNull(),
  maxBookings: int('max_bookings').notNull(),
});

export const maintenanceLogs = mysqlTable('maintenance_logs', {
  id: serial('id').primaryKey(),
  equipmentId: varchar('equipment_id', { length: 255 })
    .references(() => equipments.id)
    .notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  reason: text('reason').notNull(),
});

export const creditPoints = mysqlTable('credit_points', {
  supervisorId: varchar('supervisor_id', { length: 255 })
    .notNull()
    .primaryKey()
    .references(() => users.id),
  amount: int('amount').notNull().default(0),
});

export const departments = mysqlTable('departments', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const instructions = mysqlTable('instructions', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  text: longtext('text'),
  changedBy: text('email'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export const bookings = mysqlTable('bookings', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  equipmentId: varchar('equipment_id', { length: 255 })
    .references(() => equipments.id)
    .notNull(),
  userId: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull(),
  remark: varchar('remark', { length: 255 }).notNull(),
  slotTimeStart: timestamp('slot_time_start').notNull(),
  slotDuration: int('slot_duration').notNull(),
  slotTimeEnd: timestamp('slot_time_end').notNull(),
  cost: int('cost').notNull(),
  departmentId: varchar('department_id', { length: 255 })
    .notNull()
    .references(() => departments.id),
  status: varchar('status', { length: 12, enum: ['fulfilled', 'pending', 'cancelled'] }).notNull(),
  supervisorId: varchar('supervisor_id', { length: 255 })
    .references(() => users.id)
    .notNull(),

  bookedAt: timestamp('booked_at', { mode: 'date' }).default(sql`now()`),
  slotType: varchar('slot_type', { length: 12, enum: ['MORNING', 'DAY', 'EVENING', 'NIGHT'] }),
});

export const revokedTokens = mysqlTable('revoked_tokens', {
  token: varchar('token', { length: 500 }).primaryKey().notNull(),
});

// ############################## Relations ######################################

export const userRelations = relations(users, ({ one }) => ({
  supervisor: one(users, {
    fields: [users.supervisorId],
    references: [users.id],
    relationName: 'studentToSupervisor',
  }),
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
}));

export const slotRelations = relations(slots, ({ one }) => ({
  equipment: one(equipments, {
    fields: [slots.equipmentId],
    references: [equipments.id],
  }),
}));
export const equipmentRelations = relations(equipments, ({ many }) => ({
  slots: many(slots),
}));
export const bookingsRelations = relations(bookings, ({ one }) => ({
  equipment: one(equipments, {
    fields: [bookings.equipmentId],
    references: [equipments.id],
    relationName: 'bookingsToEquipment',
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
    relationName: 'bookingsToUser',
  }),
}));

export const maintenanceRelation = relations(maintenanceLogs, ({ one }) => ({
  equipment: one(equipments, {
    fields: [maintenanceLogs.equipmentId],
    references: [equipments.id],
    relationName: 'statusToEquipment',
  }),
}));
export const creditRelation = relations(creditPoints, ({ one }) => ({
  user: one(users, {
    fields: [creditPoints.supervisorId],
    references: [users.id],
    relationName: 'creditToUser',
  }),
}));
