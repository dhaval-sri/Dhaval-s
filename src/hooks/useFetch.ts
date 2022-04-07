import { useEffect, useState } from "react";
import { logError } from "../services/analytics.service";


export function useFetch<T>(url: string): { data: T | undefined, loading: boolean } {

    const [state, setState] = useState({ data: undefined, loading: true });

    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));

        fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => setState({ data: data, loading: false }))
            .catch(err => {
                console.error(err);
                logError(err);
                setState(prevState => ({ ...prevState, loading: false }));
            });
    }, [url]);

    return state;
}


const handleErrors = (res: Response) => {
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return res;
}