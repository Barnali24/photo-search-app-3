import React, { useState, useEffect } from "react";
import CollectionForm from "./CollectionForm";
import CollectionList from "./CollectionList";
import PhotoList from "./PhotoList";
import { useSelector } from "react-redux";
import EditCollectionModal from "./EditCollectionModal";

const CollectionManager = ({ collections, setCollections }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);


  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
  };

  const handleModalSave = (newName) => {
    if (editingCollection) {
      updateCollection(editingCollection.id, newName);
    }
    handleModalClose();
  };

  const createCollection = async (name) => {
    if (currentUser && currentUser.username) {
      const newCollection = {
        id: Date.now().toString(),
        name,
        photos: [],
        userId: currentUser.username,
      };
      try {
        const response = await fetch("http://localhost:3000/collections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCollection),
        });
        const createdCollection = await response.json();
        setCollections([...collections, createdCollection]);
      } catch (error) {
        console.error("Unable to create collection:", error);
      }
    }
  };

  const updateCollection = async (id, newName) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id ? { ...collection, name: newName } : collection
    );
    setCollections(updatedCollections);

    // Update the collection on the server
    try {
      const response = await fetch(`http://localhost:3000/collections/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Unable to update collection:", error);
    }
  };

  const deleteCollection = async (id) => {
    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(updatedCollections);

    // Delete the collection on the server
    try {
      const response = await fetch(`http://localhost:3000/collections/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Unable to delete collection:", error);
    }
  };

  const deletePhotoFromCollection = (collectionId, photoId) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        const updatedPhotos = collection.photos.filter(
          (photo) => photo.id !== photoId
        );
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

  const handleDeleteCollection = (id) => {
    deleteCollection(id);
    setSelectedCollection(null); // Clear selection if the deleted collection was selected
  };

  const handleDeletePhoto = (collectionId, photoId) => {
    deletePhotoFromCollection(collectionId, photoId);
  };

  const userCollections =
    currentUser?.role === "Admin"
      ? collections
      : collections.filter(
          (collection) => collection.userId === currentUser?.username
        );

  return (
    <div>
      <CollectionForm onSave={handleSaveCollection} />
      {userCollections.map((collection) => (
        <div key={collection.id}>
          <CollectionList
            collection={collection}
            onDelete={handleDeleteCollection}
            onEdit={handleEditCollection}
          />
          <PhotoList
            photos={collection.photos}
            onDelete={handleDeletePhoto}
            collectionId={collection.id}
          />
        </div>
      ))}
      <EditCollectionModal
        show={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        defaultName={editingCollection?.name}
      />
    </div>
  );
};

export default CollectionManager;
