const url = "list-membership-criteria/";

export default {
    listMembershipCriteria(api) {
        const response = api
        .get(url)
        .then(function(response) {
        console.log(response);
        return response;
        })
        .catch(function(error) {
        console.log(error);
        });
        return response;
    },
    getMyMembershipCriteria(api, MemberId) {
        const response = api
          .get(`list-membership-criteria/?member=${MemberId}`)
          .then(function(response) {
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
        return response;
    },
}