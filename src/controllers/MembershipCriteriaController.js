const url = "membershipCriteria/";

export default {
    listMembershipCriteria(api) {
        const response = api
        .get(url)
        .then(function(response) {
        console.log(response);
        return response;
        })
        .catch(function(error) {
        console.log(error);
        });
        return response;
    },
}