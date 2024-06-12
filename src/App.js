import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { logoutUser } from './redux/actions';
import PhotoSearch from './components/photo-search/PhotoSearch';
import Header from './components/Header';
import CollectionManager from './components/collections/CollectionManager';
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const storedCollections = JSON.parse(localStorage.getItem('photoCollections')) || [];
    console.log('Loaded collections from local storage:', storedCollections);
    setCollections(storedCollections);
  }, []);
  
  useEffect(() => {
    
      localStorage.setItem('photoCollections', JSON.stringify(collections));
  }, [collections]);
  
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logoutUser action
  };


  const handleAddToCollection = (photo, collectionId) => {
    console.log('Adding photo to collection:', photo, collectionId);
    setCollections((prevCollections) => {
      console.log('Current state of collections:', prevCollections);
      const updatedCollections = prevCollections.map((collection) => {
        console.log('Checking collection:', collection, collection.userId, currentUser.username);
        // Ensure both IDs are of the same type for comparison
        const check1 = String(collection.id);
        const check2 = String(collectionId);
        console.log(check1, check2);
        if (check1 === check2 && collection.userId === currentUser.username) {
          console.log("inside");
          const photoExists = collection.photos.some((p) => p.id === photo.id);
          if (!photoExists) {
            console.log('Photo does not exist, adding to collection');
            return { ...collection, photos: [...collection.photos, photo] };
          } else {
            console.log('Photo already exists in collection');
          }
        }
        return collection;
      });
      console.log('Updated collections before setting state:', updatedCollections);
      return updatedCollections;
    });
  };
  
  
  

  return (
    <Router>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<><Login />
          <p className='link'>
Don't have an account? <Link to="/signup">Sign up</Link>
</p></>} />
        <Route path="/signup" element={
          <>
          <Signup />
        <p className='link'>
        Already have an account? <Link to="/">Login</Link>
        </p>
        </>
      } />
        <Route path="/photo-search" element={
          currentUser ? (
            <PhotoSearch
              collections={collections}
              onAddToCollection={handleAddToCollection}
            />
          ) : (
            <Navigate replace to="/" /> //Navigate component for redirection
          )
        } />
        <Route path="/collections" element={
          currentUser ? (
            <CollectionManager
              collections={collections}
              setCollections={setCollections}
            />
          ) : (
            <Navigate replace to="/" /> //Navigate component for redirection
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;