import postController from "../controllers/PostController"
import memberController from "../controllers/MemberController"

export default {
    
  async getAll(api){
    await postController.getPosts(api)
    .then((res) => {
      const posts = res.data;
      const leaders = {};
      const leadersArray = [];

      posts.map(async (post) => {
        await memberController.getMembersInPost(api, post.id)
          .then((members) => {
            members.map((member) => {
              leaders[member.leader.id] = member.leader;
            })
            for (var idLeader in leaders){
              leadersArray.push(leaders[idLeader])
            } 

          })
      });
      console.log(leadersArray)
      return leadersArray
    })
    .catch((err) => {
      console.log(err);
    });
  }
}