const url = "event/";

export default {
  getAllEvents(api) {
    const response = api
      .get(url)
      .then(function (response) {
        console.log(response.data);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  },
};
