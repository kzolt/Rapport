// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { jsonb, pgTableCreator, timestamp, varchar } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `rapport_${name}`)

export const center = createTable('center', {
    id: varchar('id', { length: 128 }).primaryKey(),
    name: varchar('name', { length: 128 }),

    created_at: timestamp('created_at').defaultNow(),
})

export const participant = createTable('participant', {
    id: varchar('id', { length: 128 }).primaryKey(),
    first_name: varchar('first_name', { length: 128 }).notNull(),
    last_name: varchar('last_name', { length: 128 }).notNull(),
    progress_report: jsonb('progress_report').$type<ProgressReport[]>(),

    center_id: varchar('center_id', { length: 128 }).references(() => center.id),

    created_at: timestamp('created_at').defaultNow(),
})

export const customer = createTable('customer', {
    id: varchar('id', { length: 128 }).primaryKey(),
    first_name: varchar('first_name', { length: 128 }).notNull(),
    last_name: varchar('last_name', { length: 128 }).notNull(),

    participant_id: varchar('participant_id', { length: 128 }).references(
        () => participant.id
    ),

    created_at: timestamp('created_at').defaultNow(),
})
