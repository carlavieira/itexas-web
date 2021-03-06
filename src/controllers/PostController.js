let url = "manage-posts/";

export default {
  getPosts(api) {
    return api
      .get(url)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e;
      });
  },

  createPost(api, data) {
    return api
      .post(url, data)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e;
      });
  },

  editPost(api, data) {
    return api
      .put(url + `${data.id}/`, data)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },

  deletePost(api, idPost) {
    console.log(idPost);
    return api
      .delete(url + `${idPost}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
};
