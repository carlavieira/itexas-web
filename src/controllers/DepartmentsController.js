let url = "manage-departments/";

export default {

    getDepartments(api) {
        return api
            .get(url)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    },

    createDepartment(api, data) {

        return api
            .post(url, data)
            .then((res) => {
                return res
            })
            .catch((e) => {
                throw e;
            });
    },

    editDepartment(api, data) {
        return api
            .put(url + `${data.id}/`, data)
            .then((res) => res.data)
            .catch((e) => {
                throw e;
            });
    },

    deleteDepartment(api, data) {
        return api
            .delete(url + `${data}/`)
            .then((res) => res.data)
            .catch((e) => {
                throw e;
            });
    },

}