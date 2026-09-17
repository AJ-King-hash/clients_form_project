import { useSyncExternalStore } from 'react';

export type Language = 'en' | 'ar';

export type UseLanguageReturn = {
    readonly language: Language;
    readonly dir: 'ltr' | 'rtl';
    readonly updateLanguage: (lang: Language) => void;
};

const listeners = new Set<() => void>();
let currentLanguage: Language = 'en';

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredLanguage = (): Language => {
    if (typeof window === 'undefined') {
        return 'en';
    }
    return (localStorage.getItem('locale') as Language) || 'en';
};

const applyLanguage = (lang: Language): void => {
    if (typeof document === 'undefined') {
        return;
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeLanguage(): void {
    if (typeof window === 'undefined') {
        return;
    }
    if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', 'en');
        setCookie('locale', 'en');
    }
    currentLanguage = getStoredLanguage();
    applyLanguage(currentLanguage);
}

export function useLanguage(): UseLanguageReturn {
    const language: Language = useSyncExternalStore(
        subscribe,
        () => currentLanguage,
        () => 'en',
    );

    const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';

    const updateLanguage = (lang: Language): void => {
        currentLanguage = lang;
        localStorage.setItem('locale', lang);
        setCookie('locale', lang);
        applyLanguage(lang);
        notify();
    };

    return { language, dir, updateLanguage } as const;
}