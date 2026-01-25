# Kazi Citas 3D Landing Page Prompt for Lovable AI

## Objective
Create a stunning, interactive 3D landing page component for a product called **"Kazi Citas"**. This page will serve as a promotional intro/landing page hosted on the Kazi Agency website. The user wants a "Pixar animation intro" vibe—playful, high-quality, and character-driven (even if the characters are letters).

## Core Requirements

### 1. Visual Style & Vibe
-   **Theme:** "Pixar-inspired." Think playful physics, bounce, vibrant lighting, and smooth motion.
-   **Color Palette:** Use the Kazi Agency brand colors (if known) or a vibrant, modern palette (Deep Purples, Neon Blues, or Warm Oranges) that signifies a "movement."
-   **3D Environment:** Clean, minimal background that makes the 3D typography pop. Soft shadows, ambient occlusion.

### 2. Animation Sequence (The "Pixar" Intro)
1.  **Initial State:** The scene is empty or has a spotlight waiting.
2.  **The Entrance:** The words **"KAZI CITAS"** do not just fade in. They should arrive with personality.
    -   *Idea:* The letters fall from the top, bouncing off each other (physics-based).
    -   *Alternative:* A "mascot" object (like a ball or abstract shape) jumps onto the screen and "paints" the letters or knocks them into place (homage to the Luxo Jr. lamp).
3.  **The "Fill":** The 3D text should momentarily grow or move close to the camera, filling the visual field, creating a sense of scale and importance.
4.  **The Settle:** The text settles into a readable position.
5.  **The CTA Reveal:** Once the excitement settles, a smooth UI overlay appears:
    -   **Headline:** "Are you ready to join the movement?"
    -   **Button:** A pulsing, attractive button saying "Join the Movement" or "Visit Kazi Citas".

### 3. Technical Stack
-   **Framework:** React (Next.js compatible).
-   **3D Library:** **React Three Fiber (R3F)** is preferred for the best performance and React integration.
-   **Helpers:** `@react-three/drei` (for Text3D, Float, Stage, Physics if needed).
-   **Animations:** `framer-motion` for the 2D UI overlay (CTA buttons/text).

## Detailed Prompt to Copy/Paste into Lovable AI

```markdown
Build a React component using React Three Fiber and Framer Motion that acts as a 3D animated landing page intro for "Kazi Citas".

**Scene Setup:**
- Use a Canvas from @react-three/fiber.
- Add soft studio lighting (AmbientLight + SpotLight with shadows).
- Use <Text3D> from @react-three/drei for the words "KAZI CITAS". Use a bold, rounded font json.

**Animation Logic (Pixar Vibe):**
- I want the letters to feel alive.
- **Phase 1 (Entrance):** The letters should drop in one by one with a "bounce" effect (using react-spring or simple physics). They should squash and stretch slightly on impact if possible, or just have a bouncy spring config.
- **Phase 2 (The Focus):** After landing, the camera should zoom in slightly or the text should float gently.
- **Phase 3 (CTA):** After 2-3 seconds of the 3D intro, fade in a 2D HTML overlay (using Framer Motion) on top of the canvas.
- **Overlay Content:**
  - H1: "Are you ready to join the movement?"
  - Button: A styled "Get Started" button that hovers with a glow effect.

**Design Details:**
- Text Color: A glossy, metallic material or a vibrant matte finish.
- Background: A subtle gradient or deep color to make the 3D text pop.
- Make it fully responsive (scale text based on screen width).

**Code Structure:**
- Provide a single file or a main component `KaziCitasIntro.tsx`.
- Handle the loading state (suspense) gracefully.
```**Design Refinement:**
- Use Manjari for the main text and Montserrat for the CTA text.
- Apply a white color to the text with a subtle blue glow effect.
- Use a black background for contrast.
- Ensure all animations are smooth and professional, avoiding any game-like elements.
design with our brand fonts (Manjari/Montserrat) and color scheme (White, Vivid Blue, Black), and make it more professional/less game-like by refining materials and animations