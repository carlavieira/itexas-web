const url = "eventsApi/";

export default {
  getAllEvents(api) {
    const response = api
      .get(url)
      .then(function(response) {
        console.log(response.data);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
  createEvent(api, eventDetails) {
    const response = api
      .post(url, eventDetails)
      .then(function(response) {
        // handle success
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  }
};
