import axios from "axios";

const url = "http://localhost:5000/api/posts/";

class PostService {
  static getPosts() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createAt: new Date(post.createAt),
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
