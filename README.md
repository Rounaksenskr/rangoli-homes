# RangoliHomes

A full-stack website for **RangoliHomes**, a premium interior design and paint company. It has a Japandi-inspired storefront for home interiors, office interiors and artisanal paint finishes, with lead capture, online consultation booking, email notifications and optional Google Calendar sync.

- **Frontend:** React 19 + Vite + Tailwind CSS 4
- **Backend:** Node.js + Express 5 + SQLite
- **No login required.** It is a public marketing and lead-generation site.

---

## Features

### Storefront (client)
- **Animated door intro:** a "Push to Enter" splash screen that opens onto the site.
- **Six routed pages:** Home, Home Interiors, Office Interiors, Paint & Texture Services, Clientele, and Contact.
- **Lead capture popup:** the inquiry modal opens automatically after 10 seconds or 45% scroll depth, and is suppressed for the rest of the session once dismissed.
- **Consultation booking calendar:** a two-step modal. Pick a date and an available time slot, then enter contact details.
- **Sticky quick actions:** a "Quick Quote" button and a WhatsApp chat button.
- **Newsletter signup** in the footer.
- **Custom design system:** a cream, beige, charcoal and gold palette with Playfair Display and Inter fonts.

### API (server)
- **Inquiries:** saved to SQLite, with an email alert to the admin and a confirmation email to the client.
- **Bookings:** slot availability check, double-booking protection (`409 Conflict`), calendar event creation and a confirmation email.
- **Newsletter:** duplicate-safe subscription.
- **Hardening:** CORS locked to the client origin, input validation, and rate limiting (100 requests per 15 minutes per IP overall, and 10 form submissions per 15 minutes per IP).
- **Graceful degradation:**
  - Without Google credentials, calendar events are mocked ("demo mode").
  - If email delivery fails, the request still succeeds and a warning is logged.

---

## Tech Stack

| Layer      | Technologies                                                         |
| ---------- | -------------------------------------------------------------------- |
| Frontend   | React 19, React Router 7, Vite, Tailwind CSS 4, ESLint               |
| Backend    | Express 5, `express-rate-limit`, `cors`, `dotenv`                    |
| Database   | SQLite (`sqlite3`), auto-created tables                              |
| Email      | Nodemailer (SMTP) with HTML templates                                |
| Scheduling | Google Calendar API (`googleapis`, service account), optional        |
| Tooling    | `concurrently` (run client and server together), `nodemon`           |

---

## Project Structure

```text
rangoli-homes/
├── package.json              # Root scripts (install:all, dev, build, start)
├── client/                   # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx           # Router, modals, popup wiring
│       ├── main.jsx
│       ├── index.css         # Tailwind theme tokens + fonts
│       ├── components/
│       │   ├── common/       # StickyActions (Quick Quote + WhatsApp)
│       │   ├── layout/       # DoorIntro, Navbar, Footer
│       │   ├── modals/       # InquiryModal, BookingCalendar
│       │   └── sections/     # Hero, Marquee, ServiceCards, ServiceGrid,
│       │                     # Testimonials, WhyChooseUs
│       ├── pages/            # Home, HomeInteriors, OfficeInteriors,
│       │                     # PaintServices, ClientelePage, Contact
│       ├── data/             # services, clients, testimonials, images
│       ├── hooks/            # usePopupTrigger (timed + scroll-depth popup)
│       └── services/api.js   # Fetch wrapper for the backend API
└── server/                   # Express API
    ├── .env.example
    └── src/
        ├── server.js         # Entry point
        ├── app.js            # Middleware + route mounting
        ├── config/           # env.js, db.js (SQLite + table migrations)
        ├── controllers/      # inquiry, booking, newsletter
        ├── routes/           # inquiry, booking, newsletter
        ├── middleware/       # validate, rateLimit, errorHandler
        ├── services/         # mail.service.js, calendar.service.js
        ├── templates/        # HTML email templates
        └── utils/slots.js    # Consultation slot logic
```

---

## Getting Started

### Prerequisites
- **Node.js** 20 or newer (check with `node -v`)
- **npm**

### 1. Clone and install

```bash
git clone https://github.com/Rounaksenskr/rangoli-homes.git
cd rangoli-homes
npm run install:all
```

This installs dependencies in the root, `server/` and `client/`.

### 2. Create the database folder

The server stores its SQLite file at `server/data/rangoli.db`. The folder is not tracked by git, so create it once or the server will fail with `SQLITE_CANTOPEN`:

```bash
mkdir server/data
```

The tables are created automatically on first run.

### 3. Configure environment variables

```bash
# macOS / Linux
cp server/.env.example server/.env

# Windows (PowerShell)
Copy-Item server/.env.example server/.env
```

Then edit `server/.env` (see [Environment Variables](#environment-variables)). The defaults are enough to start the app in demo mode.

### 4. Run in development

```bash
npm run dev
```

| Service  | URL                                |
| -------- | ---------------------------------- |
| Client   | http://localhost:5173              |
| API      | http://localhost:5000              |
| Health   | http://localhost:5000/api/health   |

To run them separately, use `npm run dev:server` and `npm run dev:client`.

---

## Environment Variables

**Server** (`server/.env`)

| Variable                          | Default                                       | Description                                      |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------ |
| `PORT`                            | `5000`                                        | API port                                         |
| `CLIENT_URL`                      | `http://localhost:5173`                       | Allowed CORS origin (the frontend URL)           |
| `SMTP_HOST`                       | `smtp.ethereal.email`                         | SMTP server (e.g. `smtp.gmail.com`)              |
| `SMTP_PORT`                       | `587`                                         | SMTP port (`465` enables TLS)                    |
| `SMTP_USER`                       | *(empty)*                                     | SMTP username                                    |
| `SMTP_PASS`                       | *(empty)*                                     | SMTP password or app password                    |
| `ADMIN_EMAIL`                     | `admin@rangolihomes.com`                      | Sender address and recipient of lead alerts      |
| `GOOGLE_CALENDAR_ID`              | `primary`                                     | Calendar to write consultation events to         |
| `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` | `./credentials/google-service-account.json`   | Path to the service-account key, relative to `server/` |

**Client** (optional, `client/.env`)

| Variable        | Default                     | Description          |
| --------------- | --------------------------- | -------------------- |
| `VITE_API_URL`  | `http://localhost:5000/api` | Backend API base URL |

### Optional: enable Google Calendar sync
1. Create a Google Cloud service account and enable the **Google Calendar API**.
2. Download the JSON key to `server/credentials/google-service-account.json`. This folder is git-ignored.
3. Share the target calendar with the service account's email address.

Without the key file, bookings are still saved and confirmed, and the calendar event ID is a mock value.

---

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint                          | Description                                  | Rate limit  |
| ------ | --------------------------------- | -------------------------------------------- | ----------- |
| GET    | `/health`                         | Service health check                         | general     |
| POST   | `/inquiries`                      | Submit a lead inquiry                        | form        |
| GET    | `/inquiries`                      | List all inquiries (newest first)            | general     |
| GET    | `/bookings/slots?date=YYYY-MM-DD` | Slot availability for a date                 | general     |
| POST   | `/bookings`                       | Book a consultation slot                     | form        |
| POST   | `/newsletter/subscribe`           | Subscribe an email address                   | form        |

**Request bodies**

```jsonc
// POST /inquiries
{ "name": "Asha Rao", "phone": "+91 98765 43210", "email": "asha@example.com",
  "service": "Turnkey Home Interiors", "message": "optional" }

// POST /bookings
{ "name": "Asha Rao", "phone": "+91 98765 43210", "email": "asha@example.com",
  "service": "Turnkey Home Interiors", "date": "2026-10-15", "slot": "10:00 AM - 11:00 AM" }

// POST /newsletter/subscribe
{ "email": "asha@example.com" }
```

**Consultation slots:** 10:00-11:00 AM, 11:00 AM-12:00 PM, 12:00-1:00 PM, then 2:00 to 6:00 PM in one-hour blocks. Calendar events are created in IST (UTC+05:30).

All responses use the shape `{ "success": boolean, "message": string, ... }`. Validation failures return `400`, a taken slot returns `409`, and rate-limit hits return `429`.

---

## Database

SQLite with three tables, created automatically on startup:

| Table         | Columns                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `inquiries`   | `id`, `name`, `phone`, `email`, `service`, `message`, `created_at`          |
| `bookings`    | `id`, `name`, `phone`, `email`, `service`, `date`, `slot`, `calendar_event_id`, `created_at` |
| `newsletter`  | `id`, `email` (unique), `created_at`                                        |

---

## Scripts

Run from the repository root:

| Command               | What it does                                         |
| --------------------- | ---------------------------------------------------- |
| `npm run install:all` | Install root, server and client dependencies         |
| `npm run dev`         | Start the API (nodemon) and the client (Vite) together |
| `npm run dev:server`  | API only, with auto-reload                           |
| `npm run dev:client`  | Vite dev server only                                 |
| `npm run build`       | Production build of the client into `client/dist`    |
| `npm start`           | Start the API with plain `node`                      |

Lint the client with `cd client && npm run lint`.

---

## Customising

Before going live, replace the demo content:

- **Contact details:** the placeholder phone number (`+91 (0124) 456-7890`, linked as `tel:+919876543210`) and email (`support@rangolihomes.com`) are in `Footer.jsx` and `Contact.jsx`, and the WhatsApp number is in `StickyActions.jsx`.
- **Services, clients and testimonials:** edit the files in `client/src/data/`.
- **Images:** gallery and hero images are loaded from Unsplash URLs (see `data/services.js` and `data/images.js`).
- **Brand colours and fonts:** `client/src/index.css` (Tailwind theme tokens).
- **Consultation hours:** `DEFAULT_SLOTS` in `server/src/utils/slots.js`.
- **Email copy:** HTML files in `server/src/templates/`, using `{{placeholder}}` variables.
- **Page title:** `client/index.html` still uses the default title `client`.

---

## Deployment Notes

- Build the client with `npm run build` and serve `client/dist` from any static host.
- `client/public/_redirects` exists for Netlify-style hosting. It is currently empty, so add `/*  /index.html  200` to get single-page-app routing on deep links.
- Run the API with `npm start` on a Node host. Set `CLIENT_URL` to your deployed frontend URL and `VITE_API_URL` to your deployed API URL at client build time.
- SQLite writes to local disk, so use a host with persistent storage, or migrate to a hosted database.

---

## Known Limitations

- `GET /api/inquiries` has **no authentication**, so anyone who can reach the API can read the lead list. Add auth or remove the route before a public deployment.
- `axios`, `framer-motion`, `lucide-react` and `canvas-confetti` are listed in `client/package.json` but are not currently imported. They can be removed or put to use.
- There are no automated tests yet.

---

## License

ISC
