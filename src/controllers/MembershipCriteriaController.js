const url = "list-membership-criteria/";

export default {
    listMembershipCriteria(api) {
        return api
        .get(url)
        .then(res => {
          return res;
        })
        .catch(e => {
          return e
        });
    },

    getMyMembershipCriteria(api, MemberId) {
        return api
          .get(`list-membership-criteria/?member=${MemberId}`)
          .then(res => {
            return res;
          })
          .catch(e => {
            return e;
          });
    },
}