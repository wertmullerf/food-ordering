import { useState, useEffect } from "react";

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError((err as Error).message);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};
