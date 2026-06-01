import React, { useState } from 'react';
import { db } from '../firebaseConfig';

function ReportForm({ user }) {
  const [desc, setDesc] = useState('');

  const submitReport = e => {
    e.preventDefault();
    if (!desc) return;
    db.collection('reports').add({
      user: user.email,
      description: desc,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setDesc('');
    alert('Incident reported');
  };

return (
    <div>
      <h3>Report Incident</h3>
      <form onSubmit={submitReport}>
        <textarea value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Describe the incident..."></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportForm;

