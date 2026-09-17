import { useState } from 'react';
import LanguageSwitcher from '@/components/language-switcher';

interface Category {
    id: number;
    slug: string;
    title: string;
    description: string;
    questions: Question[];
}

interface Question {
    id: number;
    question_number: number;
    text: string;
    is_goal_question: boolean;
    options: Option[];
}

interface Option {
    id: number;
    color_tag: string;
    score_weight: number;
    text: string;
}

interface TeaserData {
    preliminary_teaser: string;
    stage_title: string;
    score: number;
    blue_count: number;
}

interface ReportData {
    category_title: string;
    stage_title: string;
    current_diagnosis: string;
    technical_analysis: string;
    recommendation_cta: string;
    goal_cta_text: string;
    score: number;
    blue_count: number;
    tier: number;
}

interface WizardProps {
    categories: Category[];
    whatsappNumber?: string;
    locale: string;
    translations: Record<string, string>;
}

const colorBorder: Record<string, string> = {
    red: 'border-red-500',
    yellow: 'border-amber-500',
    green: 'border-emerald-500',
    blue: 'border-sky-500',
};

const colorBg: Record<string, string> = {
    red: 'bg-red-50',
    yellow: 'bg-amber-50',
    green: 'bg-emerald-50',
    blue: 'bg-sky-50',
};

function getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);

    return match ? decodeURIComponent(match[1]) : null;
}

async function postJson<T>(url: string, payload: unknown): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    const token = getCsrfToken();

    if (token) {
        headers['X-XSRF-TOKEN'] = token;
    }

    const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);

        throw new Error(body?.message ?? 'Something went wrong. Please try again.');
    }

    return res.json();
}

function t(translations: Record<string, string>, key: string, fallback: string): string {
    return translations[key] || fallback;
}

export default function AssessmentWizard({ categories, whatsappNumber = '', locale, translations }: WizardProps) {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [teaser, setTeaser] = useState<TeaserData | null>(null);
    const [report, setReport] = useState<ReportData | null>(null);
    const [form, setForm] = useState({ name: '', phone: '', business_name: '', email: '' });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const questions = selectedCategory?.questions ?? [];
    const nonGoalQuestions = questions
        .filter((q) => !q.is_goal_question)
        .sort((a, b) => a.question_number - b.question_number);
    const goalQuestion = questions.find((q) => q.is_goal_question);

    const teaserAnswers = () => nonGoalQuestions.map((q) => answers[q.id]);
    const allAnswers = () => {
        const goalAnswer = goalQuestion ? answers[goalQuestion.id] : undefined;

        return goalAnswer !== undefined
            ? [...teaserAnswers().filter((id) => id !== undefined), goalAnswer]
            : [];
    };

    const handleAnswer = (questionId: number, optionId: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleNext = async () => {
        setError(null);
        setProcessing(true);

        try {
            if (step === 1 && selectedCategory) {
                setStep(2);
            } else if (step === 2 && selectedCategory) {
                const data = await postJson<TeaserData>('/assessment/evaluate-teaser', {
                    category_slug: selectedCategory.slug,
                    answers: teaserAnswers(),
                });

                setTeaser(data);
                setStep(3);
            } else if (step === 3) {
                setStep(4);
            } else if (step === 4 && selectedCategory) {
                const data = await postJson<{ uuid: string; report: ReportData }>('/assessment/submit', {
                    category_slug: selectedCategory.slug,
                    answers: allAnswers(),
                    ...form,
                });

                setReport(data.report);
                setStep(5);
            }
        } catch (e) {
            if (step === 2) {
                setTeaser(null);
            }

            setError(e instanceof Error ? e.message : t(translations, 'error_generic', 'Something went wrong. Please try again.'));
        } finally {
            setProcessing(false);
        }
    };

    const handleBack = () => {
        setError(null);

        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleReset = () => {
        setStep(1);
        setSelectedCategory(null);
        setAnswers({});
        setTeaser(null);
        setReport(null);
        setForm({ name: '', phone: '', business_name: '', email: '' });
        setError(null);
    };

    const allQ1ToQ6Answered = nonGoalQuestions.every((q) => answers[q.id] !== undefined);
    const goalAnswered = goalQuestion ? answers[goalQuestion.id] !== undefined : false;
    const formComplete = form.name && form.phone && form.business_name;

    const isRtl = locale === 'ar';

    return (
        <div id="assessment-wizard" className="mx-auto w-full max-w-2xl px-4 py-8" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Language Switcher */}
            <div className="mb-6 flex justify-end">
                <LanguageSwitcher locale={locale} />
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                    <span>{t(translations, 'step', 'Step')} {step} {t(translations, 'of', 'of')} {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <div
                        className="h-2 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Step 1: Track Selection */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{t(translations, 'select_track', 'Select a Track')}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
                                    selectedCategory?.id === cat.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700'
                                }`}
                            >
                                <h3 className="font-medium">{cat.title}</h3>
                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    {cat.description}
                                </p>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!selectedCategory || processing}
                        className="w-full rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
                    >
                        {t(translations, 'next', 'Next')}
                    </button>
                </div>
            )}

            {/* Step 2: Questions 1-6 */}
            {step === 2 && selectedCategory && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{t(translations, 'your_answers', 'Answer Questions 1-6')}</h2>
                    {nonGoalQuestions.map((q) => (
                        <div key={q.id} className="space-y-2">
                            <p className="font-medium">
                                {q.question_number}. {q.text}
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {q.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleAnswer(q.id, opt.id)}
                                        className={`rounded-lg border-2 p-3 text-left transition-all ${
                                            answers[q.id] === opt.id
                                                ? `${colorBorder[opt.color_tag]} ${colorBg[opt.color_tag]}`
                                                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700'
                                        }`}
                                    >
                                        <span className="text-sm">{opt.text}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <button onClick={handleBack} className="rounded-lg border px-4 py-2">
                            {t(translations, 'back', 'Back')}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!allQ1ToQ6Answered || processing}
                            className="flex-1 rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
                        >
                            {processing ? t(translations, 'evaluating', 'Evaluating...') : t(translations, 'next', 'Next')}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Question 7 Goal Selection */}
            {step === 3 && selectedCategory && goalQuestion && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{t(translations, 'primary_goal', 'Primary Business Goal')}</h2>
                    <div className="space-y-2">
                        <p className="font-medium">{goalQuestion.text}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {goalQuestion.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer(goalQuestion.id, opt.id)}
                                    className={`rounded-lg border-2 p-3 text-left transition-all ${
                                        answers[goalQuestion.id] === opt.id
                                            ? `${colorBorder[opt.color_tag]} ${colorBg[opt.color_tag]}`
                                            : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700'
                                    }`}
                                >
                                    <span className="text-sm">{opt.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {teaser?.preliminary_teaser && (
                        <div className="no-print rounded-lg border border-primary bg-primary/5 p-4">
                            <p className="font-medium">{t(translations, 'quick_diagnosis', 'Quick Diagnosis')}</p>
                            <p className="mt-1 text-sm">{teaser.preliminary_teaser}</p>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button onClick={handleBack} className="rounded-lg border px-4 py-2">
                            {t(translations, 'back', 'Back')}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!goalAnswered}
                            className="flex-1 rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
                        >
                            {t(translations, 'next', 'Next')}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Lead Capture Form */}
            {step === 4 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{t(translations, 'lead_capture_title', 'Get Your Full Diagnostic Report')}</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{t(translations, 'lead_capture_subtitle', 'Enter your details to receive the complete analysis.')}</p>
                    {teaser?.preliminary_teaser && (
                        <div className="no-print rounded-lg border border-primary bg-primary/5 p-4">
                            <p className="font-medium">{t(translations, 'quick_diagnosis', 'Quick Diagnosis')}</p>
                            <p className="mt-1 text-sm">{teaser.preliminary_teaser}</p>
                        </div>
                    )}
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleNext();
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium">{t(translations, 'name', 'Name')}</label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t(translations, 'phone', 'Phone / WhatsApp')}</label>
                            <input
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t(translations, 'business_name', 'Business Name')}</label>
                            <input
                                type="text"
                                required
                                value={form.business_name}
                                onChange={(e) => setForm((prev) => ({ ...prev, business_name: e.target.value }))}
                                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t(translations, 'email', 'Email (Optional)')}</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!formComplete || processing}
                            className="w-full rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
                        >
                            {processing ? t(translations, 'generating_report', 'Generating Report...') : t(translations, 'get_report', 'Get My Full Report')}
                        </button>
                    </form>
                </div>
            )}

            {/* Step 5: Final Report */}
            {step === 5 && report && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{t(translations, 'report_title', 'Your Digital Presence Diagnostic Report')}</h2>
                    <div
                        id="assessment-report"
                        className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700"
                    >
                        <div className="mb-4">
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {report.stage_title}
                            </span>
                        </div>
                        <h3 className="text-lg font-medium">{report.category_title}</h3>
                        <div className="mt-4 space-y-3">
                            <div>
                                <p className="font-medium">{t(translations, 'current_diagnosis', 'Current Diagnosis')}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {report.current_diagnosis}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">{t(translations, 'technical_analysis', 'Technical Challenge Analysis')}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {report.technical_analysis}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">{t(translations, 'recommendation', 'Core Recommendation')}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {report.recommendation_cta}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">{t(translations, 'goal_cta', 'Goal-Based CTA')}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {report.goal_cta_text}
                                </p>
                            </div>
                        </div>
                        <div className="no-print mt-6 flex flex-wrap gap-2">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(report.recommendation_cta)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                {t(translations, 'book_whatsapp', 'Book via WhatsApp')}
                            </a>
                            <button
                                onClick={() => window.print()}
                                className="rounded-lg border px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            >
                                {t(translations, 'download_pdf', 'Download / Print PDF')}
                            </button>
                            <button
                                onClick={handleReset}
                                className="rounded-lg border px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            >
                                {t(translations, 'evaluate_again', 'Evaluate Another Track')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}