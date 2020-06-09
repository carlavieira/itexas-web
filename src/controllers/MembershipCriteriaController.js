const url = "list-membership-criteria/";
const ledUrl = "list-led-membership-criteria/";

export default {
  listMembershipCriteria(api) {
    return api
      .get(url)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  },

  getMyMembershipCriteria(api, MemberId) {
    return api
      .get(`list-membership-criteria/?member=${MemberId}`)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  },

  listLedMembershipCriteria(api) {
    return api
      .get(ledUrl)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  },

  listCurrentMonthCriteria(api) {
    return api
      .get("current-month-criteria")
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  },
};
