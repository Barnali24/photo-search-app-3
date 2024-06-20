import React from 'react';
import '../../styles/PhotoList.css'

const PhotoList = ({ photos, onDelete,collectionId }) => {
  return (
    <div className="photo-list">
      {photos.map((photo, index) => (
        <div key={index} className="photo-item">
          <img src={photo.urls.small} alt={photo.description} />
          <button onClick={() => onDelete(collectionId, photo.id)}>Delete Photo</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
