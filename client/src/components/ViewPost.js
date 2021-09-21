import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewPost = (props) => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const postId = props.match.params.id;

  const fetchPost = async () => {
    const result = await axios.get(`/api/posts/${postId}`);
    setPost(result.data);
  }

  const deletPost = async () => {
    await axios.delete(`/api/posts/${postId}`);
    props.history.push('/');
  }

  const postComment = async (event) => {
    event.preventDefault();
    const result = await axios.post(`/api/comments/${postId}`, { content: comment });
    setComments([...comments, result.data]);
    setComment('');
  }

  const commentChanged = (event) => {
    setComment(event.target.value);
  }

  const renderActions = () => {
    const userId = localStorage.getItem('_id');
    if (userId && userId === post.author._id) {
      return (
        <span>
          <Link to={`/post/edit/${postId}`}>
            <button>تعديل</button>
          </Link>
          <button onClick={deletPost}>حذف</button>
        </span>
      );
    }
  }

  const renderComments = () => {
    let comments = <p>لا يوجد تعليقات</p>;
    if (post.comments.length > 0) {
      comments = post.comments.map(comment => {
        return (
          <p key={comment._id}>
            {comment.content}
          </p>
        )
      });
    }

    return comments;
  }

  const renderCommentForm = () => {
    if (localStorage.getItem('token')) {
      return (
        <div>
          <h4>إضافة تعليق</h4>
          <form onSubmit={postComment}>
            <textarea onChange={commentChanged} value={comment}></textarea>
            <button>إرسال</button>
          </form>
        </div>
      )
    }
  }

  useEffect(() => {
    fetchPost();
  }, [comments]);

  if (post === null) {
    return (
      <div>
        <h3>يتم تحميل التدوينة</h3>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="column">
        <h3>{post.title}</h3>
        <h5>{post.author.name}</h5>
        <p>{post.content}</p>
        {renderActions()}

        <hr />

        <h4>التعليقات</h4>

        {renderComments()}
        {renderCommentForm()}

      </div>
    </div>
  );
}

export default ViewPost;
