<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Ecoturismo',
            'Agroturismo',
            'Turismo Comunitario',
            'Solidario',
            'Responsable',
            'Rural Sostenible'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insertOrIgnore([
                'id' => Str::uuid()->toString(),
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
