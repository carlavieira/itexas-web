export default {
  getAllMembers(api) {
    const response = api
      .get("members/")
      .then(function(response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  getMemberById(api){
    return api
      .get(`members/${localStorage.getItem("user_id")}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  createMember(api, memberDetails) {
    console.log(memberDetails);
    return api
      .post("rest-auth/registration/", memberDetails)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  },

  editMember(api, memberDetails) {
    return api
      .put(`members/${memberDetails.id}/`, memberDetails)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  },

  deleteMember(api, memberDetails) {
    return api
      .delete(`members/${memberDetails.id}/`, memberDetails)
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
  }
};
