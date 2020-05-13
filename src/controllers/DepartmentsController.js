export default {
    getDepartments(api) {
        return api
            .get(`manage-departments`)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    },

    // createOfficeHour(api, data) {

    //     return api
    //         .post("manage-office-hours/", data)
    //         .then((res) => {
    //             return res
    //         })
    //         .catch((e) => {
    //             throw e;
    //         });
    // },

    // editOfficeHour(api, data) {
    //     data.member.id ? (data.member = data.member.id) : (data.member = userId)
    //     return api
    //     .put(`manage-office-hours/${data.id}/`, data)
    //     .then((res) => res.data)
    //     .catch((e) => {
    //       throw e;
    //     });
    // },

    // deleteOfficeHour(api, data){
    //     return api
    //     .delete(`manage-office-hours/${data.id}`)
    //     .then((res) => res.data)
    //     .catch((e) => {
    //       throw e;
    //     });
    // },

    // listOfficeHour(api){
    //     return api
    //     .get(`list-office-hours`)
    //     .then(res => res)
    //     .catch(e => {
    //         throw e
    //     })
    // }
}