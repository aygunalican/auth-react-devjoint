import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <span className="brand">Sweet Recipes</span>
      {user && (
        <div className="navbar-right">
          <span>Hi, {user.username}</span>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </nav>
  );
}