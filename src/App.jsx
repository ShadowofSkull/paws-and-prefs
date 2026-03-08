import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CatCard from "./CatCard";

export default function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the default 10 cats
    fetch("https://cataas.com/api/cats")
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch cats:", err));
  }, []);

  const handleSwipeRight = (cat) => {
    setLikedCats((prev) => [...prev, cat]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-pink-50 text-xl font-bold text-pink-400">
        Loading kitties...
      </div>
    );
  }

  const isFinished = currentIndex >= cats.length;

  return (
    <div className="flex flex-col items-center h-dvh bg-pink-50 overflow-hidden relative touch-none">
      <header className="w-full p-6 text-center shadow-sm bg-white z-20">
        <h1 className="text-2xl font-extrabold text-pink-500">Paws & Preferences</h1>
      </header>

      {!isFinished ? (
        <div className="flex-1 relative w-full flex items-center justify-center">
          <AnimatePresence>
            {cats.slice(currentIndex, currentIndex + 3).reverse().map((cat, visualIndex) => {
              const actualIndex = currentIndex + (cats.slice(currentIndex, currentIndex + 3).length - 1 - visualIndex);
              const isTop = actualIndex === currentIndex;
              
              return (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  isTop={isTop}
                  index={cats.slice(currentIndex, currentIndex + 3).length - 1 - visualIndex}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                />
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center flex-1 min-h-0 overflow-y-auto w-full max-w-md p-6 pb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Match Summary</h2>
          <p className="text-gray-500 mb-6">You liked {likedCats.length} cats!</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {likedCats.map((cat) => (
              <img 
                key={cat.id} 
                src={`https://cataas.com/cat/${cat.id}`} 
                alt="Liked cat" 
                className="w-full h-40 object-cover rounded-xl shadow-md border-2 border-white bg-gray-200"
              />
            ))}
          </div>

          <button 
            onClick={() => window.location.reload()} 
            className="mt-10 px-8 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 active:scale-95 transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}