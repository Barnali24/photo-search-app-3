import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { logoutUser } from "./redux/actions";
import PhotoSearch from "./components/photo-search/PhotoSearch";
import Header from "./components/Header";
import CollectionManager from "./components/collections/CollectionManager";
import "./App.css";
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [collections, setCollections] = useState([]);
  const [key, setKey] = useState(0); // A key to force remount the PhotoSearch component

  const handleReset = () => {
    // Perform any additional state cleanup if necessary
    setKey((prevKey) => prevKey + 1); // Increment key to remount the component
  };

  useEffect(() => {
    // Fetch collections from JSON Server
    fetch("http://localhost:3000/collections")
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((error) => console.error("Error fetching collections:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("photoCollections", JSON.stringify(collections));
  }, [collections]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logoutUser action
  };

  const handleAddToCollection = (photo, collectionId) => {
    console.log("Attempting to add photo:", photo);
    console.log("Target collection ID:", collectionId);

    const collection = collections.find(
      (c) => String(c.id) === String(collectionId)
    );
    if (!collection) {
      console.error("Collection not found:", collectionId);
      return;
    }

    if (collection.photos.some((p) => p.id === photo.id)) {
      console.log("Photo already exists in collection:", photo.id);
      return;
    }

    if (
      collection.userId !== currentUser.username &&
      currentUser.role !== "Admin"
    ) {
      console.error(
        "User does not have permission to add photo to collection:",
        currentUser
      );
      return;
    }

    const updatedPhotos = [...collection.photos, photo];
    const updatedCollection = { ...collection, photos: updatedPhotos };

    console.log("Updated collection:", updatedCollection);

    fetch(`http://localhost:3000/collections/${collectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCollection),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            console.error(`Collection with ID ${collectionId} not found.`);
          } else {
            console.error(
              `Error updating collection (status: ${response.status})`
            );
          }
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          );
        }
        return response.json();
      })
      .then((updatedCollection) => {
        setCollections(
          collections.map((c) =>
            c.id === collectionId ? updatedCollection : c
          )
        );
        console.log("Photo added successfully:", updatedCollection);
      })
      .catch((error) => {
        console.error("Error updating collection:", error);
      });
  };

  return (
    <Router>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
              <p className="link">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
              <p className="link">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </>
          }
        />
        <Route
          path="/photo-search"
          element={
            currentUser ? (
              <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={handleReset}
              resetKeys={[key]} // Pass key as resetKey to remount the component on reset
            >
              <PhotoSearch
                collections={collections}
                onAddToCollection={handleAddToCollection}
                key={key}
              />
              </ErrorBoundary>
            ) : (
              <Navigate replace to="/" /> //Navigate component for redirection
            )
          }
        />
        <Route
          path="/collections"
          element={
            currentUser ? (
              <CollectionManager
                collections={collections}
                setCollections={setCollections}
              />
            ) : (
              <Navigate replace to="/" /> //Navigate component for redirection
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
