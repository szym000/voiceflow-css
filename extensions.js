export const SavePageTitleExtension = {
  name: 'SavePageTitle',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'save_page_title' || trace.payload.name === 'save_page_title',
  effect: async ({ trace }) => {
    console.log('SavePageTitleExtension triggered');

    try {
      const pageTitle = document.title;
      console.log('Captured Page Title:', pageTitle);

      // Send the page title to Voiceflow's chat as a variable
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { page_title: pageTitle },
      });

      console.log('Page title saved successfully in Voiceflow variable');
    } catch (error) {
      console.error('Error capturing page title:', error);
    }
  },
};




export const ext_selectEvent = {
  name: 'EventSelector',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'select_event' || trace.payload.name === 'select_event',
  render: async ({ trace, element }) => {
    const containerId = 'event-selector-container';

    // Check if the container already exists
    let container = element.querySelector(`#${containerId}`);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      element.appendChild(container);
    }

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
          background: #fff;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .event-list li:hover {
          background: #eee;
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #666;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>

      <input type="text" id="eventSearch" placeholder="Search by event title" required>
      <div id="loading" class="loading">
        Loading...
        <div class="spinner"></div>
      </div>
      <ul class="event-list" id="eventList" style="display: none;"></ul>
    `;

    const eventSearchInput = container.querySelector('#eventSearch');
    const eventListElement = container.querySelector('#eventList');
    const loadingElement = container.querySelector('#loading');
    let events = [];

    // Fetch events from the WordPress API
    async function fetchEvents() {
      try {
        const response = await fetch('https://wwwdev.embl.org/about/info/course-and-conference-office/wp-json/custom/v1/events?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch events');
        return await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    }

    // Render event list based on the fetched events and user input
    function renderEventList(filter = '') {
      eventListElement.innerHTML = '';
      const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredEvents.length === 0) {
        eventListElement.innerHTML = '<li>No events found</li>';
      } else {
        filteredEvents.forEach(event => {
          const li = document.createElement('li');
          li.textContent = event.title;
          li.addEventListener('click', () => {
            console.log(`Selected: ${event.title}`);

            // Disable the input and hide the list
            eventSearchInput.disabled = true;
            eventListElement.style.display = 'none';

            window.voiceflow.chat.interact({
              type: 'complete',
              payload: { event_id: event.id, event_title: event.title },
            });
          });
          eventListElement.appendChild(li);
        });
      }
    }

    // Initialize the event search functionality
    async function initializeEventSearch() {
      events = await fetchEvents();
      loadingElement.style.display = 'none';
      eventListElement.style.display = 'block';

      renderEventList();

      eventSearchInput.addEventListener('input', (e) => {
        renderEventList(e.target.value);
      });
    }

    initializeEventSearch();
  },
};

