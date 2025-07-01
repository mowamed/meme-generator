import { useState } from 'react';
import Gallery from './components/Gallery';
import Editor from './components/Editor';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Generator</h1>
      </header>
      <main className="App-main">
        <div className="gallery-container">
          <Gallery onImageSelect={handleImageSelect} />
          <div className="upload-container">
            <h2>Or Upload Your Own</h2>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
        </div>
        <div className="editor-container">
          <Editor selectedImage={selectedImage} />
        </div>
      </main>
    </div>
  );
}

export default App;

