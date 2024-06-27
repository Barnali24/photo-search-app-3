import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import PhotoItem from "./PhotoItem";
import { useSearchParams } from "react-router-dom";
import { API_ENDPOINT } from "../../constants/app.constants";
import useFetch from "../../hooks/useFetch";

const PhotoSearch = ({ collections, onAddToCollection }) => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId"); // Retrieve the collection ID from URL

  const fetchParams = useMemo(() => ({ query }), [query]);

  const { data, loading, error } = useFetch(
    query ? API_ENDPOINT : null, // Only fetch when there is a query
    fetchParams,
    {} 
  );

  // Update photos state when data is fetched
  useEffect(() => {
    if (data && data.results) {
      setPhotos(data.results);
    }
  }, [data]);
  const handleSearch = async (e) => {
    e.preventDefault();
  };

  const handleAddPhotoToCollection = (photo) => {
    console.log("Adding photo to collection:", photo, collectionId);
    onAddToCollection(photo, collectionId);
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoItem
            key={photo.id}
            photo={photo}
            collections={collections}
            onAddToCollection={
              collectionId ? () => handleAddPhotoToCollection(photo) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoSearch;
