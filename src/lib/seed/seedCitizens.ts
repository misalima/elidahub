import 'dotenv/config';
import { supabaseAdmin } from '../supabaseAdmin';
import { citizens } from './citizens';

async function seedCitizens() {
  for (const citizen of citizens) {
    const { error, data } = await supabaseAdmin.schema("vqdt").from('citizens').insert([citizen]);
    if (error) {
      console.error('Error inserting:', citizen, error);
    } else {
      console.log('Inserted:', data);
    }
  }
  console.log('Seeding complete!');
}

seedCitizens();