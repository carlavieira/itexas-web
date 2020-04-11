export default {
  getAllMembers(api) {
    const response = api
      .get("members/")
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  createMember(api, memberDetails) {
    console.log(memberDetails);
    return api
      .post("rest-auth/registration/", memberDetails)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  }
};
