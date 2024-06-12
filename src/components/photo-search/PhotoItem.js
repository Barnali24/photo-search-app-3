import React from 'react';

const PhotoItem = ({ photo, onAddToCollection }) => {
  return (
    <div className="photo-item">
      <img src={photo.urls.small} alt={photo.description} />
      <div className="photo-details">
        <p>By: {photo.user.name}</p>
        {onAddToCollection && (
          <button onClick={onAddToCollection}>Add to Collection</button>
        )}
      </div>
    </div>
  );
};

export default PhotoItem;
