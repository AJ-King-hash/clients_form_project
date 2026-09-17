import { useForm } from '@inertiajs/react';

interface LanguageSwitcherProps {
    locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const { setData, post, processing } = useForm({ locale });

    const handleChange = (newLocale: string) => {
        setData('locale', newLocale);
        post('/locale', { preserveScroll: true });
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {locale === 'ar' ? 'اللغة' : 'Language'}
            </span>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                    onClick={() => handleChange('en')}
                    disabled={processing || locale === 'en'}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        locale === 'en'
                            ? 'bg-primary text-white'
                            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => handleChange('ar')}
                    disabled={processing || locale === 'ar'}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        locale === 'ar'
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