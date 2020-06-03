export default {
  getAllMembers(api) {
    const response = api
      .get("list-members/")
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  getMemberById(api, id) {
    return api
      .get(`list-members/${id}/`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  createMember(api, memberDetails, date) {
    memberDetails.date_joined = date;

    console.log(memberDetails);

    return api
      .post("manage-member/", memberDetails)
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  },

  editMember(api, memberDetails) {
    if (memberDetails.post) memberDetails.post = memberDetails.post.id;
    if (memberDetails.department)
      memberDetails.department = memberDetails.department.id;
    if (memberDetails.leader) memberDetails.leader = memberDetails.leader.id;
    else memberDetails.leader = {};

    if (memberDetails.photo) {
      console.log("teste");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      if (typeof memberDetails.photo == "string") {
        delete memberDetails.photo;
        console.log(memberDetails);

        return api
          .put(`manage-member/${memberDetails.id}/`, memberDetails)
          .then((res) => res.data)
          .catch((e) => {
            throw e;
          });
      } else {
        formData.append("photo", memberDetails.photo);
        formData.append("email", memberDetails.email);
        formData.append("date_joined", memberDetails.date_joined);
        formData.append("photo", memberDetails.photo);
        formData.append("email", memberDetails.email);
        formData.append("date_joined", memberDetails.date_joined);
        formData.append("department", memberDetails.department);
        formData.append("first_name", memberDetails.first_name);
        formData.append("last_name", memberDetails.last_name);
        formData.append("is_active", memberDetails.is_active);
        formData.append("is_staff", memberDetails.is_staff);
        formData.append("phone", memberDetails.phone);
        formData.append("nickname", memberDetails.nickname);
        formData.append("is_superuser", memberDetails.is_superuser);
        formData.append("post", memberDetails.post);
        formData.append("slack", memberDetails.slack);
        formData.append("leader", memberDetails.leader);
      }

      /*memberDetails.photo = formData */
      return api
        .put(`manage-member/${memberDetails.id}/`, formData, config)
        .then((res) => res.data)
        .catch((e) => {
          throw e;
        });
    } else {
      return api
        .put(`manage-member/${memberDetails.id}/`, memberDetails)
        .then((res) => res.data)
        .catch((e) => {
          throw e;
        });
    }
  },
  convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      var canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  },
  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllDepartments(api) {
    return api
      .get(`manage-departments/`)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  },
  getMembersInPost(api, postID) {
    return api
      .get(`list-members/?post=${postID}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  getMembersInDepartment(api, departmentID) {
    return api
      .get(`list-members/?department=${departmentID}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
