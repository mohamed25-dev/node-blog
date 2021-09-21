import { useState } from 'react';
import axios from 'axios';

const CreatePost = (props) => {
  const token = localStorage.getItem('token');
  if (!token) {
    props.history.push('/login');
  }

  const [post, setPost] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      title,
      content: post,
    };

    try {
      await axios.post('/api/posts', postData);
      props.history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  const postChanged = (event) => {
    setPost(event.target.value);
    setError('');
  }

  const titleChanged = (event) => {
    setTitle(event.target.value);
    setError('');
  }

  return (
    <div className="column column-40 column-offset-60">
      <br />
      <h3> إضافة تدوينة</h3>
      {error ? (<blockquote> {error.toString()}</blockquote>) : ''}

      <form onSubmit={onSubmit}>
        <div>
          <label> عنوان التدوينة</label>
          <input type="text" value={title} onChange={titleChanged} />
        </div>

        <div>
          <label>نص التدوينة</label>
          <textarea onChange={postChanged} value={post}>
          </textarea>
        </div>

        <button> إضافة </button>
      </form>
    </div>
  );
}

export default CreatePost;
