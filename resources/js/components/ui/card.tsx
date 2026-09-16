import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export function Card({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800',
                className,
            )}
            {...props}
        />
    );
}
