# Scriptium Frontend

Scriptium is a platform designed to collect and present theological and philosophical sources.

## Quick Start

Clone the repository:

```bash
git clone https://github.com/kaanoz1/scriptium-frontend.git
cd scriptium-frontend
```

To initialize the project, ensure you have Node.js v24+ installed, then run:

```bash
cp .env.example .env && npm install && npx prisma generate && npx prisma db push
```

After that you can start the application either by Docker or locally.

---

## Architecture

Each page in the application follows a strict three-layer structure consisting of:

- `page.tsx`
- `main.tsx`
- `client.tsx`

### page.tsx (Server Layer)

This file is responsible for all **server-side operations**, including:

- Metadata generation
- Data fetching
- Preparing initial data for rendering

Data fetching is intentionally performed here to ensure that the **initial HTML response contains meaningful content**, which is crucial for SEO.

---

### client.tsx (Client Layer)

This file handles all **client-side logic**, including:

- Instantiating objects from raw/plain JavaScript data
- Filtering or transforming data
- Setting optional configurations

All objects should be constructed in a **controlled and demand-driven manner** to ensure efficiency and flexibility.

---

### main.tsx (Composition Layer)

This is the **final composition layer**, where:

- All objects are already instantiated
- Preferences are already applied
- Data is assumed to be ready

> ⚠️ No validation or checks should be performed here.  
> All validation must be handled in either `page.tsx` or `client.tsx`.

---

## Features:

### Dynamic Sitemap

Many pages depend on dynamic parameters. For example:

```
/a/b
```

Not all combinations of `a` and `b` are valid.

#### How it works:

- When a valid combination of parameters (`a`, `b`) is used:
    - Data is successfully fetched
    - The combination is stored on the server

- When search engine bots (e.g., Googlebot) access the site:
    - A `sitemap.xml` is dynamically generated
    - Only **valid and previously verified routes** are included

This ensures:

- Accurate indexing
- No invalid routes are exposed
- Improved SEO performance

---

## 📄 License

This project is licensed under the [MIT License](LICENCE) on behalf of Scriptium.