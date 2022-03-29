// Helper types that describes Sanity Documents where Reference Access (dereference) is used
// https://www.sanity.io/docs/groq-operators#dae298fc7952

import type {
  PersonReference,
  Person,
  Session,
  SanityKeyed,
  ScheduleItem,
  Program
} from './schema'

// What is Dereferencing practically speaking?
// If the GROQ looks like this:
// persons[] {
//   person
// }
// Then the type of `person` is `SanityReference<Person>`
// But if the GROQ uses the Reference Access pointer:
// persons[] {
//   person->
// }
// Them the type of `person` is `Person`
export interface DereferencedPersonReference
  extends Omit<PersonReference, 'person'> {
  person?: Person;
}

export interface DereferencedSession extends Omit<Session, 'persons'> {
  persons?: Array<SanityKeyed<DereferencedPersonReference>>;
}

export interface DereferencedScheduleItem
  extends Omit<ScheduleItem, 'session'> {
  session?: DereferencedSession;
}

export interface DereferencedProgram extends Omit<Program, 'schedule'> {
  schedule?: Array<SanityKeyed<DereferencedScheduleItem>>;
}
