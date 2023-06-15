'use client'

import { useEffect } from "react";
import { uiComponentError } from "./types/errors";


export default function Error({
    error,
    reset

}: uiComponentError) {
    useEffect(()=> {
        console.error(error);
    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button 
                onClick={reset}
            >
                Try again
            </button>
        </div>
    )
}