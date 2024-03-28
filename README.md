# Skeleton project for a fullstack application

This project consists of a frontend created with Vite and a backend server using Koa.

## Prerequisites

- Node.js
- Yarn

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
yarn install
```

Start the server:

```bash
yarn dev
```

Backend will be running on http://localhost:80

## Sample API

- GET http://localhost:80/{formId}/filterResponses/?query=[FILTER_QUERY]

EXAMPLE: localhost:80/cLZojxk94ous/filteredResponses/?query=[{"id":"bE2Bo4cGUv49cjnqZ4UnkW","condition":"equals","value":"Johnny"}]
