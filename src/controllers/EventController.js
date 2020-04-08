export default {
  getAllEvents() {
    let url = "http://itexas.pythonanywhere.com/event/";

    const response = this.axios
      .get(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
      })
      .then(function(response) {
        console.log(response.data);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  }
};
