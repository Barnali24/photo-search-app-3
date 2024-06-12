import React, { useState } from 'react';

const CollectionForm = ({ onSave, collection }) => {
  const [name, setName] = useState(collection ? collection.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter collection name"
        required
      />
      <button type="submit">{collection ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default CollectionForm;
