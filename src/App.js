import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum.id}/photos`)
        .then(response => response.json())
        .then(data => setPhotos(data));
    }
  }, [selectedAlbum]);

  const openPopup = album => {
    setSelectedAlbum(album);
  };

  const closePopup = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="App">
      <h1>Albums</h1>
      <div className="album-grid">
        {albums.map(album => (
          <div className="album-card" key={album.id} onClick={() => openPopup(album)}>
            <h3>{album.title}</h3>
          </div>
        ))}
      </div>

      {selectedAlbum && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedAlbum.title}</h2>
            <div className="photo-grid">
              {photos.map(photo => (
                <div className="photo-card" key={photo.id}>
                  <img src={photo.url} alt={photo.title} />
                  <p>{photo.title}</p>
                </div>
              ))}
            </div>
            <div className="close" onClick={closePopup}>
              &times;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
