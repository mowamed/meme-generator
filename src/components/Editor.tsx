import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';

interface EditorProps {
  selectedImage: string | null;
}

const Editor: React.FC<EditorProps> = ({ selectedImage }) => {
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [topTextColor, setTopTextColor] = useState('#ffffff');
  const [bottomTextColor, setBottomTextColor] = useState('#ffffff');
  const [topTextRotation, setTopTextRotation] = useState(0);
  const [bottomTextRotation, setBottomTextRotation] = useState(0);
  const [topTextFontSize, setTopTextFontSize] = useState(32);
  const [bottomTextFontSize, setBottomTextFontSize] = useState(32);
  const memeRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImage) {
      setTopText('Top Text');
      setBottomText('Bottom Text');
    }
  }, [selectedImage]);

  const handleDownload = () => {
    if (memeRef.current) {
      html2canvas(memeRef.current, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div>
      <h2>Editor</h2>
      {selectedImage && (
        <div ref={memeRef} style={{ position: 'relative', width: '500px' }}>
          <img src={selectedImage} alt="Selected Meme" className="meme-image" crossOrigin="anonymous" />
          <Draggable nodeRef={topTextRef}>
            <div ref={topTextRef} className="meme-text top-text-position">
              <div
                style={{
                  color: topTextColor,
                  transform: `rotate(${topTextRotation}deg)`,
                  fontSize: `${topTextFontSize}px`,
                }}
              >
                {topText}
              </div>
            </div>
          </Draggable>
          <Draggable nodeRef={bottomTextRef}>
            <div ref={bottomTextRef} className="meme-text bottom-text-position">
              <div
                style={{
                  color: bottomTextColor,
                  transform: `rotate(${bottomTextRotation}deg)`,
                  fontSize: `${bottomTextFontSize}px`,
                }}
              >
                {bottomText}
              </div>
            </div>
          </Draggable>
        </div>
      )}
      <div>
        <h3>Top Text</h3>
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="color"
          value={topTextColor}
          onChange={(e) => setTopTextColor(e.target.value)}
        />
        <label>Rotate</label>
        <input
          type="range"
          min="-45"
          max="45"
          value={topTextRotation}
          onChange={(e) => setTopTextRotation(parseInt(e.target.value))}
        />
        <label>Font Size</label>
        <input
          type="range"
          min="16"
          max="64"
          value={topTextFontSize}
          onChange={(e) => setTopTextFontSize(parseInt(e.target.value))}
        />
      </div>
      <div>
        <h3>Bottom Text</h3>
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <input
          type="color"
          value={bottomTextColor}
          onChange={(e) => setBottomTextColor(e.target.value)}
        />
        <label>Rotate</label>
        <input
          type="range"
          min="-45"
          max="45"
          value={bottomTextRotation}
          onChange={(e) => setBottomTextRotation(parseInt(e.target.value))}
        />
        <label>Font Size</label>
        <input
          type="range"
          min="16"
          max="64"
          value={bottomTextFontSize}
          onChange={(e) => setBottomTextFontSize(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleDownload}>Download Meme</button>
    </div>
  );
};

export default Editor;
