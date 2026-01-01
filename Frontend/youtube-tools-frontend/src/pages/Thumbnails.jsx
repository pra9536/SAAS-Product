import axios from 'axios';
import { AlertCircle, Download, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const Thumbnails = () => {
    const [videoUrlOrId, setVideoUrlOrId] = useState('');
    const [thumbnailData, setThumbnailData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchThumbnail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setThumbnailData(null);

        try {
            const response = await axios.post('http://localhost:8080/get-thumbnail', null, {
                params: { videoUrlOrId: videoUrlOrId }
            });
            setThumbnailData(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch thumbnail. Check the URL or ID.");
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = (url) => {
        const filename = `youtube-thumbnail-${Date.now()}.jpg`;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => alert('Failed to download thumbnail.'));
    };

    return (
        /* Prevents horizontal shaking */
        <div className="w-full overflow-x-hidden bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container mx-auto px-3 xs:px-4 max-w-2xl mt-6 md:mt-12 pb-12">
                
                {/* Header Section */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="main-title-gradient text-3xl xs:text-4xl md:text-5xl font-extrabold mb-3 leading-tight px-2">
                        YouTube Thumbnail Generator
                    </h1>
                    <div className="bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 md:p-4 mt-4">
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg break-words leading-relaxed">
                            Enter a YouTube video URL or ID to get high resolution thumbnail (1280×720).
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mb-8 mx-1">
                    <form onSubmit={handleFetchThumbnail}>
                        <label className="block text-xs md:text-sm font-medium mb-2 dark:text-slate-300">
                            YouTube Video URL or ID
                        </label>

                        <input
                            type="text"
                            required
                            placeholder="Paste link or ID here..."
                            value={videoUrlOrId}
                            onChange={(e) => setVideoUrlOrId(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-3 mb-4 rounded-lg border border-slate-300
                                       dark:border-slate-600 bg-white dark:bg-slate-700
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                       dark:focus:ring-blue-800 outline-none transition-all dark:text-white text-sm md:text-base"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold
                                       py-3 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base"
                        >
                            {loading ? "Fetching..." : <><ImageIcon size={18} /> <span>Get Thumbnail</span></>}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 bg-red-500/10 border-l-4 border-red-500 text-red-500 p-3 rounded flex items-center gap-2 text-xs md:text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>

                {/* Result Section */}
                {thumbnailData && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border 
                                    border-slate-200 dark:border-slate-700 shadow-lg p-4 md:p-6 mb-8 mx-1 animate-in fade-in zoom-in duration-300">
                        
                        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-3">
                            <h2 className="text-sm md:text-xl font-semibold dark:text-white">
                                High Quality (1280×720)
                            </h2>

                            <button
                                onClick={() => downloadImage(thumbnailData.thumbnailUrl)}
                                className="w-full xs:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium
                                           py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm active:scale-95"
                            >
                                <Download size={16} /> Download
                            </button>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-2 md:p-3 bg-slate-50 dark:bg-slate-900">
                            <img
                                src={thumbnailData.thumbnailUrl}
                                alt="YouTube Thumbnail"
                                className="w-full h-auto block rounded-lg shadow-sm"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/1280x720?text=Thumbnail+Not+Available';
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Thumbnails;