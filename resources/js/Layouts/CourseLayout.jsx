import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import Dropdown from '@/Components/Dropdown';
import { Button } from "@/Components/ui/button";
import { CourseSidebar } from "@/Pages/Course/Components/CourseSidebar";
import { ConfettiProvider } from "@/Components/providers/confetti-provider";

const NavbarRoutes = () => {
    const { auth } = usePage().props;

    return (
        <div className="flex gap-x-2 ml-auto items-center">
            <Link href="/dashboard">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" /> Salir del Curso
                </Button>
            </Link>

            <div className="relative ml-2">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-brand-ink hover:text-brand-text focus:outline-none"
                            >
                                {auth?.user?.name || "Usuario"}
                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right">
                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Cerrar Sesión
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
};

const CourseMobileSidebar = ({ course, progressCount, purchase }) => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
            <SheetTitle className="hidden">Menú del curso</SheetTitle>
            <CourseSidebar course={course} progressCount={progressCount} purchase={purchase} />
        </SheetContent>
    </Sheet>
);

const CourseNavbar = ({ course, progressCount, purchase }) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSidebar course={course} progressCount={progressCount} purchase={purchase} />
            <NavbarRoutes />
        </div>
    );
};

export default function CourseLayout({ children, course, progressCount, purchase }) {
    return (
        <div className="h-full min-h-screen relative bg-brand-pale font-sans">
            <ConfettiProvider />
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar course={course} progressCount={progressCount} purchase={purchase} />
            </div>
            
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar course={course} progressCount={progressCount} purchase={purchase} />
            </div>
            
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
}
