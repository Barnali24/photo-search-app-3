import React from 'react';

const PhotoList = ({ photos, onDelete }) => {
  return (
    <div>
      {photos.map((photo, index) => (
        <div key={index}>
          <img src={photo.urls.small} alt={photo.description} />
          <button onClick={() => onDelete(photo.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
