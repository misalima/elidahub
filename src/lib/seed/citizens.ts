
import { faker } from '@faker-js/faker';
import { CitizenInsert } from '@/services/citizenService';

export const citizens: CitizenInsert[] = Array.from({ length: 50 }).map(() => ({
	full_name: faker.person.fullName(),
	// Generate Brazilian phone: +55 + 2-digit area + 9 + 8 digits
	phone: `+55${faker.number.int({ min: 10, max: 99 })}9${faker.number.int({ min: 10000000, max: 99999999 })}`,
	email: faker.internet.email(),
	observations: faker.datatype.boolean() ? faker.lorem.sentence() : null,
	is_active: true,
}));
