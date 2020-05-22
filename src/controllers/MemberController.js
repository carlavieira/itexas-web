export default {
  getAllMembers(api) {
    const response = api
      .get("list-members/")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  },

  getMemberById(api, id) {
    return api
      .get(`list-members/${id}/`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  createMember(api, memberDetails, date) {
    memberDetails.date_joined = date
      
    console.log(memberDetails)

    return api
      .post("manage-member/", memberDetails)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },

  editMember(api, memberDetails) {
    memberDetails.post = memberDetails.post.id
    memberDetails.department = memberDetails.department.id
    memberDetails.leader = memberDetails.leader.id
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
      .get(`list-members/?leader=${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getAllDepartments(api) {
    return api
      .get(`manage-departments/`)
      .then(res => {
        return res
      }).catch(e => {
        return e
      })
  },
  getMembersInPost(api, postID) {
    return api
      .get(`list-members/?post=${postID}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getMembersInDepartment(api, departmentID) {
    return api
      .get(`list-members/?department=${departmentID}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
