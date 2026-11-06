# Nivara Hotels User Manual

## Table of Contents

1. About This Guide
2. How Nivara Hotels Works
3. Getting Started
4. User Roles and Responsibilities
5. Role-wise Access Guide
6. Dashboard User Guides
7. Navigation and Common Controls
8. Module-wise Instructions
9. Important Hotel Operations
10. Notifications and Emails
11. Profile and Account Management
12. Daily Operating Guide
13. Troubleshooting
14. Important Statuses and Terms
15. Known Limitations

## 1. About This Guide

This guide explains the actual Nivara Hotel application as it is implemented. It is for Admins, Managers, staff, customers and public visitors who browse the site.

It covers login, dashboard use, booking work, room and housekeeping tasks, payments, invoices, issues and profile management. It does not include features that are not verified in the code.

## 2. How Nivara Hotels Works

Nivara has two main parts: a public website and a protected dashboard.

The public website lets guests browse rooms, see details and complete a reservation. The dashboard lets hotel staff and managers work with customers, bookings, rooms, tasks and finance.

| Part                  | Purpose                          |
| --------------------- | -------------------------------- |
| Public website        | Room browsing and public booking |
| Customer booking      | Guest details and checkout       |
| Dashboard             | Staff and manager operations     |
| Rooms and tasks       | Room status and housekeeping     |
| Payments and invoices | Cash and online payment tracking |
| Notifications         | In-app alerts                    |

## 3. Getting Started

### Open the app

Use the deployed web app in a browser. The login page is for registered users. The public pages are available without login.

### Public access

Visitors can open the landing page, room list and room details. They can also contact the hotel and start a public booking.

### Login

1. Open the application.
2. Click Login.
3. Enter email and password.
4. Click Sign in.
5. The app opens the dashboard for the correct role.

### Registration

A new user can create an account on the Register page using full name, email and password. Newly created accounts are treated as customers unless a staff account is created in the system by admin or manager operations.

### Dashboard routing

After login, the app checks role and category:

- Admin and Manager -> Management Dashboard
- Staff + RECEPTIONIST -> Receptionist Dashboard
- Staff + HOUSEKEEPER -> Housekeeper Dashboard
- Customer -> Customer Dashboard

The dashboard content is loaded from protected API endpoints and the menu is filtered to the user’s role and category. This means the menu and page access are only as wide as the backend allows.

### Logout

Select the profile/account menu and logout from the dashboard header.

### Restricted access

If a user tries to open a page without permission, the backend denies it. The UI shows a no-access state or redirects the user.

## 4. User Roles and Responsibilities

| Role                 | Main responsibility                             | Dashboard    |
| -------------------- | ----------------------------------------------- | ------------ |
| ADMIN                | Full property operations access                 | Management   |
| MANAGER              | Daily operations, staff and booking oversight   | Management   |
| STAFF / RECEPTIONIST | Front desk, check-in, payments and booking help | Receptionist |
| STAFF / HOUSEKEEPER  | Room cleaning and task completion               | Housekeeper  |
| CUSTOMER             | Personal booking and payment access             | Customer     |
| Public visitor       | Browse and book rooms without login             | Public site  |

The role and staff category are different. A staff user is `STAFF`, and the category decides whether they are a receptionist or housekeeper.

The current app does not expose a separate role for a generic staff dashboard. Instead, the code decides the dashboard by checking both the user role and the staff category. This is why a receptionist and a housekeeper see different dashboards even though both are `STAFF` users.

## 5. Role-wise Access Guide

| Module             | Admin   | Manager | Receptionist | Housekeeper | Customer | Public          |
| ------------------ | ------- | ------- | ------------ | ----------- | -------- | --------------- |
| Dashboard          | V       | V       | V            | V           | V        | No              |
| Users              | V/C/U/D | No      | No           | No          | No       | No              |
| Staff              | V/C/U/D | V/C/U/D | No           | No          | No       | No              |
| Customers          | V/C/U/D | V/C/U/D | V            | No          | Own only | No              |
| Rooms              | V/C/U/D | V/C/U/D | V            | V           | No       | Public rooms    |
| Bookings           | V/C/U/D | V/C/U/D | V/C/U        | No          | Own only | Public checkout |
| Payments           | V/C/U/D | V/C/U/D | V/C/U        | No          | Own only | No              |
| Invoices           | V/C/U/D | V/C/U/D | V/C/U        | No          | Own only | No              |
| Housekeeping Tasks | V/C/U/D | V/C/U/D | No           | V/U         | No       | No              |
| Issues             | V/C/U/D | V/C/U/D | No           | No          | Own only | No              |
| Notifications      | V       | V       | V            | V           | V        | No              |
| Audit Logs         | V       | No      | No           | No          | No       | No              |
| Profile            | V/U     | V/U     | V/U          | V/U         | V/U      | No              |

V = View, C = Create, U = Update, D = Delete.

## 6. Dashboard User Guides

### 6.1 Admin Dashboard

Shows total rooms, registered customers, staff count, occupancy rate, today’s arrivals, monthly revenue and open issues. It also shows booking status distribution and revenue trend. This is the main operational overview.

### 6.2 Manager Dashboard

Same management dashboard design as Admin, but with a narrower management menu. It focuses on occupancy, arrivals, departures, bookings and operational issues.

### 6.3 Receptionist Dashboard

Displays expected arrivals, expected departures, available rooms and pending payments. It is the main front-desk dashboard for check-in and check-out work.

### 6.4 Housekeeper Dashboard

Shows assigned cleaning tasks, overdue tasks and rooms needing attention. Housekeepers can start a task and mark it complete from the dashboard.

### 6.5 Customer Dashboard

Shows next booking, recent bookings, payment and invoice status, and quick links to browse rooms or create a new booking.

The customer dashboard is designed for personal room and payment follow-up. It is not for staff operations or room assignment tasks.

### 6.6 Other implemented dashboards

The app uses one protected dashboard route with different content based on role. There are no separate dashboard screens beyond the five above.

## 7. Navigation and Common Controls

Common controls in the app:

- Sidebar menu changes by user role.
- Tables have search, filters and pagination.
- Add and edit dialogs are used for staff, rooms and records.
- Detail sheets open from bookings and room entries.
- Booking and task status buttons update records.
- Confirmation dialogs appear before major actions.
- Notifications open from the bell icon.
- Profile menu is used for account actions.

## 8. Module-wise Instructions

### User Management

Admin only. Used to manage account records and user access.

### Staff Management

Admin and Manager. Used for staff records, roles and categories such as RECEPTIONIST and HOUSEKEEPER. Manager access is limited to operations and does not include system user account management.

### Customer Management

Admin, Manager and Receptionist. Used for customer data, guest profiles and booking follow-up.

### Room Management

Admin, Manager and Receptionist can view rooms. Admin and Manager can create and update room records. Housekeepers can view assigned room information.

### Room Type Management

Created and updated by admin and used in room search and booking flows. Public visitors can see room types and prices on the public site.

### Amenity Management

Amenity records are attached to room types and shown on public room pages. Admin manages them.

### Booking Management

Admin, Manager, Receptionist and Customer can access booking records. Receptionists create front-desk bookings; customers see their own bookings.

### Payment Management

Used for cash and online payments. Payment flow is tied to invoice and booking status.

### Invoice Management

Invoices are generated from bookings and show totals, unpaid amounts and payment status. Customers can only see their own invoices.

### Housekeeping Tasks

Assigned work for rooms and clean status. Housekeepers can start and complete tasks.

### Issue Management

Used for service and maintenance tickets. Admin and Manager manage them; Customers can raise issues for their own stay or booking.

### Notifications

Visible from the notification panel. Triggered by bookings, payments, issues and task updates.

### Audit Logs

Visible only to Admin.

### Profile and Uploads

All authenticated users can open Profile. Staff and customers can upload support files where needed.

### Public Website and Inquiries

Public pages include landing, rooms, room detail and contact. Admin and Manager can review inquiry records from the admin area.

This public flow is intentionally separate from the internal dashboard. Guests use it to browse and book, while staff use the dashboard for operational follow-up.

## 9. Important Hotel Operations

1. Browse rooms: open the public rooms page and select dates and guests.
2. Check availability: only rooms that match guest count and remain clean and active appear.
3. Public booking: choose a room, enter guest details, select payment and confirm.
4. Receptionist walk-in booking: use New Booking, select customer, room and stay dates, then save.
5. Enter customer details: add guest and contact information before saving booking records.
6. Cash payment: record cash payment against the booking or invoice.
7. Online payment: complete the payment flow. A booking stays `PENDING` until payment is successful.
8. Confirm booking: update status after payment or desk approval.
9. Check in: open the booking and move it to `CHECKED_IN`.
10. Check out: close booking and release the room.
11. Generate invoice: open the booking or invoice section and review amounts.
12. Assign housekeeping task: open task flow, choose room and assign to housekeeper.
13. Complete housekeeping task: start and mark task as complete.
14. Report issue: create an issue with category, priority and assignment.

Important rule: failed or unconfirmed online payment does not create a confirmed booking.

## 10. Notifications and Emails

Notifications are shown in the bell icon menu. Typical events include booking confirmation, payment received, issue updates and housekeeping assignment.

The notifications are role-specific. A customer does not receive manager-level alerts, and a housekeeper does not see room finance or audit data. In practice, the app limits the notification feed to the current user and the relevant operation type.

Email is implemented for password reset and public contact messages. Reset password emails are sent to the user. Public contact or inquiry messages are emailed to the configured hotel email address.

## 11. Profile and Account Management

Users can update their profile, review account details and reset passwords. Staff and customers can upload support images when needed. Public visitors do not access the protected profile area.

## 12. Daily Operating Guide

- Admin: review occupancy, revenue, arrivals and open issues.
- Manager: check operational activity, tasks and guest movement.
- Receptionist: review arrivals, departures, room status and payment follow-up.
- Housekeeper: review daily tasks, room readiness and completion status.
- Customer: review upcoming bookings, invoices and payment status.

A good daily habit is to review the dashboard before the shift begins, then move into the exact module needed for the task at hand. This keeps room readiness, bookings and payment follow-up aligned with the day’s operations.

## 13. Troubleshooting

| Problem          | Check                      | Action                                      |
| ---------------- | -------------------------- | ------------------------------------------- |
| Login fails      | Email/password             | Reset password or verify account            |
| Missing page     | Role/category              | Confirm the user has correct access         |
| Booking issue    | Dates/room count           | Recheck room availability                   |
| Payment issue    | Payment and invoice status | Confirm online or cash completion           |
| Room unavailable | Occupancy/cleaning status  | Choose another room or resolve status       |
| Task stuck       | Task assignment            | Confirm the correct housekeeper is assigned |

## 14. Important Statuses and Terms

| Area           | Values                                                                      | Meaning                 |
| -------------- | --------------------------------------------------------------------------- | ----------------------- |
| Booking        | `PENDING`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`, `CANCELLED`, `NO_SHOW` | Guest stay status       |
| Payment method | `CASH`, `ONLINE`                                                            | How payment is made     |
| Payment        | `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`                                | Payment state           |
| Invoice        | `UNPAID`, `PARTIALLY_PAID`, `PAID`, `REFUNDED`                              | Invoice state           |
| Occupancy      | `VACANT`, `RESERVED`, `OCCUPIED`, `OUT_OF_ORDER`                            | Room condition          |
| Housekeeping   | `CLEAN`, `DIRTY`, `CLEANING`                                                | Room cleaning state     |
| Task           | `PENDING`, `IN_PROGRESS`, `COMPLETED`                                       | Housekeeping task state |
| Issue          | `OPEN`, `IN_PROGRESS`, `COMPLETED`, `RESOLVED`, `CANCELLED`                 | Service issue state     |
| Priority       | `LOW`, `MEDIUM`, `HIGH`, `URGENT`                                           | Issue urgency           |

## 15. Known Limitations

- Some screens may contain sample data in the frontend code or local feature examples.
- The current app supports the implemented roles and categories, but not every feature is visible in every menu.
- Email delivery depends on SMTP configuration.
- If payment is not successful, the booking remains pending and must not be treated as confirmed.

This guide is meant to help users work with Nivara clearly and safely.
