/**
 * @file calendar.js
 * @description FullCalendar v7 client-side controller for Toha Professional Modern.
 * Handles Google Calendar API v3 event synchronization, Google Palette Manager
 * (resolving colorId 1-11), Popper.js interactive hover popovers, balanced 3-column
 * centered toolbar grid, responsive view switching, and live dark/light mode synchronization.
 */

import 'temporal-polyfill/global';
import Calendar from 'fullcalendar/all';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import classicThemePlugin from 'fullcalendar/themes/classic';
import { createPopper } from '@popperjs/core';

/**
 * Standard Google Calendar palette mapping (colorId '1' through '11').
 */
const GOOGLE_CALENDAR_PALETTE = {
  1: '#7986cb', // Lavender
  2: '#33b679', // Sage
  3: '#8e24aa', // Grape
  4: '#e67c73', // Flamingo
  5: '#f6bf26', // Banana
  6: '#f4511e', // Tangerine
  7: '#039be5', // Peacock
  8: '#616161', // Graphite
  9: '#3f51b5', // Blueberry
  10: '#0b8043', // Basil
  11: '#d50000' // Tomato
};

/**
 * Named Google Calendar palette entries and color aliases.
 */
const PALETTE_NAMES = {
  lavender: '#7986cb',
  sage: '#33b679',
  grape: '#8e24aa',
  flamingo: '#e67c73',
  banana: '#f6bf26',
  tangerine: '#f4511e',
  peacock: '#039be5',
  graphite: '#616161',
  blueberry: '#3f51b5',
  basil: '#0b8043',
  tomato: '#d50000',
  cyan: '#0891b2',
  teal: '#0d9488',
  emerald: '#059669',
  green: '#16a34a',
  blue: '#2563eb',
  indigo: '#4f46e5',
  purple: '#9333ea',
  pink: '#db2777',
  rose: '#e11d48',
  red: '#dc2626',
  orange: '#ea580c',
  amber: '#d97706',
  yellow: '#ca8a04',
  slate: '#475569',
  gray: '#4b5563'
};

/**
 * Resolves an individual event color.
 * Evaluation precedence:
 * 1. Google API colorId (if returned by Google Calendar API v3)
 * 2. User-configured colorMap / categoryColors (matching title or keyword)
 * 3. Fallback explicit color (if configured in YAML and not "theme" or empty)
 * 4. Automatic smart palette hashing (groups sections of the same course,
 *    and assigns distinct, vibrant Google Calendar palette colors)
 */
let googleColorsCache = null;

/**
 * Fetches the official Google Calendar color definitions via Google Calendar API v3.
 */
async function fetchGoogleColors(apiKey) {
  if (googleColorsCache) {
    return googleColorsCache;
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/colors?key=${encodeURIComponent(apiKey)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data && (data.event || data.calendar)) {
        googleColorsCache = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('Google Calendar Colors API fetch notice:', err);
  }
  return null;
}

/**
 * Resolves an individual event color.
 * Evaluation precedence:
 * 1. Google API colorId (dynamically fetched from Google Calendar API v3 colors endpoint)
 * 2. Optional user-configured colorMap (if specified in YAML for custom overrides)
 * 3. Fallback explicit color (if configured in YAML and not "theme" or empty)
 * 4. Automatic zero-config topic hashing (normalizes course section numbers,
 *    and assigns distinct, harmonious Google Calendar palette colors via DJB2)
 */
function resolveEventColor(item, colorMap, useThemeColor, defaultEventColor, googleColors) {
  // 1. Google API colorId dynamically matched against Google Colors endpoint
  if (item.colorId) {
    if (googleColors && googleColors.event && googleColors.event[item.colorId]) {
      return googleColors.event[item.colorId].background;
    }
    if (GOOGLE_CALENDAR_PALETTE[item.colorId]) {
      return GOOGLE_CALENDAR_PALETTE[item.colorId];
    }
  }

  const summary = (item.summary || '').trim();

  // 2. Optional custom colorMap rule matching (if defined)
  if (colorMap && typeof colorMap === 'object' && Object.keys(colorMap).length > 0) {
    const lowerSummary = summary.toLowerCase();
    for (const [key, val] of Object.entries(colorMap)) {
      if (key && lowerSummary.includes(key.toLowerCase())) {
        const lowerVal = String(val).toLowerCase().trim();
        if (PALETTE_NAMES[lowerVal]) return PALETTE_NAMES[lowerVal];
        if (GOOGLE_CALENDAR_PALETTE[lowerVal]) return GOOGLE_CALENDAR_PALETTE[lowerVal];
        return val;
      }
    }
  }

  // 3. User explicit fallback color
  if (!useThemeColor && defaultEventColor) {
    return defaultEventColor;
  }

  // 4. Automatic zero-config course/topic color assignment
  // Normalizes titles by stripping section numbers (e.g., "College Algebra 001" -> "college algebra")
  const normalizedTitle = summary
    .replace(/\s+(0\d+|\d+|sec\w*|section\w*)$/i, '')
    .trim()
    .toLowerCase();

  if (normalizedTitle) {
    // Authentic Google Calendar event palette colors
    const autoPalette = [
      '#4f46e5', // Blueberry
      '#059669', // Sage / Basil
      '#8e24aa', // Grape
      '#d97706', // Tangerine
      '#0284c7', // Peacock
      '#dc2626', // Tomato
      '#0d9488', // Teal
      '#7986cb', // Lavender
      '#db2777', // Flamingo
      '#475569', // Graphite
      '#f59e0b'  // Banana
    ];
    let h = 5381;
    for (let i = 0; i < normalizedTitle.length; i++) {
      h = ((h << 5) + h + normalizedTitle.charCodeAt(i)) & 0xffffffff;
    }
    const index = Math.abs(h) % autoPalette.length;
    return autoPalette[index];
  }

  return undefined;
}

/**
 * Escapes HTML characters for safe rendering in popovers.
 */
/**
 * Calculates accessible text contrast color (#0f172a or #ffffff) based on WCAG 2.1 relative luminance.
 */
function getContrastColor(hexColor) {
  if (!hexColor || typeof hexColor !== "string") return "#ffffff";
  let hex = hexColor.trim().replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  if (hex.length !== 6) return "#ffffff";

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  const crWhite = 1.05 / (L + 0.05);
  const crDark = (L + 0.05) / 0.061;

  return crDark >= crWhite ? "#0f172a" : "#ffffff";
}

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

  const eventColor =
    event.backgroundColor ||
    event.borderColor ||
    (event.extendedProps && event.extendedProps.color);
  const colorSwatchHtml = eventColor
    ? `<span class="popover-color-swatch" style="background-color: ${escapeHtml(eventColor)};"></span>`
    : '';

  activePopoverEl.innerHTML = `
    <div class="popover-header">
      ${colorSwatchHtml}
      <div class="popover-title">${escapeHtml(event.title || 'Untitled Event')}</div>
    </div>
    <div class="popover-body">
      ${
        timeStr
          ? `
        <div class="popover-detail-row">
          <i class="fa-solid fa-clock popover-icon"></i>
          <span class="popover-detail-text">${escapeHtml(timeStr)}</span>
        </div>`
          : ''
      }
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
  const firstDay =
    firstDayStr !== undefined && firstDayStr !== ''
      ? parseInt(firstDayStr, 10)
      : 0;
  const heightVal = calendarEl.dataset.height || 'auto';
  const eventColor = calendarEl.dataset.eventColor || '';
  const eventsUrl = calendarEl.dataset.eventsUrl;
  const showNav = calendarEl.dataset.showNav !== 'false';
  const showToday = calendarEl.dataset.showToday !== 'false';
  const showViews = calendarEl.dataset.showViews !== 'false';
  const slotMinTime = calendarEl.dataset.slotMinTime || '08:00:00';
  const slotMaxTime = calendarEl.dataset.slotMaxTime || '17:00:00';

  let colorMap = {};
  if (calendarEl.dataset.colorMap) {
    try {
      colorMap = JSON.parse(calendarEl.dataset.colorMap);
    } catch (e) {
      console.warn('Failed to parse calendar color map:', e);
    }
  }

  let customOptions = {};
  if (calendarEl.dataset.config) {
    try {
      customOptions = JSON.parse(calendarEl.dataset.config);
    } catch (e) {
      console.warn('Failed to parse calendar configuration JSON:', e);
    }
  }

  const eventSources = [];
  const useThemeColor =
    !eventColor || eventColor === 'theme' || eventColor === 'inherit';

  // Google Calendar event source with Google Palette mapping (resolves item.colorId 1-11)
  if (calendarId && apiKey) {
    const ids = calendarId
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    ids.forEach((id) => {
      eventSources.push({
        id: `gcal-${id}`,
        events(fetchInfo, successCallback, failureCallback) {
          const url = new URL(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events`
          );
          url.searchParams.set('key', apiKey);
          url.searchParams.set('timeMin', fetchInfo.startStr);
          url.searchParams.set('timeMax', fetchInfo.endStr);
          url.searchParams.set('singleEvents', 'true');
          url.searchParams.set('maxResults', '2500');
          if (timeZone && timeZone !== 'local') {
            url.searchParams.set('timeZone', timeZone);
          }

          Promise.all([
            fetch(url.toString()).then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Google Calendar API HTTP ${res.status}: ${res.statusText}`
                );
              }
              return res.json();
            }),
            fetchGoogleColors(apiKey)
          ])
            .then(([data, googleColors]) => {
              if (data.error) {
                throw new Error(
                  data.error.message || 'Google Calendar API error'
                );
              }
              const rawItems = data.items || [];
              const parsedEvents = rawItems
                .map((item) => {
                  let eventUrl = item.htmlLink || null;
                  if (eventUrl && timeZone && timeZone !== 'local') {
                    eventUrl +=
                      (eventUrl.includes('?') ? '&' : '?') +
                      'ctz=' +
                      encodeURIComponent(timeZone);
                  }

                  // Resolve individual color with Google Colors API & smart fallback
                  const itemColor = resolveEventColor(
                    item,
                    colorMap,
                    useThemeColor,
                    eventColor,
                    googleColors
                  );
                  const itemTextColor = getContrastColor(itemColor);

                  return {
                    id: item.id,
                    title: item.summary || 'Untitled Event',
                    start: item.start
                      ? item.start.dateTime || item.start.date
                      : null,
                    end: item.end ? item.end.dateTime || item.end.date : null,
                    url: eventUrl,
                    ...(itemColor
                      ? {
                          color: itemColor,
                          backgroundColor: itemColor,
                          borderColor: itemColor,
                          textColor: itemTextColor
                        }
                      : {}),
                    extendedProps: {
                      location: item.location || '',
                      description: item.description || '',
                      colorId: item.colorId || null,
                      color: itemColor || null,
                      attachments: item.attachments || []
                    }
                  };
                })
                .filter((ev) => ev.start != null);

              successCallback(parsedEvents);
            })
            .catch((err) => {
              console.error(`Google Calendar [${id}] fetch failure:`, err);
              failureCallback(err);
            });
        }
      });
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

  const getThemeScheme = () =>
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light';

  const calendarOptions = {
    plugins: [classicThemePlugin, googleCalendarPlugin],
    googleCalendarApiKey: apiKey,
    headerToolbarClass: 'calendar-header-toolbar',
    initialView,
    timeZone,
    firstDay: isNaN(firstDay) ? 0 : firstDay,
    height:
      heightVal === 'auto'
        ? 'auto'
        : isNaN(heightVal)
          ? heightVal
          : parseInt(heightVal, 10),
    slotMinTime,
    slotMaxTime,
    scrollTime: slotMinTime,
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
    eventSourceFailure(error) {
      console.error('FullCalendar Event Source Error:', error);
    },
    eventMouseEnter(info) {
      showEventPopover(info.event, info.el);
    },
    eventMouseLeave() {
      hideEventPopover();
    },
    eventClick(info) {
      hideEventPopover();
      if (info.event.url) {
        info.jsEvent.preventDefault();
        window.open(info.event.url, '_blank', 'noopener,noreferrer');
      }
    },
    ...customOptions
  };

  const calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render();

  // Responsive view adjustment for smaller mobile screens
  const adjustViewForScreen = () => {
    if (
      window.innerWidth < 768 &&
      calendar.view &&
      calendar.view.type.startsWith('timeGrid')
    ) {
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
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-theme'
      ) {
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
