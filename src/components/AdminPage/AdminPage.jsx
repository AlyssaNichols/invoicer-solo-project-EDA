import { Link } from 'react-router-dom';
export default function AdminPage(){

    return(<>
          <Link className="navLink" to="/user">
              Home
            </Link>
            <Link className="navLink" to="/admin/services">
              Services List
            </Link>
            <Link className="navLink" to="/admin/customers">
              Customer List
            </Link>
            <Link className="navLink" to="/admin/employees">
              Employee List
            </Link>
    </>)
}