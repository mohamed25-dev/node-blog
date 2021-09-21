import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    
    axios.defaults.headers.common = {'Authorization': ''};
    props.history.push('/');
  }

  const token = localStorage.getItem('token');
  if (token) {
    return (
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">الرئيسية</Link>
          </li>
          <li>
            <Link to="/createPost">إضافة تدوينة</Link>
          </li>
          <li>
            <a href="/logout" onClick={logout}>تسجيل خروج</a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">الرئيسية</Link>
        </li>
        <li>
          <Link to="/login">تسجيل الدخول</Link>
        </li>
        <li>
          <Link to="/register">التسجيل</Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header);