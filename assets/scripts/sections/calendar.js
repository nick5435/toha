import 'temporal-polyfill/global';
import Calendar from 'fullcalendar/all';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import classicThemePlugin from 'fullcalendar/themes/classic';
import { createPopper } from '@popperjs/core';

/**
 * Escapes HTML characters for safe rendering in popovers.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

let activePopper = null;
let activePopoverEl = null;

function hideEventPopover() {
  if (activePopper) {
    activePopper.destroy();
    activePopper = null;
  }
  if (activePopoverEl) {
    activePopoverEl.remove();
    activePopoverEl = null;
  }
}

function showEventPopover(event, targetEl) {
  hideEventPopover();

  activePopoverEl = document.createElement('div');
  activePopoverEl.className = 'calendar-event-popover';
  activePopoverEl.setAttribute('role', 'tooltip');

  let timeStr = '';
  if (event.allDay) {
    timeStr = 'All day';
  } else if (event.start) {
    const timeOptions = { hour: 'numeric', minute: '2-digit' };
    const startFormatted = event.start.toLocaleTimeString([], timeOptions);
    if (event.end) {
      const endFormatted = event.end.toLocaleTimeString([], timeOptions);
      timeStr = `${startFormatted} – ${endFormatted}`;
    } else {
      timeStr = startFormatted;
    }
  }

  const location = event.extendedProps && event.extendedProps.location;
  const description = event.extendedProps && event.extendedProps.description;

  let locationHtml = '';
  if (location) {
    locationHtml = `
      <div class="popover-detail-row">
        <i class="fa-solid fa-location-dot popover-icon"></i>
        <span class="popover-detail-text">${escapeHtml(location)}</span>
      </div>`;
  }

  let descHtml = '';
  if (description) {
    const cleanDesc = description.replace(/<[^>]*>/g, '').trim();
    if (cleanDesc) {
      descHtml = `
        <div class="popover-detail-row">
          <i class="fa-solid fa-align-left popover-icon"></i>
          <span class="popover-detail-text">${escapeHtml(cleanDesc)}</span>
        </div>`;
    }
  }

  const footerHtml = event.url
    ? `<div class="popover-footer">
        <i class="fa-solid fa-up-right-from-square popover-icon"></i>
        <span>Click to view in Google Calendar</span>
       </div>`
    : '';

  activePopoverEl.innerHTML = `
    <div class="popover-header">
      <div class="popover-title">${escapeHtml(event.title || 'Untitled Event')}</div>
    </div>
    <div class="popover-body">
      ${timeStr ? `
        <div class="popover-detail-row">
          <i class="fa-solid fa-clock popover-icon"></i>
          <span class="popover-detail-text">${escapeHtml(timeStr)}</span>
        </div>` : ''}
      ${locationHtml}
      ${descHtml}
      ${footerHtml}
    </div>
  `;

  document.body.appendChild(activePopoverEl);

  activePopper = createPopper(targetEl, activePopoverEl, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'right', 'left']
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8
        }
      }
    ]
  });

  requestAnimationFrame(() => {
    if (activePopoverEl) {
      activePopoverEl.classList.add('show');
    }
  });
}

/**
 * Initializes the FullCalendar widget for the calendar section.
 */
function initCalendar() {
  const calendarEl = document.getElementById('calendar-widget');
  if (!calendarEl) {
    return;
  }

  const calendarId = calendarEl.dataset.calendarId;
  const apiKey = calendarEl.dataset.apiKey;
  const initialView = calendarEl.dataset.initialView || 'timeGridWeek';
  const timeZone = calendarEl.dataset.timeZone || 'America/Chicago';
  const firstDayStr = calendarEl.dataset.firstDay;
  const firstDay = (firstDayStr !== undefined && firstDayStr !== '') ? parseInt(firstDayStr, 10) : 1;
  const heightVal = calendarEl.dataset.height || 'auto';
  const eventColor = calendarEl.dataset.eventColor || '';
  const eventsUrl = calendarEl.dataset.eventsUrl;
  const showNav = calendarEl.dataset.showNav !== 'false';
  const showToday = calendarEl.dataset.showToday !== 'false';
  const showViews = calendarEl.dataset.showViews !== 'false';
  const slotMinTime = calendarEl.dataset.slotMinTime || '07:00:00';
  const slotMaxTime = calendarEl.dataset.slotMaxTime || '20:00:00';

  let customOptions = {};
  if (calendarEl.dataset.config) {
    try {
      customOptions = JSON.parse(calendarEl.dataset.config);
    } catch (e) {
      console.warn('Failed to parse calendar configuration JSON:', e);
    }
  }

  const eventSources = [];
  const useThemeColor = !eventColor || eventColor === 'theme' || eventColor === 'inherit';

  // Google Calendar event source via @fullcalendar/google-calendar
  if (calendarId && apiKey) {
    const ids = calendarId.split(',').map((id) => id.trim()).filter(Boolean);
    ids.forEach((id) => {
      const srcObj = {
        googleCalendarId: id,
        googleCalendarApiKey: apiKey
      };
      if (!useThemeColor) {
        srcObj.color = eventColor;
      }
      eventSources.push(srcObj);
    });
  }

  // Optional JSON feed event source
  if (eventsUrl) {
    eventSources.push({
      url: eventsUrl,
      ...(!useThemeColor ? { color: eventColor } : {})
    });
  }

  // Optional inline events list
  if (calendarEl.dataset.eventsJson) {
    try {
      const inlineEvents = JSON.parse(calendarEl.dataset.eventsJson);
      if (Array.isArray(inlineEvents) && inlineEvents.length > 0) {
        eventSources.push({
          events: inlineEvents,
          ...(!useThemeColor ? { color: eventColor } : {})
        });
      }
    } catch (e) {
      console.warn('Failed to parse inline calendar events:', e);
    }
  }

  // Header navigation controls
  const leftItems = [];
  if (showNav) leftItems.push('prev,next');
  if (showToday) leftItems.push('today');

  const headerToolbar = {
    left: leftItems.join(' '),
    center: 'title',
    right: showViews ? 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' : ''
  };

  const getThemeScheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  const calendar = new Calendar(calendarEl, {
    plugins: [classicThemePlugin, googleCalendarPlugin],
    googleCalendarApiKey: apiKey,
    headerToolbarClass: 'calendar-header-toolbar',
    initialView,
    timeZone,
    firstDay: isNaN(firstDay) ? 1 : firstDay,
    height: heightVal === 'auto' ? 'auto' : (isNaN(heightVal) ? heightVal : parseInt(heightVal, 10)),
    slotMinTime,
    slotMaxTime,
    expandRows: true,
    headerToolbar,
    eventSources,
    colorScheme: getThemeScheme(),
    navLinks: true,
    dayMaxEvents: true,
    nowIndicator: true,
    weekNumbers: false,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    eventSourceFailure: function(error) {
      console.error('FullCalendar Event Source Error:', error);
    },
    eventMouseEnter: function(info) {
      showEventPopover(info.event, info.el);
    },
    eventMouseLeave: function() {
      hideEventPopover();
    },
    eventClick: function(info) {
      hideEventPopover();
      if (info.event.url) {
        info.jsEvent.preventDefault();
        window.open(info.event.url, '_blank', 'noopener,noreferrer');
      }
    },
    ...customOptions
  });

  calendar.render();

  // Responsive view adjustment for smaller mobile screens
  const adjustViewForScreen = () => {
    if (window.innerWidth < 768 && calendar.view && calendar.view.type.startsWith('timeGrid')) {
      calendar.changeView('listWeek');
    }
  };
  adjustViewForScreen();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    hideEventPopover();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      adjustViewForScreen();
      calendar.updateSize();
    }, 150);
  });

  window.addEventListener('scroll', hideEventPopover, { passive: true });

  // Dynamically sync theme changes with FullCalendar colorScheme
  const themeObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        calendar.setOption('colorScheme', getThemeScheme());
        break;
      }
    }
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalendar);
} else {
  initCalendar();
}
