<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactHistory;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
class ContactController extends Controller
{
    // Get all contacts
    public function index()
    {
        $contacts = Contact::all();

        return response()->json($contacts);
    }

    // Get a specific contact
    public function show($id)
    {
        $contact = Contact::with('histories')->findOrFail($id);
        return response()->json($contact, 200);
    }

    // Create a new contact
    public function store(StoreContactRequest $request)
    {
        // Simulate slow response
        // sleep(20);

        $contact = Contact::create($request->validated());

        return response()->json($contact, 201);
    }

    // Update a specific contact
    public function update(UpdateContactRequest $request, $id)
    {
        $contact = Contact::findOrFail($id);

        DB::transaction(function () use ($contact, $request) {
            ContactHistory::create([
                'contact_id' => $contact->id,
                'first_name' => $contact->first_name,
                'last_name' => $contact->last_name,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'changed_at' => now()
            ]);

            $contact->update($request->validated());
        });

        return response()->json($contact, 200);
    }

    // Delete a specific contact
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(null, 204);
    }
}
