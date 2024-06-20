// EditCollectionModal.js
import React, { useState } from 'react';

const EditCollectionModal = ({ show, onClose, onSave, defaultName }) => {
  const [collectionName, setCollectionName] = useState(defaultName);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(collectionName);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Collection Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditCollectionModal;
