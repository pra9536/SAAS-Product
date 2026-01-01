import axios from 'axios';
import { AlignLeft, Calendar, Download, Film, Search, Tags, User } from 'lucide-react';
import { useState } from 'react';

const VideoDetailsPage = () => {
    const [videoUrlOrId, setVideoUrlOrId] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setVideoDetails(null);

        try {
            // Spring Boot @RequestParam ke liye data format fix karein
            const params = new URLSearchParams();
            params.append('videoUrlOrId', videoUrlOrId);

            const response = await axios.post('https://saas-product-63r6.onrender.com/youtube/video-details', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            setVideoDetails(response.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            // Backend se aane wala error message dikhayein
            const errorMsg = err.response?.data?.error || "Connection error: Check if Backend is running.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full overflow-x-hidden bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container mx-auto px-3 xs:px-4 max-w-4xl mt-6 md:mt-12 pb-12">
                
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="main-title-gradient text-3xl xs:text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                        YouTube Video Data Retriever
                    </h1>
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mt-4 shadow-sm">
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg">
                            Enter a YouTube video URL or ID to fetch complete video information.
                        </p>
                    </div>
                </div>

                {/* Search Form */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mb-8 mx-1">
                    <form onSubmit={handleFetchDetails}>
                        <label className="block text-xs md:text-sm font-medium mb-2 dark:text-slate-300">
                            YouTube Video URL or ID
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Paste link or ID here..."
                            value={videoUrlOrId}
                            onChange={(e) => setVideoUrlOrId(e.target.value)}
                            className="w-full px-4 py-3 mb-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            {loading ? "Fetching..." : <><Search size={18} /> <span>Fetch Video Data</span></>}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-3 rounded text-sm font-medium">
                            {error}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {videoDetails && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 md:p-6 mx-1 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Thumbnail */}
                            <div className="space-y-4">
                                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <img src={videoDetails.thumbnailUrl} alt="Thumbnail" className="w-full h-auto" />
                                </div>
                                <a href={videoDetails.thumbnailUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 py-2 rounded-lg text-sm font-semibold transition-colors">
                                    <Download size={16} /> Download High-Res
                                </a>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-bold text-xl dark:text-white leading-tight flex gap-2">
                                        <Film className="text-blue-500 shrink-0" /> {videoDetails.title}
                                    </h2>
                                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="flex items-center gap-1"><User size={14}/> {videoDetails.channelTitle}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14}/> {videoDetails.publishedAt}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-sm dark:text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                                        <AlignLeft size={16} className="text-blue-500" /> Description
                                    </h3>
                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap border border-slate-100 dark:border-slate-700 custom-scrollbar">
                                        {videoDetails.description}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-sm dark:text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                                        <Tags size={16} className="text-blue-500" /> Meta Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {videoDetails.tags && videoDetails.tags.length > 0 ? (
                                            videoDetails.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 px-3 py-1 rounded-full text-xs font-medium">
                                                    #{tag}
                                                </span>
                                            ))
                                        ) : <span className="text-slate-400 italic text-xs">No tags found.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoDetailsPage;