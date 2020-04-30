
let userId = localStorage.getItem("user_id")

export default {
    getOfficeHours(api) {
        return api
            .get(`officeHoursApi/?member=${userId}`)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    },

    createOfficeHour(api, data) {
        data.member = userId

        return api
            .post("officeHoursApi/", data)
            .then((res) => {
                return res
            })
            .catch((e) => {
                throw e;
            });
    },

    editOfficeHour(api, data) {
        data.member = userId
        return api
        .put(`officeHoursApi/${data.id}/`, data)
        .then((res) => res.data)
        .catch((e) => {
          throw e;
        });

    }
}