import {Link} from 'react-router-dom';

export default function HomePage() {
    return (
    <div style={{ padding: '20px' }}>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      {/* Link to the About page */}
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}