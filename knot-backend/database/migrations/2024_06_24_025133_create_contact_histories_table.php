<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
    Schema::create('contact_histories', function (Blueprint $table) {
        $table->id();
        $table->foreignId('contact_id')->constrained()->onDelete('cascade');
        $table->string('first_name');
        $table->string('last_name');
        $table->string('email');
        $table->string('phone_number');
        $table->timestamps();
    });
}


    public function down(): void
    {
        Schema::dropIfExists('contact_histories');
    }
};
