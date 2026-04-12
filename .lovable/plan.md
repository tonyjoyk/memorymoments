

## Memory Moments — Revised Plan

Taking design cues from your HTML mood board while building a proper React app with better UX decisions.

### Design System (from the HTML)

**Palette:**
- Background: `#0d0d0d`, Surface: `#161616` / `#1e1e1e`
- Borders: `#252525` / `#303030`, Text: `#f0f0f0`, Muted: `#888`, Dim: `#555`
- Golden (Joy): `#F5C842`, dim `#a8861e`, bg `#1e1800`
- Blue (Growth): `#4A90D9`, dim `#2d5a8a`, bg `#071525`
- Amber (Courage): `#E8823A`, dim `#a0511a`, bg `#180c00`
- Green (Peace): `#5BAD72`, dim `#2d6e40`, bg `#061209`

**Typography:** DM Serif Display for display/headings, DM Sans for body. Sizes: display 38px, heading 26px, heading-sm 20px, body 14px, labels 10px uppercase tracked.

**Radii:** 16px default, 10px small, 999px pills.

### Screens (7 total — adding Reflection from the HTML)

1. **Splash** — "Memory Moments" in DM Serif Display, tagline, four animated overlapping emotion orbs, "Get started" pill button
2. **Home (Memory List)** — Header with heading + subtitle, memory cards with left color bar, emotion dots and labels, quarter + status badge. FAB to add. Bottom nav (Memories / Timeline)
3. **Emotion Picker** — 2x2 grid of emotion cards with orbs, multi-select with colored border + tinted background when selected. "You can mix feelings" hint. Continue button disabled until selection
4. **Add Memory Form** — Emotion tag at top, quarter select, title input, why textarea, miss textarea, action steps with add-a-step button, Save/Cancel pills
5. **Memory Detail** — Emotion-tinted hero area (not full-color background — the HTML's approach of a subtle tint is more readable and I'll follow that). Shows all fields, checkable actions. Planned memories get "This happened" CTA leading to Reflection. Past memories show a reflection block
6. **Timeline** — Quarter-by-quarter list view with dot indicators (filled = past, outline = planned). View toggle to switch to Scatter/Bubble view. Legend row. Bottom nav
7. **Reflection** — Opened from "This happened" on a planned memory. Shows the memory name, lets user re-select emotion, write a one-line reflection. Saves and marks memory as past

### What I'm taking from the HTML

- Color palette exactly as defined (the emotion colors, surfaces, borders, text hierarchy)
- Typography pairing (DM Serif Display + DM Sans) and sizing hierarchy
- Memory card design with the thin left color bar
- Emotion picker card style with tinted background on selection
- Timeline list item format with colored dots
- Bubble/scatter view with filter chips
- The reflection flow after "This happened"
- Toast notifications for feedback
- Slide transitions between screens

### Where I'm improving over the HTML

- **Detail card background:** The HTML uses a very subtle tint rather than full emotion color. I'll keep this — full-color backgrounds hurt readability. The hero gets a gentle color wash, the rest stays dark
- **Navigation:** Proper React Router with animated transitions, not DOM manipulation. Clean back-button behavior
- **Form UX:** Better touch targets, proper focus states, validation feedback
- **Spacing:** More generous vertical rhythm, especially between form fields and in the detail view
- **Empty states:** Thoughtful empty state for the memory list (not just text)
- **Bottom nav:** Only on Home and Timeline screens — not on sub-screens where a back button is more appropriate
- **Mobile frame:** The app fills the viewport naturally rather than being locked to 390x844

### Architecture

- **State:** React context with `useReducer` for memories, persisted to `localStorage`
- **Routing:** React Router with 7 routes: `/`, `/memories`, `/emotions`, `/add`, `/memory/:id`, `/timeline`, `/reflect/:id`
- **Components:** ~15 files total: 7 screen components, shared components (EmotionOrb, MemoryCard, ActionItem, BottomNav, NavBar, EmotionTag), context provider, constants
- **Fonts:** Import DM Serif Display + DM Sans via Google Fonts in `index.html`
- **CSS:** Tailwind with custom CSS variables for the emotion palette in `index.css`. Custom keyframes for orb animations

### Sample Data

5 pre-loaded memories matching the HTML's data (Netherlands trip, One year in Goa, Solo trek in Coorg, Ship Memory Moments, Sunrise at Palolem) — mix of planned and past, various emotions.

### File Structure

```text
src/
  contexts/MemoryContext.tsx      — state + reducer + localStorage
  lib/constants.ts                — colors, quarters, emotion config
  components/
    NavBar.tsx                    — back button + title
    BottomNav.tsx                 — Memories / Timeline tabs
    EmotionOrb.tsx                — radial gradient circle
    EmotionTag.tsx                — pill with dot + label
    MemoryCard.tsx                — list card with color bar
    ActionItem.tsx                — checkable action row
  pages/
    SplashScreen.tsx
    HomeScreen.tsx
    EmotionPickerScreen.tsx
    AddMemoryScreen.tsx
    MemoryDetailScreen.tsx
    TimelineScreen.tsx
    ReflectionScreen.tsx
```

