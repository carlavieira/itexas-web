

export default {

    getBackground(api, id) {
        return api
            .get(`list-backgrounds/?member=${id}`)
            .then(res => {
                return res
            }).catch(e => {
                throw e;
            })
    },

    createBackround(api, obj){
        return api 
            .post("manage-backgrounds/", obj)
            .then(res => {
                return res
            }).catch(e => {
                throw e
            })
    }

}