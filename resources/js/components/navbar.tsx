import { Link, router, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown, User, LogOut, Lock, UserPlus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { login, register, dashboard } from '@/routes';

interface Category {
    id: number;
    slug: string;
    title: string;
    description: string;
}

interface NavbarProps {
    categories: Category[];
    locale: string;
    translations: Record<string, string>;
}

const sectionColors = {
    1: { primary: 'blue', gradient: 'from-blue-600 via-indigo-600 to-purple-600', icon: '📝' },
    2: { primary: 'purple', gradient: 'from-purple-600 via-pink-600 to-rose-600', icon: '🎨' },
    3: { primary: 'emerald', gradient: 'from-emerald-600 via-teal-600 to-cyan-600', icon: '🔍' },
    4: { primary: 'amber', gradient: 'from-amber-600 via-orange-600 to-amber-700', icon: '💻' },
};

function t(translations: Record<string, string>, key: string, fallback: string): string {
    return translations[key] || fallback;
}

export default function Navbar({ categories, locale, translations }: NavbarProps) {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                categoriesRef.current &&
                !categoriesRef.current.contains(event.target as Node) &&
                userRef.current &&
                !userRef.current.contains(event.target as Node)
            ) {
                // only close if click outside both
                setActiveDropdown(null);
            } else if (
                (categoriesRef.current && !categoriesRef.current.contains(event.target as Node) && activeDropdown === 'categories') ||
                (userRef.current && !userRef.current.contains(event.target as Node) && activeDropdown === 'user')
            ) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    const scrollToCategory = (slug: string) => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        const element = document.getElementById(`category-${slug}`);
        if (element) {
            // Element exists on current page (welcome)
            setTimeout(() => {
                const top = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }, 100);
            return;
        }
        // Not on welcome page (e.g., assessment page) -> navigate to welcome with hash, or assessment with query
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '') {
            // Already on welcome but element not yet rendered (deferred) - try categories section
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
                const top = categoriesSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
                // After scroll, try again to find specific category
                setTimeout(() => {
                    const el = document.getElementById(`category-${slug}`);
                    if (el) {
                        const t = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: t, behavior: 'smooth' });
                    }
                }, 600);
                return;
            }
        }
        // Navigate to assessment with category pre-selected, or to welcome hash
        // Prefer to go to welcome hash if categories are there, else assessment
        if (categories.some((c) => c.slug === slug)) {
            // If we are on assessment page, select via navigation to /assessment?category=slug
            if (currentPath.startsWith('/assessment')) {
                router.visit(`/assessment?category=${slug}`, { preserveState: false });
            } else {
                // From any other page, go to welcome then scroll
                router.visit(`/#category-${slug}`, { preserveState: false });
                setTimeout(() => {
                    const el = document.getElementById(`category-${slug}`);
                    if (el) {
                        const t = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: t, behavior: 'smooth' });
                    }
                }, 300);
            }
        }
    };

    const isRtl = locale === 'ar';

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
                        : 'bg-transparent'
                )}
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="flex items-center space-x-2" aria-label="Home">
                                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-20 blur-lg" />
                                    <svg
                                        className="relative h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                </div>
                                <span className="hidden font-black text-xl sm:block section-gradient-text-1">
                                    {t(translations, 'brand_name', 'Digital Assessment')}
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-1">
                            {/* Categories Dropdown */}
                            <div className="relative" ref={categoriesRef}>
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                                    className={cn(
                                        'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                        'text-slate-300 hover:text-white hover:bg-white/5',
                                        activeDropdown === 'categories' && 'text-white bg-white/10'
                                    )}
                                    aria-expanded={activeDropdown === 'categories'}
                                    aria-haspopup="true"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        {t(translations, 'categories', 'Categories')}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            'h-4 w-4 transition-transform duration-200',
                                            activeDropdown === 'categories' && 'rotate-180'
                                        )}
                                    />
                                </button>

                                {activeDropdown === 'categories' && (
                                    <div className="absolute right-0 mt-3 w-72 animate-scale-in glass-card overflow-hidden">
                                        <div className="p-3 space-y-1">
                                            {categories.map((cat, index) => {
                                                const color = sectionColors[index + 1 as keyof typeof sectionColors] || sectionColors[1];
                                                return (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onClick={() => scrollToCategory(cat.slug)}
                                                        className={cn(
                                                            'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer',
                                                            'hover:bg-white/5 hover:text-white text-white',
                                                            isRtl ? 'text-right' : 'text-left'
                                                        )}
                                                    >
                                                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg shrink-0 bg-gradient-to-br ${color.gradient}`}>
                                                            {color.icon}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-sm truncate">{cat.title}</p>
                                                            <p className="text-xs text-slate-400 truncate">{cat.description}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="border-t border-white/10 p-3">
                                            <Link
                                                href={dashboard()}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                                            >
                                                <LayoutDashboard className="h-5 w-5" />
                                                {t(translations, 'dashboard', 'Dashboard')}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-2">
                                {auth.user ? (
                                    <div className="relative" ref={userRef}>
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                                            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="hidden sm:block max-w-[120px] truncate">{auth.user.name}</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </button>

                                        {activeDropdown === 'user' && (
                                            <div className="absolute right-0 mt-3 w-48 animate-scale-in glass-card overflow-hidden py-2">
                                                <Link
                                                    href={dashboard()}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    {t(translations, 'dashboard', 'Dashboard')}
                                                </Link>
                                                <hr className="my-2 border-white/10" />
                                                <button
                                                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    {t(translations, 'logout', 'Logout')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="btn-ghost px-4 py-2"
                                        >
                                            <Lock className="h-4 w-4 mr-2" />
                                            {t(translations, 'login', 'Log in')}
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="btn-ghost px-4 py-2 text-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
                                        >
                                            <UserPlus className="h-4 w-4 ml-2" />
                                            {t(translations, 'register', 'Register')}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="rounded-xl p-2 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden animate-slide-up bg-slate-950/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
                            {/* Categories in Mobile */}
                            <div className="space-y-2">
                                <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {t(translations, 'categories', 'Categories')}
                                </h3>
                                {categories.map((cat, index) => {
                                    const color = sectionColors[index + 1 as keyof typeof sectionColors] || sectionColors[1];
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => scrollToCategory(cat.slug)}
                                            className={cn(
                                                'w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer',
                                                'hover:bg-white/5 hover:text-white text-white',
                                                isRtl ? 'text-right' : 'text-left'
                                            )}
                                        >
                                            <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl shrink-0 bg-gradient-to-br ${color.gradient}`}>
                                                {color.icon}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold">{cat.title}</p>
                                                <p className="text-xs text-slate-400">{cat.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <hr className="border-white/10" />

                            {/* Auth in Mobile */}
                            <div className="space-y-3">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={dashboard()}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            <LayoutDashboard className="h-5 w-5" />
                                            <span>{t(translations, 'dashboard', 'Dashboard')}</span>
                                        </Link>
                                        <button
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-rose-400 hover:bg-rose-500/10 transition-colors"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span>{t(translations, 'logout', 'Logout')}</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="btn-secondary w-full justify-center py-3"
                                        >
                                            <Lock className="h-5 w-5 ml-2" />
                                            {t(translations, 'login', 'Log in')}
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="btn-primary-section-1 w-full justify-center py-3"
                                        >
                                            <UserPlus className="h-5 w-5 ml-2" />
                                            {t(translations, 'register', 'Register')}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile menu backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

// Icon components
function LayoutDashboard({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    );
}