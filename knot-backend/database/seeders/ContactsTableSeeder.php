<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\ContactHistory;
use Faker\Factory as Faker;

class ContactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Create 10 contacts
        for ($i = 1; $i <= 10; $i++) {
            $email = $faker->unique()->safeEmail;

            $contact = Contact::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $email,
                'phone' => $faker->phoneNumber,
            ]);

            // Create 2 history entries per contact (totaling 20 entries)
            for ($j = 1; $j <= 2; $j++) {
                ContactHistory::create([
                    'contact_id' => $contact->id,
                    'first_name' => $contact->first_name,
                    'last_name' => $contact->last_name,
                    'email' => $contact->email,
                    'phone' => $contact->phone,
                    'changed_at' => now(), // Example date/time of change
                ]);
            }
        }
    }
}
