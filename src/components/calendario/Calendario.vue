<template>
  <div>
    <v-row class="px-4 py-2">
      <h2>Calendário</h2>
    </v-row>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined color="grey darken-2" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <p v-html="selectedEvent.lider"></p>
                <p v-html="selectedEvent.presenca"></p>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Fechar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import eventController from "../../controllers/EventController";
import meetingController from "../../controllers/MeetingController";
import participationController from "../../controllers/ParticipationController";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    start: null,
    end: null,
    eventController,
    participationController,
    meetingController,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    eventos: [],
    meetings: [],
    reunioes: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  created() {
    this.getEvents();
    this.getMeetings();
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    async getEvents() {
      const is_staff = localStorage.getItem("is_staff");
      console.log(is_staff);
      if (is_staff == "true") {
        console.log("admin events");
        /*const events = [];*/
        const eventosAdmin = await this.eventController.getAllEvents(this.$api);

        eventosAdmin.data.forEach((evento) => {
          delete evento.url;

          this.events.push({
            color: "yellow darken-2",
            start: this.formatDate(evento.date, evento.time, false),
            end: this.formatDate(evento.date, evento.time, true),
            name: this.formatEventType(evento.type),
            lider: `Lider: ${evento.member.first_name} ${evento.member.last_name}`,
          });
        });
      }
      if (is_staff == "false") {
        const memberID = localStorage.getItem("user_id");
        console.log("membro eventos");
        const eventosMembro = await this.participationController.getMemberParticipationEvent(
          this.$api,
          memberID
        );
        console.log(eventosMembro);
        eventosMembro.forEach((evento) => {
          delete evento.member;
          delete evento.url;

          this.events.push({
            color: evento.attendance ? "indigo" : "cyan",
            start: this.formatDate(evento.event.date, evento.event.time, false),
            end: this.formatDate(evento.event.date, evento.event.time, true),
            name: this.formatEventType(evento.event.type),
            lider: `Lider: ${evento.event.member.first_name} ${evento.event.member.last_name}`,
            presenca: `Presença: ${evento.attendance}`,
          });
        });
      }
    },
    async getMeetings() {
      const is_staff = localStorage.getItem("is_staff");
      console.log(is_staff);
      if (is_staff == "true") {
        console.log("admin meeting");
        const meetingsAdmin = await this.meetingController.getAllMeeting(
          this.$api
        );

        meetingsAdmin.forEach((meeting) => {
          delete meeting.url;

          this.events.push({
            color: "yellow darken-4",
            start: this.formatDate(meeting.date, meeting.time, false),
            end: this.formatDate(meeting.date, meeting.time, true),
            name: this.formatEventType(meeting.type),
            lider: `Lider: ${meeting.member.first_name} ${meeting.member.last_name}`,
          });
        });
      }
      if (is_staff == "false") {
        console.log("membro meeting");
        const memberID = localStorage.getItem("user_id");
        const meetingsMembro = await this.participationController.getMemberParticipationMeeting(
          this.$api,
          memberID
        );

        meetingsMembro.forEach((meeting) => {
          delete meeting.url;

          this.events.push({
            color: meeting.attendance ? "green" : "red",
            start: this.formatDate(
              meeting.meeting.date,
              meeting.meeting.time,
              false
            ),
            end: this.formatDate(
              meeting.meeting.date,
              meeting.meeting.time,
              true
            ),
            name: this.formatEventType(meeting.meeting.type),
            lider: `Lider: ${meeting.meeting.member.first_name} ${meeting.meeting.member.last_name}`,
            presenca: `Presença: ${meeting.attendance}`,
          });
        });
      }
    },
    formatDate(date, time, plusTwoHours) {
      if (plusTwoHours) {
        // eslint-disable-next-line no-unused-vars
        let timePlusHour = new Date(`2020-05-05 ${time}`);
        timePlusHour = `${timePlusHour.getHours() +
          2}:${timePlusHour.getMinutes()}`;
        return `${date} ${timePlusHour}`;
      } else {
        return `${date} ${time}`;
      }
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatEventType(sigla) {
      if (sigla == "RG") return "Reunião Geral";
      else if (sigla == "AS") return "Assembléia";
      else if (sigla == "CF") return "Conferência";
      else if (sigla == "OU") return "Outros";
      else if (sigla == "REB") return "REB";
      else if (sigla == "RA") return "Reunião de Área";
      else if (sigla == "RT") return "Reunião de Time";
      else if (sigla == "LR") return "Reunião de LR";
      else if (sigla == "CN") return "Reunião de Corner";
    },
  },
};
</script>
