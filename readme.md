# Fix Cleaner — V2 Prototype

This folder is the current V2 frontend prototype.

## Included
- Home
- Products: Floor Cleaner + Bathroom Cleaner
- How to Use
- FAQ
- Contact
- Safety
- Checkout prototype
- Shared localStorage cart
- Responsive mobile navigation
- Responsive cart drawer
- Smooth scrolling and lightweight UI animations

## Part 1
- Removed the "Discover Fix" homepage option.
- Replaced the homepage "Why Fix?" section with a "How to Use" section.
- Removed all `why-use.html` references.

## Part 2
- Cart count is synchronized across pages.
- Homepage cart now opens the cart drawer.
- How to Use cart now opens the cart drawer.
- Cart drawer is available consistently across the site.
- Cart uses `localStorage` key `fixCart`.
- Cross-tab cart changes are synchronized.
- No real payment, delivery API, database, or order backend is included.

## Part 3
- Added mobile navigation menu below 900px.
- Improved mobile touch targets and product purchase layout.
- Added horizontal-overflow protection.
- Added smooth scrolling and responsive image handling.
- Preserved the existing visual direction and product content.

## Prototype note
Contact submission and checkout/payment are intentionally frontend-only for now. They can be connected to a scalable backend/payment stack later without changing the core product UI.
