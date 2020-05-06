export default {
  getAllEvents(api) {
    const response = api
      .get("list-events/")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  createEvent(api, eventDetails) {
    const response = api
      .post("manage-event/", eventDetails)
      .then(function(response) {
        // handle success
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },

  editEvent(api, eventDetails) {
    let url = `manage-event/${eventDetails.id}/`;
    eventDetails.member = eventDetails.member.id;
    const response = api
      .put(url, eventDetails)
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  deleteEvent(api, eventDetails) {
    let url = `manage-event/${eventDetails.id}/`;
    const response = api
      .delete(url)
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
};
