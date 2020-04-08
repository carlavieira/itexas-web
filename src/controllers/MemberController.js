export default {
  getAllMembers(api) {
    const response = api
      .get("members/")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  },

  createMember(api, memberDetails) {
    const response = api
      .post("rest-auth/registration/", memberDetails)
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return response;
  },
};
