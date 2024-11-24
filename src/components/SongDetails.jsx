import React from 'react';
    import CreatorList from './CreatorList';

    const SongDetails = ({ song }) => {
      return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold mb-2">Story</h2>
          <p className="text-gray-700 mb-4">{song.story}</p>
          <h3 className="font-semibold mb-2">Creators</h3>
          <CreatorList creators={song.creators} />
        </div>
      );
    };

    export default SongDetails;
