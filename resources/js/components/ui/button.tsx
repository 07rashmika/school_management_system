import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

const variantClasses: Record<Variant, string> = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200',
    secondary:
        'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
};

const sizeClasses: Record<Size, string> = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
};

const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50';

type ButtonProps = ComponentProps<'button'> & {
    variant?: Variant;
    size?: Size;
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
    return <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props} />;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'size' | 'variant'> & {
    variant?: Variant;
    size?: Size;
};

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
    return <Link className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props} />;
}
