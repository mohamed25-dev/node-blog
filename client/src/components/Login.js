import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    props.history.push('/');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      email,
      password
    };

    try {
      const result = await axios.post('/api/auth', userData);

      localStorage.setItem('token', result.data.token);
      localStorage.setItem('_id', result.data._id);

      axios.defaults.headers.common = { 'Authorization': result.data.token };

      props.history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setError('');
  }
  
  const passwordChanged = (event) => {
    setPassword(event.target.value);
    setError('');
  }

  return (
    <div className="column column-40 column-offset-60">
      <br />
      <h3> تسجيل الدخول </h3>
      {error ? (<blockquote> {error.toString()}</blockquote>) : ''}
      <form onSubmit={onSubmit}>
        <div>
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={emailChanged} />
        </div>

        <div>
          <label>كلمة المرور</label>
          <input type="password" value={password} onChange={passwordChanged} />
        </div>

        <button>تسجيل الدخول </button>
      </form>
    </div>
  );
}

export default Login;
