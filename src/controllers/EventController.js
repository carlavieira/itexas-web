export default {
  getAllEvents(axios) {
    let url = "http://itexas.pythonanywhere.com/event/";

    const response = axios
      .get(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
      })
      .then(function(response) {
        console.log("Entrei then");
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  }
};
