const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`


export const ext_selectEvent = {
  name: 'EventSelector',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'select_event' || trace.payload.name === 'select_event',
  render: async ({ trace, element }) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        input[type="text"] {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
        }
        .event-list {
          z-index: 9999;
          list-style-type: none;
          padding: 0;
          max-height: 200px;
          overflow-y: auto;
        }
        .event-list li {
          padding: 8px;
          background: #f9f9f9;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .event-list li:hover {
          background: #eee;
        }
      </style>

      <input type="text" id="eventSearch" placeholder="Enter event title...">
      <ul class="event-list" id="eventList"></ul>
    `;

    const eventSearchInput = container.querySelector('#eventSearch');
    const eventListElement = container.querySelector('#eventList');

    // Fetch events from the WordPress API
    async function fetchEvents() {
      try {
        const response = await fetch('https://www.embl.org/about/info/course-and-conference-office/wp-json/wp/v2/vf_events?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch events');
        return await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    }

    // Render event list based on the fetched events and user input
    function renderEventList(events, filter = '') {
      eventListElement.innerHTML = '';
      const filteredEvents = events.filter(event =>
        event.title.rendered.toLowerCase().includes(filter.toLowerCase())
      );

      filteredEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.title.rendered;
        li.addEventListener('click', () => {
          console.log(`Selected: ${event.title.rendered}`);
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { event_id: event.id, event_title: event.title.rendered },
          });
        });
        eventListElement.appendChild(li);
      });
    }

    // Initialize the event search functionality
    async function initializeEventSearch() {
      const events = await fetchEvents();

      renderEventList(events);

      eventSearchInput.addEventListener('input', (e) => {
        renderEventList(events, e.target.value);
      });
    }

    await initializeEventSearch();

    element.appendChild(container);
  },
};
