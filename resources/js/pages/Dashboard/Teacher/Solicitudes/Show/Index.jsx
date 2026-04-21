import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { Button } from "@/Components/ui/button";

export default function TeacherSolicitudShow({ trade }) {
    const approve = () => {
        router.patch(`/teacher/solicitudes/${trade.id}/approve`);
    };

    const reject = () => {
        router.patch(`/teacher/solicitudes/${trade.id}/reject`);
    };

    const canReview = trade.status === "pending";

    return (
        <MainLayout>
            <Head title={`Solicitud: ${trade.comercial_name}`} />

            {trade.status === "pending" && (
                <Banner
                    variant="warning"
                    label="Solicitud pendiente de revisión."
                />
            )}

            {trade.status === "approved" && (
                <Banner
                    variant="success"
                    label="Solicitud aprobada y visible públicamente."
                />
            )}

            {trade.status === "rejected" && (
                <Banner
                    variant="warning"
                    label="Solicitud rechazada."
                />
            )}

            <div className="mx-auto max-w-6xl p-6">
                <Link href="/teacher/solicitudes" className="mb-6 inline-flex items-center text-sm hover:opacity-80">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a solicitudes
                </Link>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-brand-text">{trade.comercial_name}</h1>
                            <p className="mt-1 text-sm text-brand-ink">
                                Solicitante: {trade.user?.name || "Sin usuario"} ({trade.user?.email || "sin correo"})
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={approve}
                                disabled={!canReview}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                Aprobar
                            </Button>
                            <Button
                                onClick={reject}
                                disabled={!canReview}
                                variant="outline"
                                className="border-rose-200 text-rose-700 hover:bg-rose-50"
                            >
                                Rechazar
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <section>
                            <h2 className="mb-2 text-sm font-semibold text-brand-text">Descripción</h2>
                            <p className="rounded-lg border bg-brand-pale p-4 text-sm text-brand-ink">
                                {trade.descripcion || "Sin descripción"}
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-sm font-semibold text-brand-text">Datos de contacto</h2>
                            <div className="space-y-2 rounded-lg border bg-brand-pale p-4 text-sm text-brand-ink">
                                <p><strong>Actor clave:</strong> {trade.name || "-"}</p>
                                <p><strong>Teléfono:</strong> {trade.phone || "-"}</p>
                                <p><strong>Correo:</strong> {trade.email || "-"}</p>
                                <p><strong>Sitio:</strong> {trade.digital || "-"}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-2 text-sm font-semibold text-brand-text">Ubicación</h2>
                            <div className="space-y-2 rounded-lg border bg-brand-pale p-4 text-sm text-brand-ink">
                                <p><strong>Región:</strong> {trade.region?.name || trade.region || "-"}</p>
                                <p><strong>Municipio:</strong> {trade.municipio?.name || "-"}</p>
                                <p><strong>Dirección:</strong> {trade.address || "-"}</p>
                                <p><strong>Mapa:</strong> {trade.map_location || "-"}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-2 text-sm font-semibold text-brand-text">Giros</h2>
                            <div className="rounded-lg border bg-brand-pale p-4 text-sm text-brand-ink">
                                {(trade.giros || []).length
                                    ? trade.giros.map((giro) => giro.name).join(", ")
                                    : "Sin giros"}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
