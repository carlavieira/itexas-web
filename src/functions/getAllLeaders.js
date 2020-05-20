import postController from "../controllers/PostController"
import memberController from "../controllers/MemberController"

export default {
    
  async getAll(api){
    await postController.getPosts(api)
    .then((res) => {
      const posts = res.data
      const membersInPost = []

      posts.map(async (post) => {
        const members = await memberController.getMembersInPost(api, post.id)
        members.map((member) => {
          membersInPost.push(member)
        })
      });

      console.log(membersInPost)

      return res.data
    })
    .catch((err) => {
      console.log(err);
    });
  }
}