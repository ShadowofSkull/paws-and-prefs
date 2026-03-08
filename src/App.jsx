import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CatCard from "./CatCard";

export default function App() {
  const [cats, setCats] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    fetch("https://cataas.com/api/cats")
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
        data.forEach((cat, i) => {
          fetch(`https://cataas.com/cat/${cat.id}`)
            .then((res) => res.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              setImageUrls((prev) => ({ ...prev, [cat.id]: url }));
              if (i === 0) setLoading(false);
            })
            .catch((err) => console.error("Failed to fetch image:", err));
        });
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
      <div className="cat-bg flex flex-col items-center justify-center gap-4 h-screen bg-[#FAF6F1]">
        <span
          style={{ animation: "paw-bob 1s ease-in-out infinite" }}
          className="text-6xl select-none"
        >
          🐾
        </span>
        <p className="text-[#A0856C] font-semibold tracking-wide text-sm">Finding kitties…</p>
      </div>
    );
  }

  const isFinished = currentIndex >= cats.length;

  if (showIntro) {
    return (
      <div className="cat-bg flex flex-col items-center justify-center gap-8 h-screen bg-[#FAF6F1] px-8">
        <div className="text-center">
          <p className="text-4xl mb-3">🐱</p>
          <h1 className="text-2xl font-extrabold text-[#7C5C4A] mb-1">Paws & Preferences</h1>
          <p className="text-[#A0856C] text-sm">Rate some kitties!</p>
        </div>

        <div className="flex items-center justify-center gap-6 w-full max-w-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-[#FDECEA] border-2 border-[#E8442A] flex items-center justify-center text-2xl">
              ←
            </div>
            <span className="text-xs font-semibold text-[#E8442A] tracking-wide">DISLIKE</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-[#C4A882]">
            <span className="text-3xl">🐾</span>
            <span className="text-xs">swipe</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF7EC] border-2 border-[#2DB34A] flex items-center justify-center text-2xl">
              →
            </div>
            <span className="text-xs font-semibold text-[#2DB34A] tracking-wide">LIKE</span>
          </div>
        </div>

        <button
          onClick={() => setShowIntro(false)}
          className="px-10 py-3 bg-[#8B6145] text-white font-bold rounded-full shadow-lg hover:bg-[#7A5038] active:scale-95 transition-all"
        >
          Let's go! 🐾
        </button>
      </div>
    );
  }

  return (
    <div className="cat-bg flex flex-col items-center h-dvh bg-[#FAF6F1] overflow-hidden relative touch-none">
      <header className="w-full p-6 text-center shadow-sm bg-white z-20">
        <h1 className="text-2xl font-extrabold text-[#7C5C4A]">Paws & Preferences</h1>
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
                  imageUrl={imageUrls[cat.id]}
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
          <h2 className="text-3xl font-bold text-[#5C3D2B] mb-2">Match Summary</h2>
          <p className="text-[#A0856C] mb-6">You liked {likedCats.length} cats!</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {likedCats.map((cat) => (
              <img 
                key={cat.id} 
                src={imageUrls[cat.id]} 
                alt="Liked cat" 
                className="w-full h-40 object-cover rounded-xl shadow-md border-2 border-white bg-[#E8DDD4]"
              />
            ))}
          </div>

          <button 
            onClick={() => window.location.reload()} 
            className="mt-10 px-8 py-3 bg-[#8B6145] text-white font-bold rounded-full shadow-lg hover:bg-[#7A5038] active:scale-95 transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}