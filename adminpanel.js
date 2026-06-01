import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';

function AdminPanel() {
  const [alerts, setAlerts] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    db.collection('alerts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(sn => setAlerts(sn.docs.map(d => d.data())));
    db.collection('reports')
      .orderBy('timestamp', 'desc')
      .onSnapshot(sn => setReports(sn.docs.map(d => d.data())));
  }, []);


return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Active Alerts</h3>
      <ul>
        {alerts.map((a,i) => (
          <li key={i}>{a.user} at {a.location.latitude.toFixed(3)}, {a.location.longitude.toFixed(3)}</li>
        ))}
      </ul>
      <h3>Reports</h3>
      <ul>
        {reports.map((r,i) => (
          <li key={i}>{r.user}: {r.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;