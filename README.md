# E-commerce Frontend (React)

A React-based frontend for an e-commerce platform. This repository contains only the frontend application and integrates with a separate backend API.

Note: This project is the frontend for another backend project. The API base URL is configured in src/AxiosInstance/axiosConfig.js.

## Features

User-facing
- Home with hero banner, carousel, and featured categories
- Product listing with search, category filter, and price sorting
- Product details page
- Wishlist (add/remove)
- Cart (add/update/remove)
- Checkout flow that redirects to PayPal
- Authentication (login/register)
- Dark/Light theme toggle
- English/Arabic localization

Admin
- Products management (list, add, edit, delete)
- Categories management (list, add, edit, delete)
- Orders management (list, view details, update status)

## Tech Stack
- React (Create React App)
- React Router
- Redux Toolkit (state), React-Redux
- Axios (API client)
- Tailwind CSS
- Material UI (selected components)
- React Toastify (notifications)
- Framer Motion (animations)
- React Slick (carousel)

## Getting Started

1) Install dependencies

```
npm install
```

2) Run in development

```
npm start
```

3) Build for production

```
npm run build
```

## Configuration

- API base URL: src/AxiosInstance/axiosConfig.js (default: http://3.84.61.66:4000)
- Auth token is stored in localStorage under the key authToken after successful login.
- Protected routes require authToken in localStorage.

If you need to point to a different backend, update the baseURL value in src/AxiosInstance/axiosConfig.js.

## Routes

Public
- / (Home)
- /products
- /details/:id
- /login
- /register

Protected (requires auth token)
- /cart
- /wishlist
- /order

Admin (protected)
- /admin
- /admin/products
- /admin/categories
- /admin/orders
- /admin/dashboard

## Backend Requirements

This frontend expects a RESTful backend exposing endpoints for auth, products, categories, wishlist, cart, orders, and payments (PayPal redirect). Ensure the backend project is running and accessible at the configured base URL before using this app.

## Notes

- This repository only contains the frontend. Integrate with your backend by adjusting the base URL.
- Role enforcement for admin routes is assumed to be handled by the backend. The frontend currently guards routes by token presence.

## Scripts
- npm start: start development server
- npm run build: build production bundle
- npm test: run tests (CRA default)
