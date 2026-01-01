import { Menu, Moon, Sun, X, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const navLinks = [
        { name: 'SEO', path: '/' },
        { name: 'Thumbnails', path: '/thumbnail' },
        { name: 'Data', path: '/video-details' },
    ];

    return (
        /* overflow-hidden added to prevent any unintended child overflow */
        <nav className="w-full bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-3 xs:px-4">
                <div className="flex items-center justify-between py-3">
                    
                    {/* Logo - Optimized for small screens */}
                    <Link 
                        to="/" 
                        className="text-blue-600 dark:text-blue-400 font-bold text-lg xs:text-xl flex items-center gap-1.5 active:scale-95 transition-transform"
                    >
                        <Youtube size={24} className="shrink-0" />
                        <span className="hidden xs:inline tracking-tight">YouTube Tools</span>
                        <span className="xs:hidden tracking-tight">YT Tools</span>
                    </Link>

                    {/* Desktop Nav - Hidden on small mobile */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${location.pathname === link.path ? 'bg-blue-600/10 text-blue-600 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button 
                            onClick={() => setIsDark(!isDark)} 
                            className="p-2 ml-2 text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    {/* Mobile Controls - Optimized touch targets */}
                    <div className="flex items-center gap-1.5 md:hidden">
                        <button 
                            onClick={() => setIsDark(!isDark)} 
                            className="p-2 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-lg active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
                        >
                            {isDark ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - iPhone SE friendly */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col gap-1.5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2 duration-300">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                onClick={() => setIsMenuOpen(false)}
                                className={`p-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-blue-600/10 text-blue-600' : 'text-slate-700 dark:text-slate-300 active:bg-slate-50 dark:active:bg-slate-700'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;