import { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = (props) => {
  const token = localStorage.getItem('token');
  const postId = props.match.params.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  if (!token) {
    props.history.push('/login');
  }

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const result = await axios.get(`/api/posts/${postId}`);
    setTitle(result.data.title);
    setContent(result.data.content);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      title,
      content,
    };

    try {
      await axios.put(`/api/posts/${postId}`, postData);
      props.history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  const contentChanged = (event) => {
    setContent(event.target.value);
    setError('');
  }

  const titleChanged = (event) => {
    setTitle(event.target.value);
    setError('');
  }

  if (title === null) {
    return (
      <div>
        <h3> لم يتم العثور على التدوينة</h3>
      </div>
    )
  }

  if (title === '') {
    return (
      <div>
        <h3>يتم تحميل التدوينة</h3>
      </div>
    )
  }

  return (
    <div className="column column-40 column-offset-60">
      <br />
      <h3> تعديل بيانات التدوينة</h3>
      {error ? (<blockquote> {error.toString()}</blockquote>) : ''}

      <form onSubmit={onSubmit}>
        <div>
          <label> عنوان التدوينة</label>
          <input type="text" value={title} onChange={titleChanged} />
        </div>

        <div>
          <label>نص التدوينة</label>
          <textarea onChange={contentChanged} value={content}>
          </textarea>
        </div>

        <button> تعديل </button>
      </form>
    </div>
  );
}

export default EditPost;
