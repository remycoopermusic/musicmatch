import React, { useEffect } from 'react';
    import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
    import { useDrag } from 'react-use-gesture';
    import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';
    import AudioPlayer from './AudioPlayer';

    const SwipeableCard = ({ song, onSwipe, active }) => {
      const controls = useAnimation();
      const x = useMotionValue(0);
      const rotate = useTransform(x, [-200, 200], [-30, 30]);
      const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

      useEffect(() => {
        if (!active) {
          controls.start({ scale: 0.95, opacity: 0.5 });
        } else {
          controls.start({ scale: 1, opacity: 1 });
        }
      }, [active, controls]);

      const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2;
        const swipe = trigger ? (xDir < 0 ? -200 : 200) : 0;
        
        if (!down && trigger) {
          onSwipe(xDir > 0 ? 'right' : 'left');
        }
        
        x.set(down ? mx : swipe);
      }, {
        enabled: active
      });

      return (
        <motion.div
          {...bind()}
          style={{
            x,
            rotate,
            opacity,
            cursor: active ? 'grab' : 'default'
          }}
          animate={controls}
          className="absolute w-full"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <img 
                src={song.artworkUrl} 
                alt={song.title} 
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-2xl font-bold text-white mb-1">{song.title}</h2>
                <p className="text-sm text-gray-200">{song.description}</p>
              </div>
            </div>
            
            <div className="p-4">
              {active && <AudioPlayer song={song} />}
              
              <div className="flex justify-center space-x-6 mt-4">
                <button 
                  className="p-4 rounded-full bg-red-100 hover:bg-red-200 transition-colors disabled:opacity-50"
                  onClick={() => active && onSwipe('left')}
                  disabled={!active}
                >
                  <XMarkIcon className="w-8 h-8 text-red-500" />
                </button>
                <button 
                  className="p-4 rounded-full bg-green-100 hover:bg-green-200 transition-colors disabled:opacity-50"
                  onClick={() => active && onSwipe('right')}
                  disabled={!active}
                >
                  <HeartIcon className="w-8 h-8 text-green-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    };

    export default SwipeableCard;
