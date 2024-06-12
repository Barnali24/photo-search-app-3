import React, { useState, useEffect } from 'react';
import CollectionForm from './CollectionForm';
import CollectionList from './CollectionList';
import PhotoList from './PhotoList';
import { useSelector } from 'react-redux';


const CollectionManager = ({ collections, setCollections }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  useEffect(() => {
    // Save collections to local storage whenever they change
  
      localStorage.setItem('photoCollections', JSON.stringify(collections));
    
  }, [collections]);
  
  const createCollection = (name) => {
    if (currentUser && currentUser.username) {
      const newCollection = {
        id: Date.now(),
        name,
        photos: [],
        userId: currentUser.username,
      };
      setCollections([...collections, newCollection]);
    } else {
      console.error('Unable to create collection: currentUser is undefined or has no username');
    }
  };
  
  

  const updateCollection = (id, newName) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id ? { ...collection, name: newName } : collection
    );
    setCollections(updatedCollections);
  };

  const deleteCollection = (id) => {
    const updatedCollections = collections.filter((collection) => collection.id !== id);
    setCollections(updatedCollections);
  };


  const deletePhotoFromCollection = (collectionId, photoId) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        const updatedPhotos = collection.photos.filter((photo) => photo.id !== photoId);
        return { ...collection, photos: updatedPhotos };
      }
      return collection;
    });
    setCollections(updatedCollections);
  };

  const handleSaveCollection = (name) => {
    if (selectedCollection) {
      // Update existing collection
      updateCollection(selectedCollection.id, name);
    } else {
      // Create new collection
      createCollection(name);
    }
    setSelectedCollection(null); // Clear selection
  };

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
  };

  const handleDeleteCollection = (id) => {
    deleteCollection(id);
    setSelectedCollection(null); // Clear selection if the deleted collection was selected
  };


  const handleDeletePhoto = (photoId) => {
    if (selectedCollection) {
      deletePhotoFromCollection(selectedCollection.id, photoId);
    }
  };
  const userCollections = collections.filter(
    (collection) => collection.userId === currentUser?.username
  );

  return (
    <div>
      <CollectionForm onSave={handleSaveCollection} collection={selectedCollection} />
      <CollectionList
        collections={userCollections}
        onSelect={handleSelectCollection}
        onDelete={handleDeleteCollection}
      />
      {selectedCollection && (
        <>
        yesss
          <PhotoList
            photos={selectedCollection.photos}
            onDelete={handleDeletePhoto}
          />
        </>
      )}
    </div>
  );
};

export default CollectionManager;

