import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

export const SelectInput = forwardRef<HTMLSelectElement, ComponentProps<'select'>>(function SelectInput({ className, children, ...props }, ref) {
    return (
        <select
            ref={ref}
            className={cn(
                'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:focus:ring-white',
                className,
            )}
            {...props}
        >
            {children}
        </select>
    );
});
