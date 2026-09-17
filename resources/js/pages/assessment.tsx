import { Head } from '@inertiajs/react';
import AssessmentWizard from '@/components/assessment-wizard';
import type { PageProps } from '@/types';

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
    return (
        <>
            <Head title={translations.report_title || 'Digital Presence Assessment'} />
            <AssessmentWizard
                categories={categories}
                whatsappNumber={whatsappNumber}
                locale={locale}
                translations={translations}
            />
        </>
    );
}