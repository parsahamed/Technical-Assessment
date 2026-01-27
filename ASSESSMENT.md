# Front-End Engineer Assessment — Revalia Bio

**Time limit:** 4–5 hours  
**Focus:** Frontend (React + TypeScript + Vite). Backend is provided and should not be changed.

---

## Setup

1. **Backend:** `cd backend && npm install && npm run dev` (runs on http://localhost:3001)
2. **Frontend:** `cd frontend && npm install && npm run dev` (runs on http://localhost:5173, proxies `/api` to backend)

The frontend is a React + Vite + TypeScript app. Types, API client, and component stubs are in place. Implement the tasks below in the frontend only.

---

## Task 1 — List studies with loading and error states (~1.5–2 h)

**Goal:** Load studies from the API and show them in the list, with clear loading and error handling.

**Requirements:**

- On app load, fetch studies from the API using `fetchStudies()` in `src/api/studies.ts`.
- While loading, show a loading state (e.g. spinner, skeleton, or “Loading…”). Do not show the list until data has loaded.
- If the request fails, show an error message (and optionally a retry action). Do not show a blank or broken list.
- Pass the loaded studies into `StudyList` so the existing list UI displays real data.
- After a successful create or update (Task 2), refresh the list so new/updated studies appear.

**Evaluation:** Loading/error/list wiring in `App.tsx` (or equivalent), and correct use of the studies API.

---

## Task 2 — Create and edit study form with validation (~1.5–2 h)

**Goal:** Make the study form fully work for both creating and editing, with validation and accessibility in mind.

**Requirements:**

- **Create:** Submitting the “New Study” form should call `createStudy()` with the form values and then refresh the list (Task 1).
- **Edit:** Clicking “Edit” on a study should show the form pre-filled with that study; submit should call `updateStudy(id, …)` and then refresh the list and close the form.
- **Validation:**  
  - Title is required and must be non-empty (trimmed).  
  - Show validation feedback (e.g. inline error or list of errors) when the user submits invalid data or when you validate on blur/change.
- **API errors:** If create/update fails (e.g. network or backend error), show the error to the user in a clear way (e.g. near the form or in a shared error area).
- **Accessibility:** Ensure form fields have proper labels, that validation errors are announced (e.g. `role="alert"` or `aria-live`), and that focus/cancel behavior is reasonable (e.g. cancel returns focus appropriately).

**Evaluation:** Correct use of `StudyForm`, `createStudy`, and `updateStudy`; validation and error handling; basic a11y.

---

## Task 3 — Filter and sort (~0.5–1 h)

**Goal:** Add client-side filtering and sorting to the studies list.

**Requirements:**

- **Filter by status:** Add a way to filter the list by `status` (e.g. dropdown or buttons: “All”, “Active”, “Completed”, “Draft”). Only studies matching the selected status are shown.
- **Sort:** Add a way to sort the list, for example by:  
  - Title (A–Z)  
  - Date created (newest or oldest first)  
  - Status  
  Use the existing `statusFilter` and `sortBy` props on `StudyList` if you like, or implement equivalent behavior in the parent.
- Filter and sort must work on the already-loaded list (no new API calls required). Keep the UI clear (e.g. visible filter/sort controls).

**Evaluation:** Correct filtered and sorted list behavior and sensible UX.

---

## What we expect

- **Code quality:** Readable, consistent style; clear component and state boundaries.
- **TypeScript:** Use the existing types in `src/types/study.ts`; avoid `any` where possible.
- **No backend changes:** Do not modify the backend; use only the existing API.
- **Scope:** Completing all three tasks fully is ideal. If short on time, prioritize Task 1 and Task 2; partial Task 3 is acceptable.

---

## API reference (backend)

Base URL for frontend: `/api` (Vite proxies to `http://localhost:3001`).

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/studies` | List all studies |
| GET | `/api/studies/:id` | Get one study |
| POST | `/api/studies` | Create study. Body: `{ title: string, status?: string, phase?: string }`. `title` required. |
| PUT | `/api/studies/:id` | Update study. Body: `{ title?, status?, phase? }` |
| DELETE | `/api/studies/:id` | Delete study (optional to use) |

---

## Submitting your work

- Push your code to the branch we specify (or attach a zip of the repo).
- Ensure the repo includes a short note on:
  - What you did and what you’d do next with more time.
  - Any assumptions or trade-offs you made.

Good luck.
