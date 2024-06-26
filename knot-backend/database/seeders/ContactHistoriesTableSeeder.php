<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactHistory;
use App\Models\Contact;
use Faker\Factory as Faker;

class ContactHistoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Retrieve all contacts (assuming you have them seeded already)
        $contacts = Contact::all();

        foreach ($contacts as $contact) {
            // Create 2 history entries per contact (totaling 20 entries)
            for ($i = 0; $i < 2; $i++) {
                ContactHistory::create([
                    'contact_id' => $contact->id,
                    'first_name' => $faker->firstName,
                    'last_name' => $faker->lastName,
                    'email' => $faker->unique()->safeEmail,
                    'phone' => $faker->phoneNumber,
                    'changed_at' => now(), // Example date/time of change
                ]);
            }
        }
    }
}
