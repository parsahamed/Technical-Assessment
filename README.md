# Revalia Bio — Front-End Engineer Assessment

This repo contains a small full-stack app used for the **front-end assessment**. Candidates work only in the **frontend**; the backend is provided and should not be modified.

## Structure

```
Revalia/
├── backend/          # Node + Express API (do not modify)
├── frontend/         # React + Vite + TypeScript (candidate implements tasks here)
├── ASSESSMENT.md     # Task instructions and API reference for candidates
└── README.md         # This file
```

## Quick start (for candidates)

1. **Install and run the backend**
   ```bash
   cd backend && npm install && npm run dev
   ```
   API runs at http://localhost:3001.

2. **Install and run the frontend**
   ```bash
   cd frontend && npm install && npm run dev
   ```
   App runs at http://localhost:5173. `/api` is proxied to the backend.

3. **Do the work in the frontend**  
   See [ASSESSMENT.md](./ASSESSMENT.md) for the three tasks and API details.

## Tech stack

- **Backend:** Node.js, Express, in-memory store (no DB).
- **Frontend:** React 18, TypeScript, Vite. Types and API client are set up; candidates implement list loading, form create/edit with validation, and filter/sort.

## Time limit

Roughly **4–5 hours**. Focus on Task 1 (list + loading/error) and Task 2 (form + validation) first; Task 3 (filter/sort) can be simplified if needed.

## Candidate notes

What I did:
- Wired the study list to the API with loading and error states, plus retry.
- Implemented create/edit with validation, error display, and basic focus management.
- Added client-side filter + sort and a clearer empty state.

Trade-offs and assumptions:
- Kept styling minimal and dependency-free to stay within scope.
- Chose a single created-at sort (newest first) for simplicity.

If I had more time:
- Add tests for list filtering/sorting and form validation.
- Improve layout and spacing with a light design pass.
- Add keyboard navigation refinements and richer empty states.
