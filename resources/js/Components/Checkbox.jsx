export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-brand-soft text-brand shadow-sm bg-white focus:ring-brand-ring focus:ring-offset-1 ' +
                className
            }
        />
    );
}
