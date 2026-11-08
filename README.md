# 🎓 UniSwap — Campus Marketplace & Student Exchange Platform
> **Digital Egypt Pioneers Initiative (DEPI) Graduation Project**  
> **Module: DEV 5 — Admin Dashboard & Content Moderation**

---

## 👩‍💻 DEV 5 Ownership & Deliverables

As defined in the UniSwap project architecture, **DEV 5** owns the complete administrative and content moderation workflow across the full stack:

$$\text{Frontend} \longrightarrow \text{Backend} \longrightarrow \text{Database} \longrightarrow \text{API} \longrightarrow \text{Integration}$$

### 1. Frontend (`/client`)
- **Admin Dashboard**: Real-time KPI statistics (Total Students, Approved Listings, Pending Moderation, Open Reports, Completed Exchanges).
- **Interactive SVG Charts**: Weekly signup & listing volume trends, category breakdown percentage bars, and live moderation activity audit trail.
- **Users Management**: Student table with university affiliation, faculty/department, live search, multi-criteria filters (Role, Status, Faculty), and modal for blocking/unblocking accounts with audit reasons.
- **Listings Moderation Queue**: Grid of submitted student items awaiting admin approval, image preview gallery, price in EGP, condition badges, and approval/rejection modal with student notification reason.
- **Reports Management**: Safety and academic integrity queue with reason classification (`prohibited_item`, `spam_scam`, `inappropriate_content`, `fake_account`), resolution notes, and one-click disciplinary actions.
- **Categories Management**: Full Category CRUD with English & Arabic titles, Lucide icons, assigned university faculties, and active toggle.
- **Admin System Settings**: Moderation keyword blacklist, campus announcement broadcast banner, listing limits per student, and one-click demo data reset.
- **Shared Team Work**:
  - 🌓 Dark / Light Mode with persistent localStorage
  - 🌐 Arabic & English i18n with instant RTL/LTR layout mirroring
  - 🎨 Modern Glassmorphism aesthetic tailored with HSL color tokens and Cairo/Outfit typography

### 2. Backend (`/server`)
- **Express 4 & TypeScript** architecture with modular controllers, routes, and middleware.
- **Role-based Authorization Middleware**: Protects `/admin/*` routes, verifies JWT tokens, and requires `admin` or `moderator` privileges.
- **Dual Engine Datastore**:
  - Connects seamlessly to **MongoDB** via Mongoose models when available.
  - Automatically activates an **In-Memory Store with Seed Data** if MongoDB is offline, allowing 100% functional local evaluations without database setup hurdles.

### 3. Database Models
- `UserModel`: Student profile, university faculty/department, role, verification status, block status & reason.
- `ListingModel`: Item title, description, price (EGP), category, condition, seller reference, images, approval status (`pending`, `approved`, `rejected`, `sold`), rejection reason, moderator audit fields.
- `ReportModel`: Target type (`listing` | `user`), target references, reporter, reason enum, details, status (`pending`, `reviewed`, `action_taken`, `dismissed`), resolution notes.
- `CategoryModel`: Bilingual names (`nameEn`, `nameAr`), slug, icon, description, assigned faculties, active status, listing counts.

---

## 📡 DEV 5 Main API Contracts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/stats` | Real-time platform metrics, weekly trends, category shares |
| `GET` | `/admin/users` | List university students with search & filtering |
| `PATCH` | `/admin/users/:id/block` | Block student account with violation reason |
| `PATCH` | `/admin/users/:id/unblock` | Restore student marketplace access |
| `GET` | `/admin/listings` | Moderation queue with status, category & search filters |
| `PATCH` | `/admin/listings/:id/approve` | Approve listing for university marketplace display |
| `PATCH` | `/admin/listings/:id/reject` | Reject listing with explanation sent to student |
| `GET` | `/admin/reports` | Content & user safety reports queue |
| `PATCH` | `/admin/reports/:id` | Resolve report with moderator action notes |
| `GET` | `/admin/categories` | Retrieve all platform categories |
| `POST` | `/admin/categories` | Create new category with bilingual names |
| `PATCH` | `/admin/categories/:id` | Update category metadata |
| `DELETE` | `/admin/categories/:id` | Remove category |
| `POST` | `/admin/reset-demo` | Reset test data back to clean initial state |

---

## 🚀 How to Run Locally

### 1. Start the React Frontend (`client`)
```bash
cd client
npm run dev
```
> The frontend will run at: **http://localhost:3000** (proxies `/admin` API calls to `http://localhost:5000`).

### 2. Start the Express Backend (`server`)
```bash
cd server
npm start
# or for live reloading:
npm run dev
```
> The API server will run at: **http://localhost:5000**.  
> Test API Health: `http://localhost:5000/api/health`  
> Test Admin Stats: `http://localhost:5000/admin/stats`

---

## 🌿 Git Workflow Reference
- **Branch**: `feature/admin`
- Developed according to the DEPI Team Task Distribution rules:
  - Branch off `main`
  - Implement full-stack feature
  - Run self-test and verification
  - Submit Pull Request to `main` for team code review
