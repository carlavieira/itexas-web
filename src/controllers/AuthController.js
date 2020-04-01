import router from "../router/index"

export default {    
    login(http, email, senha){
        let request = new Object();
        
        request.username = "";
        request.email = email
        request.password = senha

        let url = "http://itexas.pythonanywhere.com/rest-auth/login/";
        
        return http
            .post(url, request)
            .then(res => {
                this.routerPath(res)
                return res;
            })
            .catch(function(err) {
                return err
        });
    },

    routerPath(res){
        res.data.user.is_staff ? router.push("/aplicativo/membros") : router.push("/aplicativo/eventos")
    }


}