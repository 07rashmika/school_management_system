import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export function InputLabel({ className, children, ...props }: ComponentProps<'label'>) {
    return (
        <label className={cn('block text-sm font-medium text-gray-700 dark:text-gray-300', className)} {...props}>
            {children}
        </label>
    );
}
