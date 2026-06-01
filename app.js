import React from 'react';
import { db } from '../firebaseConfig';

function SOSButton() {
  const sendSOS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      // Save alert to Firestore
      db.collection('alerts').add({
        user: auth.currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        location: new firebase.firestore.GeoPoint(latitude, longitude),
        resolved: false
      });
      alert('SOS sent! Help is on the way.');
    }, err => {
      console.error(err);
      alert('Location access denied');
    });
  };

return (
    <button onClick={sendSOS} style={{fontSize:'24px',color:'red'}}>
      🚨 SOS
    </button>
  );
}

export default SOSButton;