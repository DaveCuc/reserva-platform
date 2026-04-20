import Background from '@/Components/Background';
import { Logo } from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f4f6f1] px-4 py-8 sm:px-6 lg:px-8">
            <Background />
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <section className="w-full max-w-md overflow-hidden rounded-2xl bg-white/95 shadow-[0_16px_48px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur">
                    <div className="flex justify-center border-b border-slate-100 bg-brand px-6 py-5 sm:px-8">
                        <Link href="/" className="inline-flex items-center justify-center">
                            <Logo isScrolled={false} className="h-[120px] w-auto" />
                        </Link>
                    </div>
                    <h2 className="mt-4 px-6 py-3 text-center text-2xl font-semibold tracking-tight text-brand-earth sm:px-8">
                        Inicia sesión para continuar
                    </h2>

                    <div className="px-6 py-6 sm:px-8">{children}</div>
                </section>
            </div>
        </div>
    );
}
