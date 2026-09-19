import { useForm, usePage } from '@inertiajs/react';
import { update as updateLocale } from '@/routes/locale';

interface LanguageSwitcherProps {
    locale?: string;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps = {}) {
    const currentLocale = locale ?? (usePage().props.locale as string) ?? 'en';
    const { setData, post, processing } = useForm({
        locale: currentLocale,
        redirect: '',
    });

    const handleChange = (newLocale: string) => {
        setData({
            locale: newLocale,
            redirect: window.location.pathname + window.location.search,
        });
        post(updateLocale.url(), { preserveScroll: true });
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'ar' ? 'اللغة' : 'Language'}
            </span>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                    onClick={() => handleChange('en')}
                    disabled={processing || currentLocale === 'en'}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        currentLocale === 'en'
                            ? 'bg-primary text-white'
                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => handleChange('ar')}
                    disabled={processing || currentLocale === 'ar'}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        currentLocale === 'ar'
                            ? 'bg-primary text-white'
                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                    }`}
                >
                    العربية
                </button>
            </div>
        </div>
    );
}

export default LanguageSwitcher;