import { Head, usePage,Link } from '@inertiajs/react';
import AssessmentWizard from '@/components/assessment-wizard';
import type { PageProps } from '@/types';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

interface Category {
    id: number;
    slug: string;
    title: string;
    description: string;
    questions: {
        id: number;
        question_number: number;
        text: string;
        is_goal_question: boolean;
        options: {
            id: number;
            color_tag: string;
            score_weight: number;
            text: string;
        }[];
    }[];
}

interface AssessmentPageProps extends PageProps {
    categories: Category[];
    whatsappNumber?: string;
    locale: string;
    translations: Record<string, string>;
}

export default function Assessment({ categories = [], whatsappNumber, locale, translations }: AssessmentPageProps) {
    const { auth } = usePage().props;
    return (
        <>
            <Head title={translations.report_title || 'Digital Presence Assessment'} />
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
            <AssessmentWizard
                categories={categories}
                whatsappNumber={whatsappNumber}
                locale={locale}
                translations={translations}
            />
        </>
    );
}