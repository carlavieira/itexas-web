

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

    createBackround(api, obj) {
        return api
            .post("manage-backgrounds/", obj)
            .then(res => {
                return res
            }).catch(e => {
                throw e
            })
    },

    editBackground(api, obj) {
        if(obj.post.id)
            obj.post = obj.post.id
        if(obj.department.id)    
            obj.department = obj.department.id
        return api
            .put("manage-backgrounds/" + `${obj.id}/`, obj)
            .then((res) => res.data)
            .catch((e) => {
                throw e;
            });
    },

    deleteBackground(api, id) {
        return api
          .delete("manage-backgrounds/" + `${id}`)
          .then((res) => res.data)
          .catch((e) => {
            throw e;
          });
      },

}