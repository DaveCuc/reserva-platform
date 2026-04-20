<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TradeTaxonomySeeder extends Seeder
{
    public function run(): void
    {
        $giros = [
            'Transporte Comunitario',
            'Talleres comunitarios',
            'Medicina tradicional y bienestar',
            'Parques temáticos comunitarios',
            'Actividades acuáticas comunitarias',
            'Actividades de Aventura o Naturaleza',
            'Hospedaje comunitario',
            'Balneario y Parque Acuático',
            'Gastronomía tradicional',
        ];

        foreach ($giros as $giro) {
            DB::table('giros')->insertOrIgnore([
                'id' => Str::uuid()->toString(),
                'name' => $giro,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $regions = [
            'REGIÓN SEPTENTRIONAL' => [
                'Tecamachalco',
                'Palmar de Bravo',
                'Yehualtepec',
                'Tlacotepec de Benito Juárez',
                'Tepanco de López',
                'Santiago Miahuatlán',
                'Cañada Morelos',
                'Chapulco',
            ],
            'REGIÓN DEL VALLE ZAPOTITLÁN-TEHUACÁN' => [
                'Tehuacán',
                'Zapotitlán',
                'San Gabriel Chilac',
                'San José Miahuatlán',
                'Juan N. Méndez',
                'Atexcal',
                'Caltepec',
            ],
            'REGIÓN SIERRA NEGRA' => [
                'Ajalpan',
                'Coyomeapan',
                'Coxcatlán',
                'Zinacatepec',
            ],
            'REGIÓN CHAZUMBA' => [
                'San Pedro Tequixtepec',
                'Santiago Chazumba',
                'Totoltepec de Guerrero',
            ],
            'DISTRITO 3' => [
                'Concepción Buena Vista',
                'San Juan Bautista Coixtlahuaca',
                'San Miguel Tequixtepec',
                'Tepelmeme Villa De Morelos',
            ],
            'DISTRITO 4' => [
                'Teotitlán de Flores Magón',
                'San Juan de los Cues',
                'San Martín Toxpalan',
                'San Antonio Nanahuatipam',
                'Santa María Tecomavaca',
                'Santa María Ixcatlan',
                'Mazatlan Villa de Flores',
            ],
            'DISTRITO 5' => [
                'San Juan Tepeuxila',
                'San Pedro Jaltepetongo',
                'Santiago Nacaltepec',
                'Santa Maria Papalo',
                'Santos Reyes Papalo',
                'Concepción Papalo',
                'San Juan Bautista Cuicatlán',
                'Santa María Texcatitlan',
                'Valerio Trujano',
                'San Pedro Jocotipac',
            ],
            'DISTRITO 10' => [
                'San Pedro Cántaros Coxcaltepec',
                'Santiago Huauclilla',
                'Santiago Apoala',
                'Santa Maria Apazco',
                'Asunción Nochixtlan',
                'San Miguel Huautla',
            ],
            'DISTRITO 11' => [
                'Santa Catarina Zapoquila',
                'San Juan Bautista Atatlahuaca',
            ],
        ];

        foreach ($regions as $regionName => $municipios) {
            $regionId = (string) Str::uuid();

            DB::table('regions')->insertOrIgnore([
                'id' => $regionId,
                'name' => $regionName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($municipios as $municipio) {
                DB::table('municipios')->insertOrIgnore([
                    'id' => Str::uuid()->toString(),
                    'region_id' => $regionId,
                    'name' => $municipio,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
