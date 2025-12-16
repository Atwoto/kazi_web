# Kazi Website Development Plan

## 1. Technology Stack
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Library:** Shadcn UI (for accessible, consistent components)
*   **Icons:** Lucide React
*   **Forms & Validation:** React Hook Form + Zod
*   **Fonts:** 
    *   Headings: **Quicksand** (Bold/Semibold)
    *   Body: **Satoshi** (via Fontshare or local asset)

## 2. Visual Style & Rules (Based on Screenshots)
*   **Primary Color:** Electric Blue (approx. `#2563EB` to `#1D4ED8`)
*   **Backgrounds:** Predominantly White (`#FFFFFF`) with very light gray sections (`#F8F9FA` or similar) for contrast.
*   **Card Style:** White cards on light backgrounds, `rounded-xl` or `rounded-2xl`, with soft, large-spread shadows.
*   **Buttons:** Fully rounded "pill" shapes.
*   **Typography:**
    *   H1/H2/H3: Quicksand (Bold).
    *   Body: Satoshi (Clean sans-serif).

## 3. Site Structure (12+ Pages)
### Core Pages
1.  **Home:** 
    *   Hero (Headline: "Work delivered, without the freelance hassle").
    *   Service Tiles (6 distinct tiles).
    *   How it Works (4-step process).
    *   Trust/Testimonials/Client Stories.
2.  **Services Hub:** Overview list of all services.
3.  **Portfolio:** Grid layout, filterable by service type.
4.  **Pricing:** Simple cards + specific "Academic Support" tiers.
5.  **FAQ:** Accordion questions (General, Process, Payments, etc.).
6.  **Contact / Request a Quote:** 
    *   Specific Split-screen design (Left: Value Props, Right: Multi-step Form).
7.  **Work with Us:** Freelancer application form.
8.  **Legal:** Privacy Policy, Terms of Service, Cookies.

### Individual Service Pages (x6)
Each page will follow a consistent template:
*   **Hero:** Service Name, One-liner, CTA.
*   **Deliverables:** Bullet list of what is included.
*   **Examples:** Specific portfolio highlights for that service.
*   **Process:** Step-by-step for that specific service.
*   **Services:**
    1.  Video Editing
    2.  Photo Editing
    3.  Web Design & Development
    4.  Graphic Design
    5.  AI Services
    6.  Academic Support

## 4. Key Features
*   **Navigation:** Sticky navbar with a "Services" dropdown menu.
*   **Communication:** Floating WhatsApp button & "AI Assistant" (mock) on all pages.
*   **Forms:** 
    *   Complex Quote Form (File uploads, Budget ranges).
    *   Application Form (Skills, Portfolio links).
*   **Responsiveness:** Mobile-first, fully responsive design.

## 5. Execution Steps
1.  **Setup:** Initialize Next.js project, configure Tailwind colors/fonts.
2.  **Components:** Build reusable UI atoms (Buttons, Cards, Inputs) using Shadcn.
3.  **Layout:** Create the global Shell (Navbar, Footer).
4.  **Pages:** Implement pages one by one, starting with Home.
5.  **Polish:** Check against screenshots for visual fidelity.
