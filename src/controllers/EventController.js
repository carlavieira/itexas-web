let header = {
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
  },
}

export default {
  getAllEvents() {
    let url = "http://itexas.pythonanywhere.com/event/";

    const response = this.axios
      .get(url, header)
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
