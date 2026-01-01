import { Github, Heart, Instagram, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
const Footer = () => {
    return (
        /* overflow-x-hidden ensures no horizontal scroll/shake on mobile */
        <footer className="w-full overflow-x-hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 md:py-8 mt-auto transition-colors duration-300">
            <div className="container mx-auto px-4 text-center">
                
                {/* Brand Logo Section */}
                <div className="flex justify-center items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg md:text-xl mb-3 md:mb-4">
                    <Youtube size={22} className="md:w-6 md:h-6" />
                    <span className="tracking-tight">YouTube Tools</span>
                </div>
                
                {/* Tagline - max-w-xs keeps it narrow on SE */}
                <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-[280px] md:max-w-xs mx-auto mb-5 md:mb-6 leading-relaxed">
                    Professional tools to optimize your YouTube channel and grow your audience instantly.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-5 md:gap-8 mb-5 md:mb-6">
    {/* GitHub */}
    <a 
        href="https://github.com/pra9536" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
        aria-label="GitHub"
    >
        <Github size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase font-semibold hidden md:block">GitHub</span>
    </a>

    {/* LinkedIn */}
    <a 
        href="https://www.linkedin.com/in/prateek-yadav-2616a6257" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex flex-col items-center gap-1 text-slate-400 hover:text-blue-700 transition-all"
        aria-label="LinkedIn"
    >
        <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase font-semibold hidden md:block">LinkedIn</span>
    </a>

    {/* Twitter / X */}
    <a 
        href="https://x.com/Prateek41863008?t=B1k6QTaG0FV0G8SGiAwK6A&s=09" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex flex-col items-center gap-1 text-slate-400 hover:text-sky-500 transition-all"
        aria-label="Twitter"
    >
        <Twitter size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase font-semibold hidden md:block">Twitter</span>
    </a>

    {/* Instagram */}
    <a 
        href="https://www.instagram.com/prateek___yadav____/?hl=en" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group flex flex-col items-center gap-1 text-slate-400 hover:text-pink-600 transition-all"
        aria-label="Instagram"
    >
        <Instagram size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase font-semibold hidden md:block">Instagram</span>
    </a>

    {/* Email */}
    <a 
        href="mailto:prateek246729@gmail.com" 
        className="group flex flex-col items-center gap-1 text-slate-400 hover:text-amber-500 transition-all"
        aria-label="Email Us"
    >
        <Mail size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase font-semibold hidden md:block">Email</span>
    </a>
</div>

                {/* Divider for SE depth */}
                <div className="w-12 h-[1px] bg-slate-200 dark:bg-slate-700 mx-auto mb-5 md:hidden"></div>

                {/* Copyright info */}
                <div className="text-slate-500 dark:text-slate-500 text-[10px] md:text-xs flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                    <div className="flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-500 fill-current animate-pulse" /> for Creators
                    </div>
                    <span className="hidden md:inline text-slate-300">|</span>
                    <div className="font-medium">
                        © {new Date().getFullYear()} YouTube Tools
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;