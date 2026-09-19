import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, BarChart3, Users, Globe, Lock, Rocket, Target, Layers } from 'lucide-react';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';

interface Category {
    id: number;
    slug: string;
    title: string;
    description: string;
    questions: any[];
}

interface WelcomePageProps {
    auth: {
        user: { name: string; email: string } | null;
    };
    categories: Category[];
    locale: string;
    translations: Record<string, string>;
}

function t(translations: Record<string, string>, key: string, fallback: string): string {
    return translations[key] || fallback;
}

const features = [
    {
        icon: Target,
        titleKey: 'feature_1_title',
        titleFallback: 'Accurate Diagnosis',
        descKey: 'feature_1_desc',
        descFallback: 'AI-powered analysis of your digital presence across 4 key tracks',
    },
    {
        icon: BarChart3,
        titleKey: 'feature_2_title',
        titleFallback: 'Detailed Reports',
        descKey: 'feature_2_desc',
        descFallback: 'Comprehensive diagnostic reports with actionable recommendations',
    },
    {
        icon: Zap,
        titleKey: 'feature_3_title',
        titleFallback: 'Instant Results',
        descKey: 'feature_3_desc',
        descFallback: 'Get your personalized assessment report in minutes, not days',
    },
    {
        icon: Shield,
        titleKey: 'feature_4_title',
        titleFallback: 'Secure & Private',
        descKey: 'feature_4_desc',
        descFallback: 'Your data is encrypted and never shared with third parties',
    },
];

const stats = [
    { value: '500+', labelKey: 'stat_1_label', labelFallback: 'Assessments Completed' },
    { value: '95%', labelKey: 'stat_2_label', labelFallback: 'Satisfaction Rate' },
    { value: '4', labelKey: 'stat_3_label', labelFallback: 'Specialized Tracks' },
    { value: '24h', labelKey: 'stat_4_label', labelFallback: 'Average Report Time' },
];

const sectionColors = {
    1: { gradient: 'from-blue-600 via-indigo-600 to-purple-600', icon: Sparkles, iconBg: 'from-blue-500 to-indigo-600' },
    2: { gradient: 'from-purple-600 via-pink-600 to-rose-600', icon: Globe, iconBg: 'from-purple-500 to-pink-600' },
    3: { gradient: 'from-emerald-600 via-teal-600 to-cyan-600', icon: Lock, iconBg: 'from-emerald-500 to-teal-600' },
    4: { gradient: 'from-amber-600 via-orange-600 to-amber-700', icon: Rocket, iconBg: 'from-amber-500 to-orange-600' },
};

export default function Welcome({ categories = [], locale, translations }: WelcomePageProps) {
    const { auth } = usePage().props;
    const isRtl = locale === 'ar';

    return (
        <>
            <Head title={t(translations, 'welcome_title', 'Digital Presence Assessment')} />
            <div className="min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Navbar */}
                <Navbar categories={categories} locale={locale} translations={translations} />

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 -z-10 overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse-soft" />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-600/5 blur-3xl" />
                        </div>

                        <div className="relative text-center space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                                <span className="text-sm font-medium text-slate-300">
                                    {t(translations, 'new_features', 'New: 4 Specialized Assessment Tracks')}
                                </span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-6">
                                <h1 className="heading-xl text-white">
                                    {t(translations, 'hero_title', 'Evaluate Your Digital Presence')}
                                    <br />
                                    <span className="section-gradient-text-1">
                                        {t(translations, 'hero_title_accent', 'With Precision')}
                                    </span>
                                </h1>
                                <p className="body-lg max-w-3xl mx-auto text-slate-300">
                                    {t(translations, 'hero_subtitle', 'Choose a specialized track and get a comprehensive diagnostic report with actionable insights for your business growth.')}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
href="/assessment"
                                    className="btn-primary-section-1 w-full sm:w-auto"
                                >
                                    {t(translations, 'start_assessment', 'Start Free Assessment')}
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="btn-secondary w-full sm:w-auto"
                                >
                                    {t(translations, 'learn_more', 'Learn More')}
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>{t(translations, 'no_credit_card', 'No credit card required')}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>{t(translations, 'instant_results', 'Instant results')}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>{t(translations, 'secure_data', 'Secure & private')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="glass-card p-6 text-center transition-all duration-300 hover:border-primary/50"
                                >
                                    <div className="text-4xl md:text-5xl font-black section-gradient-text-1 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400">
                                        {t(translations, stat.labelKey, stat.labelFallback)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categories/Tracks Section */}
                <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center space-y-4 mb-16">
                            <span className="badge-section-1">
                                <Sparkles className="h-3 w-3" />
                                {t(translations, 'choose_track', 'Choose Your Assessment Track')}
                            </span>
                            <h2 className="heading-lg text-white">
                                {t(translations, 'tracks_title', '4 Specialized Tracks for Comprehensive Analysis')}
                            </h2>
                            <p className="body-md max-w-2xl mx-auto">
                                {t(translations, 'tracks_subtitle', 'Each track focuses on a critical aspect of your digital presence. Select the one most relevant to your current goals.')}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map((cat, index) => {
                                const color = sectionColors[index + 1 as keyof typeof sectionColors] || sectionColors[1];
                                const Icon = color.icon;
                                return (
                                    <Link
                                        key={cat.id}
                                        href={`/assessment?category=${cat.slug}`}
                                        className={cn(
                                            'relative group glass-card p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1',
                                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
                                        )}
                                        id={`category-${cat.slug}`}
                                    >
                                        {/* Gradient border glow */}
                                        <div
                                            className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color.gradient} blur-xl`}
                                        />

                                        {/* Icon */}
                                        <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl mb-6 shrink-0 bg-gradient-to-br ${color.iconBg}`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative space-y-4">
                                            <h3 className="heading-sm text-white">{cat.title}</h3>
                                            <p className="body-sm">{cat.description}</p>

                                            {/* Feature highlights */}
                                            <ul className="space-y-2 border-t border-white/10 pt-4">
                                                {cat.questions.slice(0, 3).map((q: any, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-400" />
                                                        <span className="truncate">{q.text.substring(0, 50)}...</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Arrow */}
                                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                                    {t(translations, 'start_track', 'Start Assessment')}
                                                </span>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                                                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center space-y-4 mb-16">
                            <span className="badge-section-3">
                                <Sparkles className="h-3 w-3" />
                                {t(translations, 'why_choose_us', 'Why Choose Us')}
                            </span>
                            <h2 className="heading-lg text-white">
                                {t(translations, 'features_title', 'Everything You Need for Digital Success')}
                            </h2>
                            <p className="body-md max-w-2xl mx-auto">
                                {t(translations, 'features_subtitle', 'Our platform combines AI-powered analysis with expert insights to give you the most accurate digital presence assessment.')}
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="glass-card p-6 space-y-4 transition-all duration-300 hover:border-primary/50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="heading-sm text-white">
                                            {t(translations, feature.titleKey, feature.titleFallback)}
                                        </h3>
                                        <p className="mt-2 body-sm">
                                            {t(translations, feature.descKey, feature.descFallback)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/5 to-transparent">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center space-y-4 mb-16">
                            <span className="badge-section-4">
                                <Zap className="h-3 w-3" />
                                {t(translations, 'how_it_works', 'How It Works')}
                            </span>
                            <h2 className="heading-lg text-white">
                                {t(translations, 'steps_title', 'Get Your Report in 3 Simple Steps')}
                            </h2>
                            <p className="body-md max-w-2xl mx-auto">
                                {t(translations, 'steps_subtitle', 'No technical expertise required. Just answer a few questions and get your personalized diagnostic report.')}
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    titleKey: 'step_1_title',
                                    titleFallback: 'Choose Your Track',
                                    descKey: 'step_1_desc',
                                    descFallback: 'Select from 4 specialized assessment tracks tailored to your business needs',
                                    icon: Layers,
                                    color: 'section-gradient-text-1',
                                },
                                {
                                    step: '02',
                                    titleKey: 'step_2_title',
                                    titleFallback: 'Answer Questions',
                                    descKey: 'step_2_desc',
                                    descFallback: 'Complete our intelligent questionnaire designed by industry experts',
                                    icon: Target,
                                    color: 'section-gradient-text-2',
                                },
                                {
                                    step: '03',
                                    titleKey: 'step_3_title',
                                    titleFallback: 'Get Your Report',
                                    descKey: 'step_3_desc',
                                    descFallback: 'Receive a comprehensive diagnostic report with actionable recommendations',
                                    icon: BarChart3,
                                    color: 'section-gradient-text-3',
                                },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className="relative glass-card p-8 space-y-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
                                            <step.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-3xl font-black text-white/10">{step.step}</span>
                                            <h3 className="mt-2 heading-sm text-white">
                                                {t(translations, step.titleKey, step.titleFallback)}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="body-md pl-14 border-r border-white/10 pr-4">
                                        {t(translations, step.descKey, step.descFallback)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="relative glass-card p-12 md:p-16 space-y-8 overflow-hidden">
                            {/* Background glow */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20" />
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent" />

                            <div className="relative space-y-6">
                                <span className="inline-flex items-center gap-2 badge-section-1">
                                    <Sparkles className="h-3 w-3" />
                                    {t(translations, 'ready_to_start', 'Ready to Transform Your Digital Presence?')}
                                </span>
                                <h2 className="heading-lg text-white">
                                    {t(translations, 'cta_title', 'Start Your Free Assessment Today')}
                                </h2>
                                <p className="body-lg">
                                    {t(translations, 'cta_subtitle', 'Join hundreds of businesses who have improved their digital strategy with our comprehensive diagnostic reports.')}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
href="/assessment"
                                        className="btn-primary-section-1 w-full sm:w-auto text-lg px-8 py-4"
                                    >
                                        {t(translations, 'start_now', 'Start Free Assessment')}
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="btn-secondary w-full sm:w-auto text-lg px-8 py-4"
                                    >
                                        {t(translations, 'create_account', 'Create Account')}
                                    </Link>
                                </div>
                                <p className="text-sm text-slate-500">
                                    {t(translations, 'cta_footer', 'No credit card required • Cancel anytime • Secure & private')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="space-y-4">
                                <Link href="/" className="flex items-center gap-2" aria-label="Home">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <span className="font-black text-xl section-gradient-text-1">
                                        {t(translations, 'brand_name', 'Digital Assessment')}
                                    </span>
                                </Link>
                                <p className="body-sm">
                                    {t(translations, 'footer_desc', 'Professional digital presence assessment platform helping businesses grow online.')}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-4">{t(translations, 'quick_links', 'Quick Links')}</h4>
                                <nav className="space-y-2" aria-label="Quick links">
                                    <Link href="/assessment" className="block text-slate-400 hover:text-white transition-colors">
                                        {t(translations, 'assessment', 'Assessment')}
                                    </Link>
                                    <Link href={register()} className="block text-slate-400 hover:text-white transition-colors">
                                        {t(translations, 'register', 'Register')}
                                    </Link>
                                    <Link href={login()} className="block text-slate-400 hover:text-white transition-colors">
                                        {t(translations, 'login', 'Log in')}
                                    </Link>
                                    <Link href={dashboard()} className="block text-slate-400 hover:text-white transition-colors">
                                        {t(translations, 'dashboard', 'Dashboard')}
                                    </Link>
                                </nav>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-4">{t(translations, 'tracks', 'Assessment Tracks')}</h4>
                                <nav className="space-y-2" aria-label="Tracks">
                                    {categories.map((cat, index) => (
                                        <Link
                                            key={cat.id}
href={`/assessment?category=${cat.slug}`}
                                            className="block text-slate-400 hover:text-white transition-colors"
                                        >
                                            {cat.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-4">{t(translations, 'contact', 'Contact')}</h4>
                                <address className="space-y-2 text-slate-400 not-italic">
                                    <p>{t(translations, 'email_label', 'Email:')} <a href="mailto:hello@digitalassessment.com" className="hover:text-white transition-colors">hello@digitalassessment.com</a></p>
                                    <p>{t(translations, 'phone_label', 'Phone:')} <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a></p>
                                </address>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                © {new Date().getFullYear()} {t(translations, 'brand_name', 'Digital Assessment')}. {t(translations, 'all_rights_reserved', 'All rights reserved.')}
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                                </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}