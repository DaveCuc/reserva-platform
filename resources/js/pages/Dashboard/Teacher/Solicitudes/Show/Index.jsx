import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { Button } from "@/Components/ui/button";
import { Preview } from "@/Components/Preview";

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
            <Head title={`Solicitud: ${trade.comercial_name || "Sin Nombre"}`} />

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

            <div className="mx-auto max-w-6xl p-6 pb-20">
                <Link href="/teacher/solicitudes" className="mb-6 inline-flex items-center text-sm hover:opacity-80">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a solicitudes
                </Link>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6">
                        <div className="flex items-center gap-4">
                            {trade.image_url ? (
                                <img src={trade.image_url} alt={trade.comercial_name} className="h-20 w-20 rounded-md object-cover border" />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-md bg-brand-pale text-brand-ink border">
                                    Sin foto
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-brand-text">{trade.comercial_name || "Nombre Comercial No Definido"}</h1>
                                <p className="mt-1 text-sm text-brand-ink">
                                    Solicitante: {trade.user?.name || "Sin usuario"} ({trade.user?.email || "sin correo"})
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={approve}
                                disabled={!canReview}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Aprobar
                            </Button>
                            <Button
                                onClick={reject}
                                disabled={!canReview}
                                variant="outline"
                                className="border-rose-200 text-rose-700 hover:bg-rose-50"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Rechazar
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Columna Izquierda */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Acerca del negocio</h2>
                                <div className="space-y-4 rounded-lg border bg-brand-pale p-5 text-sm text-brand-ink">
                                    <div>
                                        <span className="font-bold">Giros: </span>
                                        {(trade.giros || []).length
                                            ? trade.giros.map((giro) => giro.name).join(", ")
                                            : "Sin giros"}
                                    </div>
                                    <div>
                                        <span className="font-bold">Descripción Corta: </span>
                                        <p className="mt-1">{trade.descripcion_corta || "Sin descripción corta"}</p>
                                    </div>
                                    <div>
                                        <span className="font-bold">Descripción Larga: </span>
                                        {trade.descripcion_larga ? (
                                            <div className="mt-2 rounded bg-white p-3 border">
                                                <Preview value={trade.descripcion_larga} />
                                            </div>
                                        ) : (
                                            <p className="mt-1">Sin descripción larga</p>
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-bold">Actividades: </span>
                                        {trade.activities?.length ? (
                                            <ul className="ml-5 mt-1 list-disc">
                                                {trade.activities.map((act, i) => <li key={i}>{act}</li>)}
                                            </ul>
                                        ) : (
                                            <p className="mt-1">Sin actividades</p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Galería de Imágenes</h2>
                                <div className="rounded-lg border bg-brand-pale p-5">
                                    {trade.gallery_images?.length ? (
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {trade.gallery_images.map((img, i) => (
                                                <img key={i} src={img} alt={`Galería ${i}`} className="h-24 w-full rounded object-cover border bg-white" />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-brand-ink">Sin imágenes en galería</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Columna Derecha */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Contacto del Negocio</h2>
                                <div className="space-y-3 rounded-lg border bg-brand-pale p-5 text-sm text-brand-ink">
                                    <p><strong>Teléfono:</strong> {trade.phone || "No definido"}</p>
                                    <p><strong>Correo:</strong> {trade.email || "No definido"}</p>
                                    <p>
                                        <strong>Sitio web:</strong>{" "}
                                        {trade.website ? (
                                            <a href={trade.website} target="_blank" rel="noreferrer" className="text-brand-text underline hover:text-brand-soft">
                                                {trade.website}
                                            </a>
                                        ) : "No definido"}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Ubicación</h2>
                                <div className="space-y-3 rounded-lg border bg-brand-pale p-5 text-sm text-brand-ink">
                                    <p><strong>Región:</strong> {trade.region?.name || trade.region || "No definida"}</p>
                                    <p><strong>Municipio:</strong> {trade.municipio?.name || "No definido"}</p>
                                    <p><strong>Dirección:</strong> {trade.address || "No definida"}</p>
                                    <p>
                                        <strong>Coordenadas Mapa:</strong>{" "}
                                        {trade.map_location ? (
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${trade.map_location}`} target="_blank" rel="noreferrer" className="text-brand-text underline hover:text-brand-soft">
                                                {trade.map_location} (Ver en Maps)
                                            </a>
                                        ) : "No definidas"}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Contacto Personal (Propietario)</h2>
                                <div className="space-y-3 rounded-lg border bg-brand-pale p-5 text-sm text-brand-ink">
                                    <p><strong>Nombre:</strong> {trade.personal_name || "No definido"}</p>
                                    <p><strong>Teléfono:</strong> {trade.personal_phone || "No definido"}</p>
                                    <p><strong>Correo:</strong> {trade.personal_email || "No definido"}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
