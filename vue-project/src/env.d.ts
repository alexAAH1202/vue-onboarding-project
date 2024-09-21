/// <reference types="vite/client" />

interface ImportMetaEnv {
    // You can add custom environment variables here if needed
    // readonly VITE_CUSTOM_VARIABLE: string
}

// Extend the existing ImportMeta interface
interface ImportMeta {
    readonly env: ImportMetaEnv
}