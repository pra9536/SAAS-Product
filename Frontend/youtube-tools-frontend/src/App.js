import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Thumbnails from './pages/Thumbnails';
import VideoDetailsPage from './pages/VideoDetailsPage';

function App() {
  return (
    <Router>
      {/* 1. w-full aur max-w-full ensure karte hain ki width screen se badi na ho.
        2. overflow-x-hidden kisi bhi horizontal shake ko block kar deta hai.
      */}
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 w-full max-w-full overflow-x-hidden">
        
        <Navbar />
        
        {/* Main tag mein 'w-full' zaroori hai */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thumbnail" element={<Thumbnails />} />
            <Route path="/video-details" element={<VideoDetailsPage />} />
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;