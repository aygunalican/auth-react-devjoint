# Sweet Recipes

A small React app for saving and tracking recipes, built as part of a
weekly internship task. Includes mock authentication, protected routes,
global state management, and CRUD operations against a mock API.

## Features

- Login/logout with a mock backend (json-server)
- Session persistence across page refresh, with expiration handling
- Protected routes (redirects to /login when not authenticated)
- Global recipe state via Context + useReducer
- Form validation (login form and recipe form)
- UI updates for create, update, and delete
- Error boundary around the app

## Tech stack

- React 
- React Router
- json-server (mock API)
-  CSS

## Getting started

1. Clone the repo

https://github.com/aygunalican/auth-react-devjoint.git
cd sweet-recipes

2. Install dependencies

npm install

3. Start the mock API (in one terminal)

npx json-server --watch db.json --port 4000

4. Start the app (in another terminal)

npm run dev

5. Log in with the test account: `test / test1234`

## Project structure

src/
api/ - fetch wrapper
context/ - auth context
components/ - shared components (Navbar, ProtectedRoute, ErrorBoundary)
features/
auth/ - login page
recipes/ - recipe context, form, list, card
pages/ - route-level pages


## Notes

- Token expiration :app checks the stored
  expiry time before each API call, since the mock API does not return
  real 401 responses.
- To manually test session expiry, run `window.__expireSession()` in
  the browser console, then perform any action (add/edit a recipe).