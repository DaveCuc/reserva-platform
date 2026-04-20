export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-brand-ink ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
