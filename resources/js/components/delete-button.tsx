import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import type { Method } from '@inertiajs/core';

export function DeleteButton({
    route,
    confirmMessage = 'Are you sure you want to delete this record?',
}: {
    route: { url: string; method: Method };
    confirmMessage?: string;
}) {
    function handleClick() {
        if (window.confirm(confirmMessage)) {
            router.visit(route.url, { method: route.method });
        }
    }

    return (
        <Button type="button" variant="danger" size="sm" onClick={handleClick}>
            Delete
        </Button>
    );
}
