import axios from 'axios';
import { Check, Clipboard, Hash, Info, Wand2 } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setData(null);
        try {
            const response = await axios.post('http://localhost:8080/youtube/search', null, {
                params: { videoTitle: title }
            });
            setData(response.data);
        } catch (err) {
            console.error(err);
            alert("Backend error! Make sure Spring Boot is running and CORS is enabled.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (tagsArray) => {
        if (!tagsArray) return;
        const tagsString = tagsArray.join(', ');
        navigator.clipboard.writeText(tagsString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        /* overflow-x-hidden ensures the screen doesn't shake left/right */
        <div className="w-full overflow-x-hidden bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container mx-auto px-3 xs:px-4 max-w-2xl mt-6 md:mt-12 pb-12">
                
                {/* Header Section */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="main-title-gradient text-3xl xs:text-4xl md:text-5xl font-extrabold mb-3 leading-tight px-2">
                        YouTube SEO Tag Generator
                    </h1>
                    <div className="bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 md:p-4 mt-4">
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg break-words leading-relaxed">
                            Enter a YouTube video title to extract SEO tags and optimize your content.
                        </p>
                    </div>
                </div>

                {/* Input Form Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mb-8 mx-1">
                    <form onSubmit={handleSearch}>
                        <label className="block text-xs md:text-sm font-medium mb-2 dark:text-slate-300">
                            YouTube Video Title
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. How to learn Java"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-3 mb-4 md:mb-6 rounded-lg border border-slate-300 dark:border-slate-600 
                                       bg-white dark:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                       dark:focus:ring-blue-900 transition-all outline-none dark:text-white text-sm md:text-base"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg 
                                       shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95 text-sm md:text-base"
                        >
                            {loading ? (
                                <span className="animate-pulse">Generating...</span>
                            ) : (
                                <><Wand2 size={18} /> <span className="whitespace-nowrap">Generate SEO Tags</span></>
                            )}
                        </button>
                    </form>
                </div>

                {/* Copy Notification Toast */}
                {copied && (
                    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-5 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-bounce text-xs md:text-sm whitespace-nowrap">
                        <Check size={16} /> Tags copied to clipboard!
                    </div>
                )}

                {/* Results Section */}
                {data && (
                    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        {/* Primary Video Section */}
                        {data.primaryVideo && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mx-1">
                                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-3">
                                    <h3 className="flex items-center gap-2 font-bold dark:text-white text-sm md:text-base">
                                        <Hash className="text-blue-500" size={18} /> Primary Video Tags
                                    </h3>
                                    <button
                                        onClick={() => copyToClipboard(data.primaryVideo.tags)}
                                        className="w-full xs:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
                                    >
                                        <Clipboard size={14} /> Copy Tags
                                    </button>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-4 italic line-clamp-2">
                                    {data.primaryVideo.title}
                                </p>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {data.primaryVideo.tags.map((tag, index) => (
                                        <span key={index} className="bg-green-500/10 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1 text-[10px] md:text-xs dark:text-slate-300 max-w-full truncate">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Videos List */}
                        {data.relatedVideos && data.relatedVideos.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mx-1">
                                <h3 className="font-bold mb-4 md:mb-6 flex items-center gap-2 dark:text-white text-sm md:text-base">
                                    <Info className="text-blue-500" size={18} /> Related Videos Tags
                                </h3>
                                <div className="space-y-6">
                                    {data.relatedVideos.map((video, idx) => (
                                        <div key={idx} className="border-b last:border-0 border-slate-100 dark:border-slate-700 pb-4">
                                            <p className="font-semibold text-xs md:text-sm mb-3 dark:text-slate-200 line-clamp-2 leading-snug">
                                                {video.title}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {video.tags && video.tags.length > 0 ? (
                                                    video.tags.map((tag, i) => (
                                                        <span key={i} className="text-[10px] md:text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md dark:text-slate-400 max-w-[140px] truncate">
                                                            #{tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-400 italic text-[10px]">No tags found</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;