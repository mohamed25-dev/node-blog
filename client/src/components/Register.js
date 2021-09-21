import { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    props.history.push('/');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      name,
      email,
      password
    };

    try {
      const result = await axios.post('/api/register', userData);
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('_id', result.data._id);

      axios.defaults.headers.common = {'Authorization': result.data.token};
      props.history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="column column-40 column-offset-60">
      <br />
      <h3> إنشاء حساب جديد </h3>
      {error ? (<blockquote> {error.toString()}</blockquote>) : ''}
      <form onSubmit={onSubmit}>
        <div>
          <label>الاسم</label>
          <input type="text" value={name} onChange={(event) => {
            setName(event.target.value);
            setError('');
          }} />
        </div>

        <div>
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={(event) => {
            setEmail(event.target.value);
            setError('');
          }} />
        </div>

        <div>
          <label>كلمة المرور</label>
          <input type="password" value={password} onChange={(event) => {
            setPassword(event.target.value);
            setError('');

          }} />
        </div>

        <button>تسجيل</button>
      </form>
    </div>
  );
}

export default Register;
