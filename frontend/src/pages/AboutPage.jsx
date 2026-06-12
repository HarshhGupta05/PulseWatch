// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      {/* Link back to the Home page */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}