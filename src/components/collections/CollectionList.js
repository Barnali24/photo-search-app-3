import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionList = ({ collections, onSelect, onDelete }) => {
    const navigate = useNavigate();

  const handleAddPhotoClick = (collectionId) => {
    navigate(`/photo-search?collectionId=${collectionId}`);
  };
  return (
    <ul>
      {collections.map((collection) => (
        <li key={collection.id}>
          <span onClick={() => onSelect(collection)}>{collection.name}</span>
          <button onClick={() => onDelete(collection.id)}>Delete</button>
          <button onClick={() => handleAddPhotoClick(collection.id)}>Add a Photo</button>
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
