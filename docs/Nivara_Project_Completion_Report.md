# Nivara Hotels

## Project Completion Report

| Document detail | Value                                                |
| --------------- | ---------------------------------------------------- |
| Project type    | Hotel management and online room booking application |
| Assessment date | 5 November 2026                                      |
| Overall status  | Partially Completed                                  |

Nivara Hotels combines a public room-booking website with a dashboard for hotel operations. The application covers room availability and reservations, customer and staff records, payments and invoices, housekeeping tasks, issue tracking, and notifications.

<div style="page-break-after: always;"></div>

## Contents

1. Project Overview
2. Project Objectives and Scope of Work
3. Technologies Used
4. Features and Modules Developed
5. User Roles and Access Control
6. Database Design and Resources
7. Testing and Verification
8. Issues Faced and Solutions
9. Development Timeline
10. Deployment
11. Final Deliverables
12. Overall Project Status
13. Future Scope
14. Conclusion and Approval / Sign-off

<div style="page-break-after: always;"></div>

## 1. Project Overview

Nivara Hotels is a hotel management and online room-booking application. It combines a public website for room discovery and booking with an authenticated dashboard for hotel operations.

The system uses React and Vite for the frontend, NestJS for the API, and PostgreSQL managed through Prisma. It serves hotel administrators, managers, staff, customers, and public visitors; detailed features and access rules are described in the following sections.

## 2. Project Objectives and Scope of Work

### Objectives

- Provide public room and amenity information with date-based availability checks.
- Support guest booking and authenticated staff-assisted booking flows.
- Manage room inventory, room types, customer records and staff profiles.
- Track booking status, invoice records and payment activities.
- Support housekeeping task assignment and room cleanliness checks.
- Record operational issues and contact inquiries.
- Provide role-based dashboard access and notification history.

### Scope summary

| Area                              | Status                          | Notes                                                                                                             |
| --------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Frontend                          | Implemented                     | Public website and authenticated dashboard exist.                                                                 |
| Backend                           | Implemented                     | NestJS modules, validation and business logic exist.                                                              |
| Database                          | Implemented in source           | PostgreSQL schema and migration history are present.                                                              |
| Authentication and access control | Implemented                     | Cookie-based JWT auth and backend role guards are present.                                                        |
| Room and booking management       | Implemented                     | Room types, availability, booking creation and lifecycle operations are present.                                  |
| Payment integration               | Implemented                     | Cash and Razorpay-based online payment flows are present.                                                         |
| Staff and customer management     | Implemented                     | Staff categories and customer management are implemented.                                                         |
| Deployment                        | Production environment reported | The frontend is hosted on Vercel, the API on Render and the database on Supabase, according to the project owner. |

The schema includes a Review model, but the application has no verified review workflow. Production deployment is reported by the project owner; formal acceptance and operational sign-off are still pending.

## 3. Technologies Used

| Area             | Technologies                                   | Use                                          |
| ---------------- | ---------------------------------------------- | -------------------------------------------- |
| Frontend         | React 19, TypeScript                           | Application UI and screen logic              |
| Routing/build    | React Router, Vite                             | Page routing and build pipeline              |
| Styling          | Tailwind CSS, shadcn-style UI patterns         | Interface styling and reusable components    |
| Forms/validation | React Hook Form, Zod                           | Client-side validation                       |
| API state        | TanStack Query, Axios                          | API requests and caching                     |
| Charts/documents | Recharts, PDF rendering utilities              | Dashboard summaries and exportable documents |
| Payments         | Razorpay JS SDK                                | Browser-based payment checkout               |
| Backend          | NestJS 11, TypeScript                          | REST API and business services               |
| Database/ORM     | PostgreSQL, Prisma 7                           | Data model, queries and migrations           |
| Auth/security    | JWT, cookie parser, password hashing utilities | Session and security handling                |
| File storage     | Appwrite Node SDK                              | Profile and document storage                 |
| Email            | Nodemailer                                     | Reset password and notification delivery     |
| Tooling          | pnpm, Docker Compose, Git                      | Workspace scripts and local environment      |

These technologies are used in the project code. Their presence does not confirm that third-party credentials or services are configured in production.

## 4. Features and Modules Developed

### Core features

| Feature                      | Status      | Summary                                                                          |
| ---------------------------- | ----------- | -------------------------------------------------------------------------------- |
| Public hotel website         | Implemented | Landing, about, contact, room-listing and room-detail pages.                     |
| Public room booking          | Implemented | Guests select dates, check availability and proceed through checkout.            |
| Authentication               | Implemented | Registration, login, logout and password reset, with account activation checks.  |
| Role-based dashboard         | Implemented | Dashboard screens are available for admin, manager, staff and customer accounts. |
| Room management              | Implemented | Room and room-type records, occupancy and housekeeping status.                   |
| Booking lifecycle            | Implemented | Pending, confirmed, checked-in, checked-out, cancelled and no-show states.       |
| Payment and invoice flows    | Implemented | Cash/manual payment, online payment verification, invoices and refunds.          |
| Housekeeping                 | Implemented | Room-cleaning task assignment and status tracking.                               |
| Issues and inquiries         | Implemented | Public contact inquiries and hotel issue tracking.                               |
| Notifications and audit logs | Implemented | Users can view notifications; admins can review audit history.                   |
| Profile management           | Implemented | Profile updates and password changes.                                            |

### Module-wise summary

| Module           | Key features                                                | Purpose                              | Status                |
| ---------------- | ----------------------------------------------------------- | ------------------------------------ | --------------------- |
| Authentication   | Register, login, logout, reset password, JWT cookies        | User identity and secure access      | Implemented           |
| Users            | Manager/staff account management                            | Admin-controlled account operations  | Implemented           |
| Staff            | Staff profiles, categories and statuses                     | Manage staff records and assignments | Implemented           |
| Customers        | Customer records and related bookings/payments              | Guest and customer support           | Implemented           |
| Rooms/Room Types | Inventory, pricing, occupancy, status updates               | Hotel room operations                | Implemented           |
| Amenities        | Amenities linked to room types                              | Feature catalog                      | Implemented           |
| Bookings         | Public and authenticated booking creation, status updates   | Reservation lifecycle                | Implemented           |
| Payments         | Cash/manual payment, online order creation and verification | Financial tracking                   | Implemented           |
| Invoices         | Invoice records, updates and cancellation                   | Billing support                      | Implemented           |
| Tasks            | Housekeeping tasks and status progress                      | Cleaning operations                  | Implemented           |
| Issues           | Issue creation, updates and assignment                      | Operational maintenance support      | Implemented           |
| Notifications    | Unread notifications and read state                         | Communication events                 | Implemented           |
| Dashboard        | Summary cards and operational views                         | Management oversight                 | Partially implemented |
| Public site      | Landing, room pages and inquiry form                        | Public experience                    | Implemented           |

## 5. User Roles and Access Control

The database defines four roles: ADMIN, MANAGER, STAFF and CUSTOMER. RECEPTIONIST and HOUSEKEEPER are staff categories, not roles.

### Role matrix

| Module / area      | Admin             | Manager                   | Staff                      | Customer            | Public visitor      |
| ------------------ | ----------------- | ------------------------- | -------------------------- | ------------------- | ------------------- |
| Dashboard          | Full access       | View / operational access | View / operational access  | Own data only       | No access           |
| User accounts      | Full access       | No access                 | No access                  | No access           | No access           |
| Staff records      | Full access       | View / update             | Restricted                 | No access           | No access           |
| Customer records   | Full access       | View / update             | View / restricted          | Own profile only    | No access           |
| Rooms / room types | Full access       | View / update             | View / restricted          | No access           | Public browse only  |
| Bookings           | Full access       | Full access               | Limited operational access | Own bookings only   | Guest checkout      |
| Payments           | Full access       | Full access               | Operational access         | Own payment records | Checkout token flow |
| Invoices           | Full access       | View / update             | View / restricted          | Own invoices only   | No access           |
| Housekeeping tasks | Full access       | Full access               | Assigned tasks only        | No access           | No access           |
| Issues             | Full access       | Full access               | Restricted                 | Own issues only     | No access           |
| Audit logs         | Full access       | Restricted                | Restricted                 | No access           | No access           |
| Notifications      | Own / role scoped | Own / role scoped         | Own / role scoped          | Own / role scoped   | No access           |

### Important restrictions

- The frontend controls which pages appear, but the NestJS AuthGuard and RoleGuard enforce access to protected API routes.
- STAFF permissions can vary by category, including RECEPTIONIST and HOUSEKEEPER.
- Service-layer checks restrict customers to their own booking, payment and issue records.
- Public routes include room browsing and guest checkout; other protected routes require authentication.

## 6. Database Design and Resources

The Prisma schema defines 23 models and 16 enums. The project includes ten migration directories. These describe the database structure and migration history, but do not show which migrations are applied to the production database.

### Key entities

| Entity           | Purpose                                                             |
| ---------------- | ------------------------------------------------------------------- |
| User             | Core account information, role, status and login-related links      |
| Staff            | Staff profile and category information                              |
| Customer         | Customer profile, address and verification references               |
| RoomType         | Room category, pricing, bed configuration and capacity              |
| Room             | Physical room inventory and room state                              |
| Amenity          | Amenity catalog related to room types                               |
| Booking          | Reservation record with customer, dates, status and room allocation |
| BookingRoom      | Link between booking and assigned room                              |
| HousekeepingTask | Cleaning tasks assigned to staff or housekeepers                    |
| Issue            | Hotel issue or maintenance record                                   |
| Invoice          | Billing object linked to booking and payment records                |
| Payment          | Financial record with method, status and references                 |
| Notification     | User-facing message/event data                                      |
| Inquiry          | Public contact form submission                                      |
| AuditLog         | Mutation and operational history                                    |

### Main enums

| Group            | Examples                                                        |
| ---------------- | --------------------------------------------------------------- |
| Roles            | ADMIN, MANAGER, STAFF, CUSTOMER                                 |
| Staff categories | RECEPTIONIST, HOUSEKEEPER, SECURITY_GUARD, WAITER               |
| Room status      | VACANT, RESERVED, OCCUPIED, OUT_OF_ORDER                        |
| Housekeeping     | CLEAN, DIRTY, CLEANING                                          |
| Booking status   | PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, NO_SHOW |
| Payment status   | PENDING, COMPLETED, FAILED, REFUNDED                            |
| Invoice status   | UNPAID, PARTIALLY_PAID, PAID, REFUNDED                          |
| Issue status     | OPEN, IN_PROGRESS, COMPLETED, RESOLVED, CANCELLED               |

Room availability is determined by room status, housekeeping status and overlapping bookings. Payment completion can update a booking, and invoices are linked to bookings and payments.

## 7. Testing and Verification

The project owner reported manual testing with real data. No formal automated test suite was added for this assessment.

| Testing area                    | Result              | Remarks                                                      |
| ------------------------------- | ------------------- | ------------------------------------------------------------ |
| Frontend typecheck              | Passed              | Verified through project build tools.                        |
| Frontend production build       | Passed with warning | Vite reported large chunks; build completed successfully.    |
| Backend build                   | Passed              | Verified through NestJS build process.                       |
| Authentication                  | Passed              | Owner-reported real-data validation.                         |
| Booking workflow                | Passed              | Owner-reported real-data validation.                         |
| Payment workflow                | Passed              | Owner-reported real-data validation, including payment flow. |
| Role-based access               | Passed              | Owner-reported real-data validation.                         |
| Database and integration checks | Passed              | Owner-reported validation.                                   |

The workflow results are based on the project owner's report; no formal test log was available. Build results were verified separately. Deployment details are listed below and have not been independently audited.

## 8. Issues Faced and Solutions

The project files include no issue register or engineering retrospective. The table summarizes implementation concerns visible in the code and the mechanisms used to address them; it does not represent a formal defect history.

| Issue area                | Observed concern                                              | Solution evidenced                                                   |
| ------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Payment reconciliation    | Payment attempts must be matched with gateway events.         | Payment history and gateway event references are stored and checked. |
| Guest checkout continuity | Guests need to continue checkout without a signed-in account. | Public booking and checkout tokens support the guest flow.           |
| Room-state coordination   | Availability depends on booking and housekeeping states.      | Lifecycle helpers update occupancy and housekeeping state together.  |

No formal defect log is available to confirm when these concerns arose or how they were tracked.

## 9. Development Timeline

The project ran from 6 September to 5 November 2026. The milestones below summarize the main development activity; phase-specific details for 6 September to 3 October are not available.

### Timeline summary

| Phase                          | Dates            | Main activity                                                                                     |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| Project period                 | 6 Sep–5 Nov 2026 | Overall project duration.                                                                         |
| Public site and core features  | 4–8 Oct 2026     | Public pages, room and amenity management, authentication, customer records and booking features. |
| Hotel operations               | 9–21 Oct 2026    | Payments, invoices, staff, tasks, issues, profiles, audit logs and dashboard updates.             |
| Booking and payment refinement | 22–31 Oct 2026   | Checkout, Razorpay, guest payment flow, booking lifecycle updates and related tests.              |
| Public and operational updates | 1–5 Nov 2026     | Contact inquiries, booking preferences, public-site refinements and audit/dashboard updates.      |

## 10. Deployment

| Component            | Evidence                                             | Status                                                                      |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Frontend hosting     | Vercel production site                               | URL provided by project owner: https://nivara-hotel.vercel.app              |
| Backend hosting      | Render production API                                | URL provided by project owner: https://nivara-api-5yyb.onrender.com/api/v1/ |
| Local database       | Docker Compose includes PostgreSQL                   | Local setup present                                                         |
| Production database  | Supabase PostgreSQL                                  | Production database reported by project owner                               |
| Production API URL   | https://nivara-api-5yyb.onrender.com/api/v1/         | Provided by project owner; health not independently checked                 |
| Third-party services | Razorpay, Appwrite and SMTP are configured in source | Production credentials and service status are not verified                  |

The project owner reports that the frontend, API and Supabase database are deployed. The URLs and database setup have not been independently checked. Production health, service credentials and formal sign-off still need review.

## 11. Final Deliverables

The project includes the following application features and technical deliverables:

- Public hotel website with rooms, room details and inquiry/contact flow
- Authentication and account management
- Hotel dashboard with operational data views
- Room and room-type management
- Booking lifecycle management
- Cash and online payment processing
- Invoice and billing management
- Housekeeping task management
- Issue tracking and ticket handling
- Notifications and audit history
- Database schema and migration history
- Local dev configuration and deployment configuration artifacts

The project owner also reports these production deployments:

- Frontend: https://nivara-hotel.vercel.app (reported live)
- Backend API: https://nivara-api-5yyb.onrender.com/api/v1/ (reported live)
- Production database: Supabase (reported in use)

The following records are still unavailable:

- Formal acceptance/sign-off documentation
- Final production operations checklist and health validation records
- Complete end-user manual beyond the source-driven documentation in this report

## 12. Overall Project Status

Overall status: Partially Completed.

### Implemented

- Production frontend, backend API and Supabase database, as reported by the project owner
- Public website and room browsing
- Guest and authenticated booking workflow
- Authentication and role-aware backend access
- Room, customer, staff, payment and invoice modules
- Housekeeping, issues and notification modules
- Database model and migration history
- Web and API build verification

### Partially completed or not fully verified

- Dashboard contains operational screens, but some charts and data remain demo- or mock-oriented in the frontend source.
- Production health and uptime checks have not been documented.
- Production credentials and environment settings have not been independently reviewed.
- Formal acceptance and sign-off records are not available.

### Pending or not evidenced

- Final client approval
- Production health checks and uptime records
- Formal release sign-off and handover records

## 13. Future Scope

The following items remain future work:

- Document production setup and add deployment health checks.
- Reduce frontend bundle size and optimize large media assets.
- Expand automated QA coverage for auth, booking and payment flows.
- Document configuration requirements for Razorpay, Appwrite and SMTP.
- Add further business reporting and analytics as needed.
- Review security settings, upload controls and session configuration before operational sign-off.

## 14. Conclusion and Approval / Sign-off

Nivara Hotels includes a public room-booking website and an operations dashboard, backed by a NestJS API and a PostgreSQL database managed with Prisma. The project owner reports that the frontend is hosted on Vercel, the API on Render and the production database on Supabase.

The frontend and backend builds passed build checks, and the project owner reported manual testing with real data. The report does not include formal production health checks or acceptance records. The project therefore remains Partially Completed pending operational review and sign-off.

### Approval / sign-off

| Role                                 | Name         | Signature    | Date         |
| ------------------------------------ | ------------ | ------------ | ------------ |
| Project Developer                    | To be filled | To be filled | To be filled |
| Project Supervisor                   | To be filled | To be filled | To be filled |
| Client / Organization Representative | To be filled | To be filled | To be filled |
