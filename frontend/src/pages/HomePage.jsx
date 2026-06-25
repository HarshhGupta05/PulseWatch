import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ padding: '20px', display: 'grid', gap: '16px' }}>
      <h1>PulseWatch</h1>
      <p>Monitor your APIs and get an email when one goes down.</p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}
