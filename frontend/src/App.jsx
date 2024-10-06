import  { useState, useEffect } from 'react';
import LivestreamPlayer from './components/LivestreamPlayer';
import OverlayManager from './components/OverlayManager';
import { getOverlays } from './api';
import Footer from './components/Footer';
import OverlayTable from './components/OverlayTable';
function App() {
  const [overlays, setOverlays] = useState([]);
  const [videoUrl, setVideoUrl] = useState('http://localhost:5000/hls/stream.m3u8')

  const fetchOverlays = async () => {
    const data = await getOverlays();
    setOverlays(data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-10 text-black">LiveSitter Assignment</h1>
      <div className='flex lg:flex-row flex-col w-full mb-10 justify-center'>

      <LivestreamPlayer overlays={overlays} videoUrl = {videoUrl}  />
      <OverlayManager fetchOverlays={fetchOverlays} />
      </div>


      <OverlayTable/>
    <Footer/>
    </div>
  );
}

export default App;
