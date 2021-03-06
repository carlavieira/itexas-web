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
    eventDetails.member = eventDetails.memberID;
    let url = `manage-event/${eventDetails.id}/`;
    console.log(eventDetails);
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

  getEventTypes(api) {
    let url = `manage-event/`;
    const response = api
      .options(url)
      .then(function(response) {
        return response.data.actions.POST.type.choices;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
  getEventsInMonth(api) {
    let url = `next-events/`;
    const response = api
      .get(url)
      .then(function(response) {
        console.log(response);
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
};
