<template>
  <div class="container">
    <h1>Latest Post</h1>
    <div class="create-post">
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Create a Post"
      />
      <button @click="createPost">CREATE</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="posts-container">
      <div
        v-for="(post, index) in posts"
        :index="index"
        :key="post._id"
        class="post"
      >
        <p class="text">{{ post.text }}</p>
        {{
          `${post.createAt.getDate()}/${
            post.createAt.getMonth() + 1
          }/${post.createAt.getFullYear()}`
        }}
        <button @click="deletePost(post._id)">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      // posts: async () => {
      //   await PostService.getPosts();
      // },
      posts: [],
      error: "",
      text: "",
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
  computed: {
    dateFormat() {
      return console.log(this.posts);
    },
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.create-post {
  padding: 1rem;
  display: flex;
  border: 1px solid #eee;
  background-color: #f2f2f2;
}
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .post {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    border: 1px solid #eee;
    .text {
      flex-grow: 1;
    }
  }
}
</style>
