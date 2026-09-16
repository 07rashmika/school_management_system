import { TextInput } from '@/components/ui/text-input';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export function SearchForm({
    initialValue,
    placeholder = 'Search…',
}: {
    initialValue: string;
    placeholder?: string;
}) {
    const [value, setValue] = useState(initialValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    ...Object.fromEntries(
                        new URLSearchParams(window.location.search),
                    ),
                    search: value || undefined,
                    page: undefined,
                },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <TextInput
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="max-w-xs"
            aria-label="Search"
        />
    );
}
