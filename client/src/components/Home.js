import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    const result = await axios.get('/api/posts');
    setPosts(result.data);
  }

  useEffect(async () => {
    fetchPosts();
  }, []);

  if (posts === null) {
    return (
      <div>
        <h1> الرئيسية </h1>
        <h3>يتم تحميل التدوينات</h3>
      </div>
    )
  } else if (posts.length === 0) {
    <h3>لا يوجد توينات لعرضها</h3>
  }
  return (
    <div>
      <h1> الرئيسية </h1>
      {
        posts.map(post => {
          return (
            <div className="row">
              <div className="column">
                <h3>{post.title}</h3>
                <h5>{post.author.name}</h5>
                <p>{post.content.substr(0, 150)}</p>
                <Link to={`post/view/${post._id}`}>
                  <button className="button-primary button-outline">
                    إقرأ المزيد
                  </button>
                </Link>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Home;
