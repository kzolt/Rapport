// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from 'drizzle-orm'
import { jsonb, pgTableCreator, timestamp, varchar } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `rapport_${name}`)

/**
 * Tables
 */
export const location = createTable('location', {
    id: varchar('id', { length: 128 }).primaryKey(),
    name: varchar('name', { length: 128 }),
    company: varchar('company', { length: 128 }),

    created_at: timestamp('created_at').defaultNow(),
})

export const participant = createTable('participant', {
    id: varchar('id', { length: 128 }).primaryKey(),
    location_id: varchar('location_id', { length: 128 }),

    first_name: varchar('first_name', { length: 128 }).notNull(),
    last_name: varchar('last_name', { length: 128 }).notNull(),
    rank: varchar('rank', { length: 128 }).$type<Rank>().notNull().default('white'),
    image_key: varchar('image_key', { length: 128 }).notNull(),

    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const customer = createTable('customer', {
    id: varchar('id', { length: 128 }).primaryKey(),
    first_name: varchar('first_name', { length: 128 }).notNull(),
    last_name: varchar('last_name', { length: 128 }).notNull(),
    email: varchar('email', { length: 128 }).notNull(),
    phone: varchar('phone', { length: 128 }).notNull(),

    participant_id: varchar('participant_id', { length: 128 }),
    location_id: varchar('location_id', { length: 128 }),

    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const progress_report = createTable('progress_report', {
    id: varchar('id', { length: 128 }).primaryKey(),
    participant_id: varchar('participant_id', { length: 128 }),
    content: jsonb('content').$type<ProgressReport[]>(),

    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const session = createTable('session', {
    id: varchar('id', { length: 128 }).primaryKey(),
    participant_id: varchar('participant_id', { length: 128 }),
    location_id: varchar('location_id', { length: 128 }),

    time_in: timestamp('time_in', { withTimezone: true }).notNull(),
    time_out: timestamp('time_out', { withTimezone: true }),
    type: varchar('type', { length: 128 }).$type<SessionType>().notNull(),

    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

/**
 * Relations
 */
export const customer_relations = relations(customer, ({ one, many }) => ({
    location: one(location, {
        fields: [customer.location_id],
        references: [location.id],
    }),
    participant: many(participant),
}))

export const participant_relations = relations(participant, ({ one, many }) => ({
    location: one(location, {
        fields: [participant.location_id],
        references: [location.id],
    }),
    customer: one(customer, {
        fields: [participant.id],
        references: [customer.participant_id],
    }),
    progress_report: many(progress_report),
    session: many(session),
}))

export const progress_report_relations = relations(progress_report, ({ one }) => ({
    participant: one(participant, {
        fields: [progress_report.participant_id],
        references: [participant.id],
    }),
}))

export const session_relations = relations(session, ({ one }) => ({
    participant: one(participant, {
        fields: [session.participant_id],
        references: [participant.id],
    }),
}))
