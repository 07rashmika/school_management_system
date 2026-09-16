import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function FlashMessages() {
    const { flash } = usePage().props;
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        setDismissed(false);
    }, [flash.success, flash.error]);

    if (dismissed || (!flash.success && !flash.error)) {
        return null;
    }

    const isError = Boolean(flash.error);

    return (
        <div
            role="alert"
            className={`flex items-center justify-between gap-4 rounded-md px-4 py-3 text-sm ${
                isError
                    ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}
        >
            <span>{flash.error ?? flash.success}</span>
            <button
                type="button"
                onClick={() => setDismissed(true)}
                className="font-medium underline underline-offset-2"
            >
                Dismiss
            </button>
        </div>
    );
}
