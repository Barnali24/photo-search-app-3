import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CollectionList = ({ collection, onSelect, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);

  const handleAddPhotoClick = (collectionId) => {
    navigate(`/photo-search?collectionId=${collectionId}`);
  };
  return (
    <ul>
      <li key={collection.id}>
        <span onClick={() => onSelect(collection)}>{collection.name}</span>
        {currentUser && currentUser.role !== "Viewer" && (
          <>
            <button onClick={() => onEdit(collection)}>Edit</button>
            <button onClick={() => onDelete(collection.id)}>Delete</button>
          </>
        )}
        <button onClick={() => handleAddPhotoClick(collection.id)}>
          Add a Photo
        </button>
      </li>
    </ul>
  );
};

export default CollectionList;
