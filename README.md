# MK Dashboard Pro

Enterprise SaaS dashboard built with Next.js 16, React 19 and TypeScript.

## Features

- **KPI Dashboard** — stat cards, revenue line chart, orders bar chart, traffic donut chart
- **Orders Management** — searchable table with status filters, order detail pages with dynamic routes
- **Customer CRM** — filterable customer list with segment breakdown
- **Product Catalog** — searchable product inventory with category filters
- **Dark / Light Mode** — theme toggle with localStorage persistence
- **Responsive Layout** — mobile sidebar with hamburger menu, adaptive grids
- **Toast Notifications** — animated feedback on user actions
- **Loading States** — skeleton loaders with shimmer animation
- **Custom 404** — branded not-found page

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 + custom CSS variables |
| Charts | Recharts 3 |
| Deployment | Vercel-ready |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
app/
  page.tsx              # Main dashboard
  orders/               # Orders list + detail (/orders/[id])
  customers/            # Customer CRM
  products/             # Product catalog
  api/                  # REST API routes (demo data)
  not-found.tsx         # Custom 404

components/
  layout/               # AppShell, Sidebar, Topbar
  dashboard/            # StatCard, RevenueChart, OrdersBarChart, TrafficDonutChart
  ui/                   # SectionCard, ThemeProvider, ToastProvider
```

## Author

**Miroslav Kucera** — Junior Fullstack Developer
