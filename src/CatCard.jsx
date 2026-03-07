import { motion, useMotionValue, useTransform } from "framer-motion";

export default function CatCard({ cat, onSwipeRight, onSwipeLeft, isTop, index }) {
  // Track the X position of the drag
  const x = useMotionValue(0);
  
  // Map the X position to a rotation angle (-15 to 15 degrees)
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Map the X position to the opacity of the Like/Nope stamps
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    // If dragged further than 100px, trigger the respective swipe action
    if (info.offset.x > 100) {
      onSwipeRight(cat);
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      // Only allow the top card to be dragged
      drag={isTop ? "x" : false}
      // Give the card a springy snap-back effect if released too early
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      // Scale down and push down the cards behind the top one
      animate={{ 
        scale: isTop ? 1 : 0.95 - (index * 0.05), 
        y: isTop ? 0 : index * 15,
        zIndex: 10 - index
      }}
      // Smoothly fly off the screen when unmounted
      exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`absolute w-80 h-96 bg-white rounded-3xl shadow-xl overflow-hidden ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* Background color acts as a skeleton loader before the image loads */}
      <div className="w-full h-full bg-gray-200">
        <img 
          src={`https://cataas.com/cat/${cat.id}`} 
          alt="A cute cat" 
          className="w-full h-full object-cover pointer-events-none" 
          draggable="false"
        />
      </div>
      
      {/* LIKE Stamp Overlay */}
      <motion.div 
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-extrabold text-4xl rounded-md px-2 py-1 transform -rotate-12 pointer-events-none"
      >
        CUTE
      </motion.div>

      {/* NOPE Stamp Overlay */}
      <motion.div 
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-extrabold text-4xl rounded-md px-2 py-1 transform rotate-12 pointer-events-none"
      >
        MEH
      </motion.div>
    </motion.div>
  );
}