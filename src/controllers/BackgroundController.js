

export default {

    getBackground(api, id) {
        return api
            .get(`list-backgrounds/?member=${id}`)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    }

}