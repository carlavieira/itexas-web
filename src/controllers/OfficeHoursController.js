
let userId = localStorage.getItem("user_id")

export default {
    getOfficeHours(api) {
        return api
            .get(`list-office-hours/?member=${userId}`)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    },

    createOfficeHour(api, data) {
        data.member = userId

        return api
            .post("manage-office-hours/", data)
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
        .put(`manage-office-hours/${data.id}/`, data)
        .then((res) => res.data)
        .catch((e) => {
          throw e;
        });

    }
}