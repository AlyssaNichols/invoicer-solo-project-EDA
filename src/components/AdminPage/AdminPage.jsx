import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <nav className="adminNav">
      <div className="adminNavLinks">
        <Link to="/user">Home</Link>
        <Link to="/admin/services">Services List</Link>
        <Link to="/admin/customers">Customer List</Link>
        <Link to="/admin/employees">Employee List</Link>
      </div>
    </nav>
  );
}
