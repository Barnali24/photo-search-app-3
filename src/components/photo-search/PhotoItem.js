import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PhotoItem = ({ photo, collections, onAddToCollection }) => {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the photo is already in the collection when the component mounts or when collections change
    const collection = collections.find((c) => String(c.id) === collectionId);
    if (collection && collection.photos.some((p) => p.id === photo.id)) {
      setIsAdded(true); // Disable the button if the photo is already in the collection
    }
  }, [collections, photo, collectionId]);

  const handleAddToCollectionClick = () => {
    if (onAddToCollection) {
      onAddToCollection(photo, collectionId);
      alert("Photo added to the collection successfully");
      setIsAdded(true); // Set the flag to true after adding the photo
    }
  };

  return (
    <div className="photo-item">
      <img src={photo.urls.small} alt={photo.description} />
      <div className="photo-details">
        <p>By: {photo.user.name}</p>
        <button
          onClick={handleAddToCollectionClick}
          disabled={isAdded}
          className={isAdded ? "button-disabled" : ""}
        >
          {isAdded ? "Added" : "Add to Collection"}
        </button>
      </div>
    </div>
  );
};

export default PhotoItem;
