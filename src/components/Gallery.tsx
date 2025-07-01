import React, { useState, useEffect } from 'react';

interface Meme {
  id: string;
  name: string;
  url: string;
}

interface GalleryProps {
  onImageSelect: (url: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onImageSelect }) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [allMemes, setAllMemes] = useState<Meme[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleMemes, setVisibleMemes] = useState(10);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        setAllMemes(data.data.memes);
        setMemes(data.data.memes.slice(0, visibleMemes));
      });
  }, [visibleMemes]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filteredMemes = allMemes.filter(meme =>
      meme.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setMemes(filteredMemes.slice(0, visibleMemes));
  };

  const loadMoreMemes = () => {
    setVisibleMemes(prevVisibleMemes => prevVisibleMemes + 10);
  };

  return (
    <div>
      <h2>Gallery</h2>
      <input
        type="text"
        placeholder="Search for a meme"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="gallery">
        {memes.map(meme => (
          <img
            key={meme.id}
            src={meme.url}
            alt={meme.name}
            onClick={() => onImageSelect(meme.url)}
            style={{ width: '100px', margin: '5px', cursor: 'pointer' }}
          />
        ))}
      </div>
      <button onClick={loadMoreMemes}>Load More</button>
    </div>
  );
};

export default Gallery;
