import { Head, Link, useForm } from "@inertiajs/react";

import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function CreateTrade() {
    const { data, setData, post, processing, errors } = useForm({
        comercial_name: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post("/directory/trades");
    };

    return (
        <MainLayout>
            <Head title="Crear Registro Trade" />

            <div className="mx-auto mt-10 flex h-full max-w-5xl p-6 md:items-center md:justify-center">
                <div className="rounded-xl border border-brand-soft bg-white p-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-brand-text">Registra tu negocio</h1>
                    <p className="mt-2 text-sm text-brand-ink">
                        Crea un nuevo registro para tu punto de venta y completa sus datos en el editor.
                    </p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Nombre comercial</label>
                            <Input
                                disabled={processing}
                                placeholder="Ej. Mercado Artesanal Los Pinos"
                                value={data.comercial_name}
                                onChange={(e) => setData("comercial_name", e.target.value)}
                                className="focus-visible:ring-brand-ring"
                            />
                            <p className="text-[0.8rem] text-brand-ink">
                                Este será el nombre principal visible en tu registro.
                            </p>
                            {errors.comercial_name && (
                                <p className="mt-1 text-sm text-red-500">{errors.comercial_name}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-x-2">
                            <Link href="/trade">
                                <Button type="button" variant="ghost">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!data.comercial_name || processing}>
                                Continuar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
