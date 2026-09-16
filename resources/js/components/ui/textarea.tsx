import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(function Textarea({ className, ...props }, ref) {
    return (
        <textarea
            ref={ref}
            className={cn(
                'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:focus:ring-white',
                className,
            )}
            {...props}
        />
    );
});
