import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-brand text-brand-ink focus:border-brand-dark'
                    : 'border-transparent text-brand-text hover:border-brand-soft hover:text-brand-ink focus:border-brand-soft focus:text-brand-ink') +
                className
            }
        >
            {children}
        </Link>
    );
}
