export default {
  getAllMembers(api) {
    const response = api
      .get("list-members/")
      .then(function(response) {
        console.log(response.data)
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  getMemberById(api, id) {
    return api
      .get(`list-members//${id}`)
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
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },

  editMember(api, memberDetails) {
    return api
      .put(`manage-member/${memberDetails.id}/`, memberDetails)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },

  deleteMember(api, memberDetails) {
    return api
      .delete(`manage-member/${memberDetails.id}/`, memberDetails)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },
  getAllLiderandos(api, id) {
    return api
      .get(`members/?leader=${id}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
