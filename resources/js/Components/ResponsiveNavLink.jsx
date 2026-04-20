import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-brand bg-brand-pale text-brand-ink focus:border-brand-dark focus:bg-brand-soft/20 focus:text-brand-ink'
                    : 'border-transparent text-brand-text hover:border-brand-soft hover:bg-brand-pale hover:text-brand-ink focus:border-brand-soft focus:bg-brand-pale focus:text-brand-ink'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
