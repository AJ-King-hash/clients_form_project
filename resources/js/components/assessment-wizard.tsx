import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle, X, ArrowRight, RefreshCw, Download, FileText, MessageSquare, Share2, Shield, Target } from 'lucide-react';
import LanguageSwitcher from '@/components/language-switcher';
import Navbar from './navbar';
import { evaluateTeaser, submit } from '@/routes/assessment';
import type { RouteDefinition } from '@/wayfinder';

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

const sectionColors = {
    1: {
        primary: 'blue',
        gradient: 'from-blue-600 via-indigo-600 to-purple-600',
        cssGradient: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)',
        cssLight: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(79,70,229,0.15) 50%, rgba(124,58,237,0.15) 100%)',
        solid: '#2563eb',
    },
    2: {
        primary: 'purple',
        gradient: 'from-purple-600 via-pink-600 to-rose-600',
        cssGradient: 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #e11d48 100%)',
        cssLight: 'linear-gradient(135deg, rgba(147,51,234,0.15) 0%, rgba(219,39,119,0.15) 50%, rgba(225,29,72,0.15) 100%)',
        solid: '#9333ea',
    },
    3: {
        primary: 'emerald',
        gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
        cssGradient: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%)',
        cssLight: 'linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(13,148,136,0.15) 50%, rgba(8,145,178,0.15) 100%)',
        solid: '#059669',
    },
    4: {
        primary: 'amber',
        gradient: 'from-amber-600 via-orange-600 to-amber-700',
        cssGradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 50%, #d97706 100%)',
        cssLight: 'linear-gradient(135deg, rgba(217,119,6,0.15) 0%, rgba(234,88,12,0.15) 50%, rgba(217,119,6,0.15) 100%)',
        solid: '#d97706',
    },
};

const optionColorClasses: Record<string, { border: string; bg: string; text: string; dot: string; selectedBorder: string; selectedBg: string }> = {
    red: {
        border: 'border-rose-500/30',
        bg: 'bg-rose-500/5',
        text: 'text-rose-400',
        dot: 'bg-rose-500',
        selectedBorder: 'border-rose-500',
        selectedBg: 'bg-rose-500/10',
    },
    yellow: {
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/5',
        text: 'text-amber-400',
        dot: 'bg-amber-500',
        selectedBorder: 'border-amber-500',
        selectedBg: 'bg-amber-500/10',
    },
    green: {
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/5',
        text: 'text-emerald-400',
        dot: 'bg-emerald-500',
        selectedBorder: 'border-emerald-500',
        selectedBg: 'bg-emerald-500/10',
    },
    blue: {
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/5',
        text: 'text-blue-400',
        dot: 'bg-blue-500',
        selectedBorder: 'border-blue-500',
        selectedBg: 'bg-blue-500/10',
    },
};

function getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

async function postJson<T>(route: RouteDefinition<'post'>, payload: unknown): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    const token = getCsrfToken();
    if (token) {
        headers['X-XSRF-TOKEN'] = token;
    }
    const res = await fetch(route.url, {
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

function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div className={cn('skeleton', className)} />
    );
}

function OptionCard({
    option,
    questionId,
    selectedOptionId,
    onSelect,
    colorScheme,
    isGoal,
    translations,
}: {
    option: Option;
    questionId: number;
    selectedOptionId: number | undefined;
    onSelect: (questionId: number, optionId: number) => void;
    colorScheme: typeof sectionColors[1];
    isGoal?: boolean;
    translations: Record<string, string>;
}) {
    const isSelected = selectedOptionId === option.id;
    const colorClass = optionColorClasses[option.color_tag] || optionColorClasses.blue;

    return (
        <button type="button"
            onClick={() => onSelect(questionId, option.id)}
            className={cn(
                'relative w-full option-card text-right transition-all duration-200 cursor-pointer',
                isSelected
                    ? `${colorClass.selectedBorder} ${colorClass.selectedBg}`
                    : 'hover:border-white/20 hover:bg-slate-800/50'
            )}
        >
            <div className="flex items-start gap-3">
                {/* Colored indicator */}
                <div
                    className={cn(
                        'flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200',
                        isSelected ? 'scale-110' : 'opacity-70'
                    )}
                    style={{
                        background: colorScheme.cssGradient,
                    }}
                >
                    <span className="text-lg">{isGoal ? '🎯' : '✓'}</span>
                </div>

                {/* Option text */}
                <div className="flex-1 min-w-0 pt-1">
                    <p className={cn('font-medium', isSelected ? 'text-white' : 'text-slate-300')}>
                        {option.text}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {isGoal
                            ? `${t(translations, 'goal', 'Goal')}: ${option.color_tag}`
                            : `${t(translations, 'points', 'Points')}: ${option.score_weight}`}
                    </p>
                </div>

                {/* Selection indicator */}
                <div className={cn(
                    'flex-shrink-0 h-6 w-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
                    isSelected
                        ? `${colorClass.selectedBorder} ${colorClass.selectedBg}`
                        : 'border-white/20'
                )}>
                    {isSelected && (
                        <CheckCircle className={`h-4 w-4 ${colorClass.text}`} />
                    )}
                </div>
            </div>
        </button>
    );
}

function ProgressBar({ progress, colorScheme }: { progress: number; colorScheme: typeof sectionColors[1] }) {
    return (
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
                className="progress-bar-fill"
                style={{
                    width: `${progress}%`,
                    background: colorScheme.cssGradient,
                }}
            />
        </div>
    );
}

function StepIndicator({ currentStep, totalSteps, colorScheme }: { currentStep: number; totalSteps: number; colorScheme: typeof sectionColors[1] }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div key={step} className="flex items-center gap-2">
                        <div
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm transition-all duration-300',
                                step < currentStep
                                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                                    : step === currentStep
                                    ? `bg-gradient-to-br ${colorScheme.gradient} text-white shadow-lg`
                                    : 'bg-slate-800/50 text-slate-500 border border-white/10'
                            )}
                        >
                            {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                        </div>
                        {step < totalSteps && (
                            <div
                                className={cn(
                                    'hidden md:block h-1 w-16 rounded transition-all duration-300',
                                    step < currentStep
                                        ? `bg-gradient-to-r ${colorScheme.gradient}`
                                        : 'bg-slate-800/50'
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Modal({ isOpen, onClose, title, children, colorScheme }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    colorScheme: typeof sectionColors[1];
}) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/50 backdrop-blur-sm rounded-t-3xl">
                    <h2 id="modal-title" className="heading-sm text-white">{title}</h2>
                    <button type="button"
                        onClick={onClose}
                        className="btn-ghost p-2 rounded-xl hover:bg-white/10"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6 max-h-[calc(92vh-80px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const resetWizardState = () => {
        setAnswers({});
        setTeaser(null);
        setReport(null);
        setForm({ name: '', phone: '', business_name: '', email: '' });
        setError(null);
        setShowSuccessModal(false);
    };

    const selectCategory = (category: Category, nextStep = 1) => {
        resetWizardState();
        setSelectedCategory(category);
        setStep(nextStep);
    };

    // Pre-select a category and step from the navbar or landing-page URL.
    useEffect(() => {
        if (categories.length === 0) return;

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('category');
        if (!slug) return;

        const found = categories.find((category) => category.slug === slug);
        if (!found) return;

        const requestedStep = Number.parseInt(params.get('step') ?? '1', 10);
        if (selectedCategory?.id === found.id) {
            if (requestedStep === 2 && step === 1) {
                setStep(2);
            }
            return;
        }

        selectCategory(found, requestedStep === 2 ? 2 : 1);
    }, [categories, selectedCategory?.id, step]);

    const colorScheme = selectedCategory
        ? sectionColors[selectedCategory.id as keyof typeof sectionColors] || sectionColors[1]
        : sectionColors[1];

    const questions = selectedCategory?.questions ?? [];
    const nonGoalQuestions = questions
        .filter((q) => !q.is_goal_question)
        .sort((a, b) => a.question_number - b.question_number);
    const goalQuestion = questions.find((q) => q.is_goal_question);

    const answerPayload = (questions: Question[]): Record<number, number> => {
        const payload: Record<number, number> = {};
        questions.forEach((question) => {
            const answer = answers[question.id];
            if (answer !== undefined) {
                payload[question.id] = answer;
            }
        });
        return payload;
    };

    const teaserAnswers = () => answerPayload(nonGoalQuestions);
    const allAnswers = () => {
        const payload = answerPayload(nonGoalQuestions);
        if (goalQuestion && answers[goalQuestion.id] !== undefined) {
            payload[goalQuestion.id] = answers[goalQuestion.id];
        }
        return payload;
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
                const data = await postJson<TeaserData>(evaluateTeaser.post(), {
                    category_slug: selectedCategory.slug,
                    answers: teaserAnswers(),
                });
                setTeaser(data);
                setStep(3);
            } else if (step === 3) {
                setStep(4);
            } else if (step === 4 && selectedCategory) {
                const data = await postJson<{ uuid: string; report: ReportData }>(submit.post(), {
                    category_slug: selectedCategory.slug,
                    answers: allAnswers(),
                    ...form,
                });
                setReport(data.report);
                setStep(5);
                setShowSuccessModal(true);
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
        setShowSuccessModal(false);
    };

    const allQ1ToQ6Answered = nonGoalQuestions.every((q) => answers[q.id] !== undefined);
    const goalAnswered = goalQuestion ? answers[goalQuestion.id] !== undefined : false;
    const formComplete = form.name && form.phone && form.business_name;

    const isRtl = locale === 'ar';

    return (
        <div id="assessment-wizard" className="min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Navbar */}
            <Navbar categories={categories} locale={locale} translations={translations} />

            {/* Background decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                {selectedCategory && (
                    <div
                        className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl opacity-20"
                        style={{ background: colorScheme.cssGradient }}
                    />
                )}
            </div>

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    {/* Language Switcher */}
                    <div className="mb-6 flex justify-end">
                        <LanguageSwitcher locale={locale} />
                    </div>

                    {/* Progress & Step Indicator */}
                    <div className="glass-card p-6 mb-8 animate-slide-up">
                        <StepIndicator currentStep={step} totalSteps={totalSteps} colorScheme={colorScheme} />
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">{t(translations, 'step', 'Step')} {step} {t(translations, 'of', 'of')} {totalSteps}</span>
                                <span className="font-semibold text-white">{Math.round(progress)}%</span>
                            </div>
                            <ProgressBar progress={progress} colorScheme={colorScheme} />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 glass-card border-l-4 border-rose-500 p-4 animate-slide-up" role="alert">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                                    <AlertCircle className="h-5 w-5 text-rose-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-rose-300">{t(translations, 'error', 'Error')}</p>
                                    <p className="text-sm text-rose-400 mt-1">{error}</p>
                                </div>
                                <button type="button"
                                    onClick={() => setError(null)}
                                    className="btn-ghost p-1 rounded-lg text-rose-400 hover:text-rose-300"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Track Selection */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="text-center space-y-3 mb-8">
                                <span className="inline-flex items-center gap-2 badge-section-1">
                                    <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {t(translations, 'select_track', 'Select a Track')}
                                </span>
                                <h2 className="heading-lg text-white">
                                    {t(translations, 'track_selection_title', 'Choose Your Assessment Track')}
                                </h2>
                                <p className="body-md">
                                    {t(translations, 'track_selection_subtitle', 'Each track focuses on a critical aspect of your digital presence. Select the one most relevant to your current goals.')}
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {categories.map((cat, index) => {
                                    const catColor = sectionColors[index + 1 as keyof typeof sectionColors] || sectionColors[1];
                                    const isSelected = selectedCategory?.id === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat)}
                                            className={cn(
                                                'relative group glass-card p-6 overflow-hidden transition-all duration-300',
                                                isSelected
                                                    ? 'border-primary/50 shadow-[0_0_0_1px_var(--primary)_0.2]'
                                                    : 'hover:border-primary/50'
                                            )}
                                        >
                                            {/* Glow effect when selected */}
                                            {isSelected && (
                                                <div
                                                    className="absolute inset-0 rounded-3xl opacity-50"
                                                    style={{
                                                        background: catColor.cssGradient,
                                                        filter: 'blur(20px)',
                                                    }}
                                                />
                                            )}

                                            <div className="relative space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className={cn(
                                                            'flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300',
                                                            isSelected
                                                                ? 'scale-110 shadow-lg'
                                                                : 'group-hover:scale-105'
                                                        )}
                                                        style={{ background: catColor.cssLight }}
                                                    >
                                                        <span className="text-2xl">{index === 0 ? '📝' : index === 1 ? '🎨' : index === 2 ? '🔍' : '💻'}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="heading-sm text-white">{cat.title}</h3>
                                                        <p className="text-sm text-slate-400 mt-1">{cat.description}</p>
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: catColor.solid }}>
                                                        <CheckCircle className="h-4 w-4" />
                                                        {t(translations, 'selected', 'Selected')}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <button type="button"
                                onClick={handleNext}
                                disabled={!selectedCategory || processing}
                                className="w-full flex  items-center justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                                        {t(translations, 'loading', 'Loading...')}
                                    </>
                                ) : (
                                    <>
                                        {t(translations, 'next', 'Next')}
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: Questions 1-6 */}
                    {step === 2 && selectedCategory && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="text-center space-y-2 mb-8">
                                <span className="inline-flex items-center gap-2 badge-section-1">
                                    <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {t(translations, 'questions_1_6', 'Questions 1-6')}
                                </span>
                                <h2 className="heading-lg text-white">
                                    {t(translations, 'answer_questions', 'Answer the Following Questions')}
                                </h2>
                                <p className="body-md">
                                    {t(translations, 'answer_questions_subtitle', 'Select the option that best describes your current situation for each question.')}
                                </p>
                            </div>

                            <div className="space-y-8">
                                {nonGoalQuestions.map((q) => (
                                    <div key={q.id} className="glass-card p-6 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg"
                                                style={{ background: colorScheme.cssLight }}
                                            >
                                                {q.question_number}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{q.text}</p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {t(translations, 'select_one', 'Select one option')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {q.options.map((opt) => (
                                                <OptionCard
                                                    key={opt.id}
                                                    option={opt}
                                                    questionId={q.id}
                                                    selectedOptionId={answers[q.id]}
                                                    onSelect={handleAnswer}
                                                    colorScheme={colorScheme}
                                                    translations={translations}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button type="button"
                                    onClick={handleBack}
                                    className="btn-secondary flex-1 py-3"
                                >
                                    <ChevronLeft className="h-5 w-5 mr-2" />
                                    {t(translations, 'back', 'Back')}
                                </button>
                                <button type="button"
                                    onClick={handleNext}
                                    disabled={!allQ1ToQ6Answered || processing}
                                    className="w-full flex  items-center justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                                            {t(translations, 'evaluating', 'Evaluating...')}
                                        </>
                                    ) : (
                                        <>
                                            {t(translations, 'next', 'Next')}
                                            <ChevronRight className="h-5 w-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Question 7 Goal Selection */}
                    {step === 3 && selectedCategory && goalQuestion && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="text-center space-y-2 mb-8">
                                <span className="inline-flex items-center gap-2 badge-section-2">
                                    <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {t(translations, 'primary_goal', 'Primary Business Goal')}
                                </span>
                                <h2 className="heading-lg text-white">
                                    {t(translations, 'goal_selection_title', 'What\'s Your Primary Goal?')}
                                </h2>
                                <p className="body-md">
                                    {t(translations, 'goal_selection_subtitle', 'This helps us tailor the final recommendations to your specific business objectives.')}
                                </p>
                            </div>

                            <div className="glass-card p-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg"
                                        style={{ background: colorScheme.cssLight }}
                                    >
                                        🎯
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{goalQuestion.text}</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {goalQuestion.options.map((opt) => (
                                        <OptionCard
                                            key={opt.id}
                                            option={opt}
                                            questionId={goalQuestion.id}
                                            selectedOptionId={answers[goalQuestion.id]}
                                            onSelect={handleAnswer}
                                            colorScheme={colorScheme}
                                            isGoal
                                            translations={translations}
                                        />
                                    ))}
                                </div>
                            </div>

                            {teaser?.preliminary_teaser && (
                                <div className="glass-card border-l-4 p-6" style={{ borderColor: colorScheme.solid }}>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
                                            style={{ background: colorScheme.cssLight }}
                                        >
                                            <span className="text-xl">⚡</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white flex items-center gap-2">
                                                <span style={{ color: colorScheme.solid }}>
                                                    {t(translations, 'quick_diagnosis', 'Quick Diagnosis')}
                                                </span>
                                            </h3>
                                            <p className="mt-2 body-md">{teaser.preliminary_teaser}</p>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <span className="status-dot-section-1" />
                                                    {t(translations, 'preliminary_score', 'Preliminary Score')}: {teaser.score}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button type="button"
                                    onClick={handleBack}
                                    className="btn-secondary flex-1 py-3"
                                >
                                    <ChevronLeft className="h-5 w-5 mr-2" />
                                    {t(translations, 'back', 'Back')}
                                </button>
                                <button type="button"
                                    onClick={handleNext}
                                    disabled={!goalAnswered}
                                    className="w-full flex  items-center justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t(translations, 'next', 'Next')}
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Lead Capture Form */}
                    {step === 4 && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="text-center space-y-2 mb-8">
                                <span className="inline-flex items-center gap-2 badge-section-3">
                                    <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {t(translations, 'lead_capture', 'Get Your Report')}
                                </span>
                                <h2 className="heading-lg text-white">
                                    {t(translations, 'lead_capture_title', 'Get Your Full Diagnostic Report')}
                                </h2>
                                <p className="body-md">
                                    {t(translations, 'lead_capture_subtitle', 'Enter your details to receive the complete analysis with personalized recommendations.')}
                                </p>
                            </div>

                            {teaser?.preliminary_teaser && (
                                <div className="glass-card border-l-4 p-6 mb-6" style={{ borderColor: colorScheme.solid }}>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
                                            style={{ background: colorScheme.cssLight }}
                                        >
                                            <span className="text-xl">⚡</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white flex items-center gap-2">
                                                <span style={{ color: colorScheme.solid }}>
                                                    {t(translations, 'quick_diagnosis', 'Quick Diagnosis')}
                                                </span>
                                            </h3>
                                            <p className="mt-2 body-md">{teaser.preliminary_teaser}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {t(translations, 'name', 'Full Name')} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                            className="input-field input-field-section-1"
                                            placeholder={t(translations, 'name_placeholder', 'Ahmed Al-Rashid')}
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {t(translations, 'phone', 'Phone / WhatsApp')} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                                            className="input-field input-field-section-1"
                                            placeholder={t(translations, 'phone_placeholder', '+966 50 123 4567')}
                                            autoComplete="tel"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {t(translations, 'business_name', 'Business Name')} <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.business_name}
                                            onChange={(e) => setForm((prev) => ({ ...prev, business_name: e.target.value }))}
                                            className="input-field input-field-section-1"
                                            placeholder={t(translations, 'business_placeholder', 'Al-Rashid Trading Co.')}
                                            autoComplete="organization"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {t(translations, 'email', 'Email (Optional)')}
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                            className="input-field input-field-section-1"
                                            placeholder={t(translations, 'email_placeholder', 'ahmed@alrashid.com')}
                                            autoComplete="email"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="glass-card p-4 border border-emerald-500/20 bg-emerald-500/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center bg-emerald-500/20">
                                            <Shield className="h-5 w-5 text-emerald-400" />
                                        </div>
                                        <div className="text-sm text-slate-300">
                                            <p className="font-medium text-emerald-400">{t(translations, 'privacy_title', 'Your Data is Secure')}</p>
                                            <p>{t(translations, 'privacy_desc', 'We respect your privacy. Your information will only be used to deliver your assessment report and will never be shared with third parties.')}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!formComplete || processing}
                                    className="w-full flex  items-center justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                                            {t(translations, 'generating_report', 'Generating Report...')}
                                        </>
                                    ) : (
                                        <>
                                            {t(translations, 'get_report', 'Get My Full Report')}
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <button
                                onClick={handleBack}
                                className="w-full btn-secondary py-3"
                            >
                                <ChevronLeft className="h-5 w-5 mr-2" />
                                {t(translations, 'back', 'Back')}
                            </button>
                        </div>
                    )}

                    {/* Step 5: Final Report */}
                    {step === 5 && report && (
                        <div className="space-y-8 animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="inline-flex items-center gap-2 badge-section-4 mb-2">
                                        <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        {t(translations, 'report_ready', 'Report Ready')}
                                    </span>
                                    <h2 className="heading-lg text-white">
                                        {t(translations, 'report_title', 'Your Digital Presence Diagnostic Report')}
                                    </h2>
                                </div>
                                <button type="button"
                                    onClick={handleReset}
                                    className="btn-secondary"
                                >
                                    <RefreshCw className="h-5 w-5 ml-2" />
                                    {t(translations, 'evaluate_again', 'Evaluate Another Track')}
                                </button>
                            </div>

                            <div id="assessment-report" className="glass-card p-8 space-y-8">
                                {/* Header with score and stage */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 rounded-2xl"
                                    style={{ background: colorScheme.cssLight }}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="flex-shrink-0 h-20 w-20 rounded-2xl flex items-center justify-center font-black text-3xl text-white"
                                            style={{ background: colorScheme.cssGradient }}
                                        >
                                            {report.score}%
                                        </div>
                                        <div>
                                            <h3 className="heading-md text-white">{report.category_title}</h3>
                                            <div className="mt-2 flex items-center gap-3">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    style={{ background: colorScheme.cssGradient }}
                                                >
                                                    {report.stage_title}
                                                </span>
                                                <span className="text-sm text-slate-400">
                                                    {t(translations, 'tier', 'Tier')} {report.tier} {t(translations, 'of', 'of')} 4
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(report.recommendation_cta)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary-section-4 flex items-center gap-2 py-3 px-6"
                                        >
                                            <MessageSquare className="h-5 w-5" />
                                            {t(translations, 'book_whatsapp', 'Book via WhatsApp')}
                                        </a>
                                        <button
                                            onClick={() => window.print()}
                                            className="btn-secondary flex items-center gap-2 py-3 px-6"
                                        >
                                            <Download className="h-5 w-5" />
                                            {t(translations, 'download_pdf', 'Download PDF')}
                                        </button>
                                    </div>
                                </div>

                                {/* Report Sections */}
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: AlertCircle,
                                            titleKey: 'current_diagnosis',
                                            titleFallback: 'Current Diagnosis',
                                            content: report.current_diagnosis,
                                            color: 'rose',
                                        },
                                        {
                                            icon: FileText,
                                            titleKey: 'technical_analysis',
                                            titleFallback: 'Technical Challenge Analysis',
                                            content: report.technical_analysis,
                                            color: 'blue',
                                        },
                                        {
                                            icon: Target,
                                            titleKey: 'recommendation',
                                            titleFallback: 'Core Recommendation',
                                            content: report.recommendation_cta,
                                            color: 'emerald',
                                        },
                                        {
                                            icon: Share2,
                                            titleKey: 'goal_cta',
                                            titleFallback: 'Goal-Based Action Plan',
                                            content: report.goal_cta_text,
                                            color: 'amber',
                                        },
                                    ].map((section, index) => (
                                        <div key={index} className="diagnostic-box">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center"
                                                    style={{ background: colorScheme.cssLight }}
                                                >
                                                    <section.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                                        <span className="text-white">
                                                            {t(translations, section.titleKey, section.titleFallback)}
                                                        </span>
                                                    </h4>
                                                    <p className="mt-2 body-md whitespace-pre-line">{section.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Score Breakdown */}
                                <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                                    <h4 className="font-semibold text-white flex items-center gap-2 mb-4">
                                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                                        {t(translations, 'score_breakdown', 'Score Breakdown')}
                                    </h4>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div className="text-center p-4 rounded-xl bg-slate-800/50">
                                            <div className="text-3xl font-black text-emerald-400">{report.score}%</div>
                                            <div className="text-sm text-slate-400">{t(translations, 'overall_score', 'Overall Score')}</div>
                                        </div>
                                        <div className="text-center p-4 rounded-xl bg-slate-800/50">
                                            <div className="text-3xl font-black text-blue-400">{report.blue_count}</div>
                                            <div className="text-sm text-slate-400">{t(translations, 'strength_areas', 'Strength Areas')}</div>
                                        </div>
                                        <div className="text-center p-4 rounded-xl bg-slate-800/50">
                                            <div className="text-3xl font-black text-amber-400">{nonGoalQuestions.length + (goalQuestion ? 1 : 0) - report.blue_count}</div>
                                            <div className="text-sm text-slate-400">{t(translations, 'improvement_areas', 'Improvement Areas')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(report.recommendation_cta)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-section-4 flex items-center gap-2 px-6 py-3"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    {t(translations, 'book_whatsapp', 'Book via WhatsApp')}
                                </a>
                                <button type="button"
                                    onClick={() => window.print()}
                                    className="btn-secondary flex items-center gap-2 px-6 py-3"
                                >
                                    <Download className="h-5 w-5" />
                                    {t(translations, 'download_pdf', 'Download / Print PDF')}
                                </button>
                                <button type="button"
                                    onClick={handleReset}
                                    className="btn-secondary flex items-center gap-2 px-6 py-3"
                                >
                                    <RefreshCw className="h-5 w-5" />
                                    {t(translations, 'evaluate_again', 'Evaluate Another Track')}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Success Modal */}
                    <Modal
                        isOpen={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                        title={t(translations, 'success', 'Success!')}
                        colorScheme={colorScheme}
                    >
                        <div className="text-center space-y-6">
                            <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-emerald-500/20">
                                <CheckCircle className="h-10 w-10 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="heading-md text-white">{t(translations, 'report_generated', 'Your Report is Ready!')}</h3>
                                <p className="mt-2 body-md">
                                    {t(translations, 'report_generated_desc', 'Your comprehensive diagnostic report has been generated. You can view it below and download or share it.')}
                                </p>
                            </div>
                            <button type="button"
                                onClick={() => setShowSuccessModal(false)}
                                className="btn-primary-section-3 w-full sm:w-auto mx-auto"
                            >
                                {t(translations, 'view_report', 'View Report')}
                            </button>
                        </div>
                    </Modal>
                </div>
            </main>
        </div>
    );
}

// Helper functions
function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}