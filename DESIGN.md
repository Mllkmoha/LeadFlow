# LeadFlow — The Deal Ledger

**Design specification · version 1.0**

| | |
|---|---|
| Status | Approved visual direction; specification only. Not implemented. |
| Scope | Visual identity, tokens, components, page plans, responsive behavior, review checklist. |
| Out of scope | Application code, backend behavior, new features, dependency changes, font installation. |
| Source of truth | `MY-BRIEF.md`, the existing routes and components, and the approved direction in this document. |
| Audience | Freelancers, independent professionals, and small businesses managing real customer relationships. |

This document describes how LeadFlow should look and behave. It does not change any source file. Fonts are named but **not installed or imported**. No feature described here requires new backend functionality.

---

## 1. Design thesis

LeadFlow is a working record, not a dashboard demo.

The interface should feel like a well-kept sales ledger: a place where a professional writes down who they met, what was said, what happens next, and what stage the relationship has reached. It should be precise enough to trust with a business, warm enough to use every day, and distinctive enough that a screenshot is recognisable as LeadFlow.

The design borrows its structure from physical accounting and sales records:

- **Ruled lines** separate records; they are not decoration.
- **A margin rule** aligns annotations and secondary information.
- **A folio header** names the page and states what it contains.
- **A stage stamp** records where a contact stands.
- **Tabular figures** keep dates, counts, and money aligned.
- **Paper and ink** replace gradients and glass.

The result should read as *editorial*, not *antique*. No faux leather, no sepia filters, no distressed textures, no skeuomorphic binder rings. The ledger is a metaphor for order, not a costume.

### What this direction is not

- Not a warm-cream lifestyle brand.
- Not a vintage newspaper.
- Not a generic SaaS dashboard with a serif font.
- Not a dark "command center" with neon accents.
- Not a collection of rounded cards.

The identity comes from the **structure of a ledger** and the **Deal Stage Stamp**, not from the palette alone.

---

## 2. Non-negotiable rules

1. **No purple or violet** anywhere in the brand, UI, charts, avatars, or marketing.
2. **No gradient backgrounds, gradient text, gradient buttons, or gradient avatars.**
3. **No blurred decorative blobs, glow fields, or glassmorphism.**
4. **No generic stat-card wall.** Numbers are presented as ledger entries, summary lines, or register rows.
5. **No excessive rounding.** Default radius is 0–4px. Pills are not a default shape.
6. **No decorative element without a product purpose.** Every rule, mark, and label must encode structure or state.
7. **No all-caps labels** except the Deal Stage Stamp, where uppercase is part of the stamp artifact.
8. **No tiny uppercase eyebrow above every heading.** Page titles stand on their own.
9. **No middot meta strings** (`A · B · C`). Use labelled columns, a rule, or separate lines.
10. **No arrow appended to every link or button.** Arrows are reserved for directional navigation.
11. **No shadows on cards or panels.** Elevation is reserved for overlays that must sit above the page.
12. **No decorative motion.** Motion answers an action or explains a change.

---

## 3. Color system

### 3.1 Principles

- The page is **paper**; content is **ink**.
- Oxblood is the single brand accent. It marks primary actions, the active navigation item, and the ledger margin rule.
- Brass is a **structural accent only**: hairlines, stamp details, small marks. It is never body text because it does not meet text contrast on paper.
- Stage colours are semantic and are always paired with the stage word. Colour is never the only signal.
- Dark mode is **warm charcoal**, not blue-black and not pure black. It preserves the paper-and-ink relationship.

### 3.2 Light tokens

| Token | Hex | Role | Contrast on `--paper` |
|---|---|---|---|
| `--paper` | `#F7F3EA` | Page background | — |
| `--paper-raised` | `#FBF8F1` | Panels, table surface, form surface | — |
| `--paper-sunken` | `#EFE9DC` | Table headers, wells, hover fill | — |
| `--ink` | `#1B1A17` | Primary text | 15.71:1 |
| `--ink-muted` | `#5C574E` | Secondary text, descriptions | 6.48:1 |
| `--ink-subtle` | `#6E685C` | Metadata, placeholders, captions | 4.99:1 |
| `--rule` | `#D8D0BF` | Default 1px borders and row rules | — |
| `--rule-strong` | `#B9AF9A` | Section rules, input borders, folio rules | — |
| `--accent` | `#7A2E2E` | Primary action, active nav, margin rule | 8.40:1 |
| `--accent-hover` | `#632323` | Primary hover | — |
| `--accent-contrast` | `#FFF9EF` | Text on accent | 8.88:1 on accent |
| `--brass` | `#B08D57` | Hairlines, stamp detail, small marks | Decorative only |
| `--success` | `#2F5D50` | Converted, completed, positive state | 6.77:1 |
| `--success-tint` | `#E3EDE7` | Success background | 6.26:1 with success |
| `--warning` | `#7A4E0E` | Due soon, attention | 6.49:1 |
| `--warning-tint` | `#F6E8C8` | Warning background | 5.92:1 with warning |
| `--danger` | `#A3231F` | Errors, overdue, destructive | 6.73:1 |
| `--danger-tint` | `#F7E0DC` | Error background | 5.91:1 with danger |
| `--focus` | `#2F4A5A` | Focus ring | 8.44:1 |
| `--selection` | `#E8D9B8` | Text selection | — |

### 3.3 Dark tokens

| Token | Hex | Role | Contrast on `--paper` |
|---|---|---|---|
| `--paper` | `#171614` | Page background | — |
| `--paper-raised` | `#1F1D1A` | Panels, table surface, form surface | — |
| `--paper-sunken` | `#121110` | Table headers, wells, hover fill | — |
| `--ink` | `#F2EDE3` | Primary text | 15.50:1 |
| `--ink-muted` | `#B7AFA1` | Secondary text | 8.32:1 |
| `--ink-subtle` | `#948B7D` | Metadata, placeholders | 5.38:1 |
| `--rule` | `#3A352E` | Default borders and row rules | — |
| `--rule-strong` | `#554E43` | Section rules, input borders | — |
| `--accent` | `#D08A7E` | Accent text and icons | 6.56:1 |
| `--accent-solid` | `#8E3A36` | Solid primary button background | — |
| `--accent-contrast` | `#FFF6EC` | Text on `--accent-solid` | 6.99:1 |
| `--brass` | `#C9A86F` | Hairlines, stamp detail | Decorative only |
| `--success` | `#7FBFAA` | Converted, completed | 8.56:1 |
| `--success-tint` | `#172722` | Success background | 7.36:1 with success |
| `--warning` | `#E0B15E` | Due soon, attention | 9.14:1 |
| `--warning-tint` | `#2E2410` | Warning background | 7.72:1 with warning |
| `--danger` | `#E58A80` | Errors, overdue, destructive | 7.13:1 |
| `--danger-tint` | `#301B19` | Error background | 6.39:1 with danger |
| `--focus` | `#9EC5D6` | Focus ring | 9.83:1 |
| `--selection` | `#3A2F22` | Text selection | — |

### 3.4 Stage tokens

These are the only colours allowed for pipeline stage. They are used by the Deal Stage Stamp and by stage summary rows.

| Stage | Light text | Light tint | Dark text | Dark tint |
|---|---|---|---|---|
| New | `#3E5C6B` | `#E8EEF0` | `#8FB3C2` | `#1E2A30` |
| Contacted | `#7A6226` | `#F0E9D8` | `#D4B878` | `#2C2718` |
| Interested | `#9A4E22` | `#F3E3D8` | `#E09A6A` | `#2E2118` |
| Converted | `#2F5D50` | `#E3EDE7` | `#7FBFAA` | `#172722` |

All stage text/tint pairs meet 4.5:1 or better for normal text. Stage colours are always accompanied by the stage word.

### 3.5 Colour usage rules

- **Primary action:** `--accent` background, `--accent-contrast` text. One primary action per view region.
- **Secondary action:** transparent or `--paper-raised`, 1px `--rule-strong`, `--ink` text.
- **Destructive action:** `--danger` text and border; solid `--danger` only in the final confirmation.
- **Links:** `--ink` with a 1px underline offset; hover uses `--accent`.
- **Focus:** dual ring — 2px `--paper` offset, then 2px `--focus`. This works on paper, ink, and accent surfaces.
- **Borders:** 1px `--rule` for rows and inputs; 1px `--rule-strong` for section boundaries; 2px `--accent` for the active nav rule and the ledger margin.
- **Tints:** stage, success, warning, and danger tints are backgrounds only; never use them as text colours.
- **Charts:** use stage colours, `--ink`, and `--rule`; no rainbow palettes.

### 3.6 What replaces the current palette

| Current | New |
|---|---|
| Neutral OKLCH greys | Warm paper and ink |
| Near-black `--primary` | Oxblood `--accent` |
| Violet/fuchsia gradients | Removed entirely |
| Grayscale charts | Stage-colour ledger bars |
| Gradient avatars | Ink monograms on `--paper-sunken` |
| Blue/amber/violet/emerald status maps | Four stage tokens + the stamp |

---

## 4. Typography

### 4.1 Families and roles

| Role | Family | Weights | Notes |
|---|---|---|---|
| Editorial headings | **Fraunces** | 500, 600 | Page titles, section titles, landing and login display. Use the optical size axis if available. No italic accent words. |
| Application UI and body | **IBM Plex Sans** | 400, 500, 600 | Labels, body copy, navigation, buttons, tables. |
| Numbers, dates, tabular data | **IBM Plex Mono** | 400, 500 | Counts, dates, amounts, timestamps, stamp text, pagination. Always `font-variant-numeric: tabular-nums`. |

Approved alternate: **Newsreader** may replace Fraunces for headings if the owner prefers a quieter, more journal-like voice. Do not use both.

Do **not** import these fonts yet. Until implementation, Geist remains in the codebase. The implementation step must load the chosen families through `next/font` or self-hosted files and remove Geist.

### 4.2 Type scale

| Token | Size / line height | Family | Weight | Use |
|---|---|---|---|---|
| `display-xl` | 56 / 60 desktop; 40 / 44 mobile | Fraunces | 500 | Landing hero only |
| `display-l` | 40 / 46 desktop; 32 / 38 mobile | Fraunces | 500 | Login statement, major marketing sections |
| `page-title` | 32 / 38 desktop; 26 / 32 mobile | Fraunces | 500 | Page titles |
| `section-title` | 22 / 28 | Fraunces | 500 | Section headings inside pages |
| `panel-title` | 17 / 24 | IBM Plex Sans | 600 | Card and panel titles |
| `body` | 16 / 26 | IBM Plex Sans | 400 | Default body |
| `body-small` | 14 / 22 | IBM Plex Sans | 400 | Table cells, secondary copy |
| `label` | 13 / 18 | IBM Plex Sans | 500 | Form labels, table headers |
| `caption` | 12 / 18 | IBM Plex Sans | 400 | Helper text, metadata |
| `data-l` | 28 / 32 | IBM Plex Mono | 500 | Summary numbers |
| `data-m` | 16 / 22 | IBM Plex Mono | 500 | Counts, dates in rows |
| `data-s` | 13 / 18 | IBM Plex Mono | 400 | Timestamps, pagination, small counts |
| `stamp` | 11 / 12 | IBM Plex Mono | 600 | Deal Stage Stamp only |

### 4.3 Typographic rules

- **Line length:** 60–75 characters for prose. Never let a paragraph run the full width of a wide table.
- **Headings:** sentence case. No all-caps, no letter-spaced eyebrows, no gradient text.
- **Numbers:** tabular everywhere, including dates in tables and counts in navigation.
- **Dates:** `12 Nov 2026` (day, abbreviated month, year). Short dates in dense rows: `12 Nov`.
- **Names:** Fraunces is reserved for page-level and record-level names; table rows use Plex Sans 500 for scannability.
- **Emphasis:** use weight, not colour, for emphasis inside a sentence. Reserve oxblood for actions and the margin rule.
- **Truncation:** names and companies truncate with an ellipsis; emails wrap at `@` only when necessary, otherwise truncate. Never let a long email force horizontal scroll.
- **Uppercase:** only the Deal Stage Stamp. Nothing else.

---

## 5. Space, grid, shape, elevation

### 5.1 Spacing scale

`4, 8, 12, 16, 24, 32, 48, 64, 96` px.

- Page padding: 16px mobile, 24px tablet, 32px desktop.
- Section gap: 32px desktop, 24px tablet, 20px mobile.
- Row padding: 12px vertical mobile, 14–16px desktop.
- Form field gap: 16px; field group gap: 24px.
- Button height: 44px mobile, 40px desktop. Small: 32px.

### 5.2 Layout grid

- **1440px:** full shell with 240px sidebar and a content area capped at 1280px. 12-column grid, 24px gutters.
- **768px:** 72px icon rail; content uses 8 columns, 16px gutters.
- **375px:** single column, 16px page padding, bottom navigation.

The ledger sheet is the primary layout metaphor:

```
┌──────────────────────────────────────────────────────────────┐
│  FOLIO HEADER                                                │
│  Page title                                   [primary action]│
│  description                                                 │
├──────────────────────────────────────────────────────────────┤
│  filters / summary line                                      │
├──────┬───────────────────────────────────────────────────────┤
│ date │  record row                                           │
│      │  record row                                           │
│      │  record row                                           │
└──────┴───────────────────────────────────────────────────────┘
```

The left gutter is the **margin rule**. It holds dates, row numbers where the content is genuinely sequential, or status marks. It is never decorative.

### 5.3 Radius scale

| Token | Value | Use |
|---|---|---|
| `radius-0` | 0 | Tables, folio sections, rules, full-bleed bands |
| `radius-sm` | 2px | Deal Stage Stamp, tags, small controls |
| `radius-md` | 4px | Buttons, inputs, panels, dialogs |
| `radius-lg` | 6px | Maximum for large overlays |

Do not use 12px, 16px, or fully rounded cards. Pills are reserved for the status filter control only if a segmented control cannot be used; prefer the segmented control.

### 5.4 Elevation

- **Page:** no shadows.
- **Rows and panels:** 1px rules only.
- **Dropdowns and dialogs:** one functional shadow, `0 8px 24px rgb(27 26 23 / 0.12)`, plus a 1px `--rule-strong`. No blur, no glow.
- **Drag overlay:** one functional shadow, `0 12px 28px rgb(27 26 23 / 0.16)`, and a 2° rotation. The rotation is the stamp metaphor, not decoration.

### 5.5 Density

The default is **comfortable**, not airy.

- Contacts: 56–64px rows.
- Activities: 64–72px rows.
- Pipeline cards: compact, 12–16px padding.
- Forms: 40–44px controls with 16px gaps.

The page should feel like a well-filled page, not a landing page with data in it.

---

## 6. Component specification

### 6.1 Sidebar (desktop and tablet)

**Desktop, 1024px and up — 240px wide**

- Surface: `--paper-raised`; right border: 1px `--rule`.
- Brand block: 64px tall, 24px horizontal padding, bottom rule. Use the existing icon at 28px, the wordmark in Fraunces 20px, and the existing subtitle “Customer relationships” in Plex Sans 12px `--ink-muted`. No rounded tile behind the icon; the icon sits on paper.
- Navigation: vertical list, 4px gap, no pills.
  - Item height: 40px; 12px horizontal padding.
  - Icon: 18px, `--ink-muted`; label: Plex Sans 500 14px.
  - Default: transparent, `--ink-muted`.
  - Hover: `--paper-sunken`, `--ink`.
  - Active: `--paper-sunken`, `--ink`, and a 2px `--accent` rule on the left edge. The icon becomes `--accent`. No shadow, no rounded background.
  - Focus: dual ring inset so it does not collide with the left rule.
- Footer: 1px top rule, 16px padding, “LeadFlow CRM” in Plex Mono 11px `--ink-subtle`. Optionally the current year in the same line. Do not invent account metadata.

**Tablet, 768–1023px — 72px icon rail**

- Same surface and right rule.
- Brand: icon only, 32px, centred; `aria-label="LeadFlow dashboard"`.
- Items: 44px square, icon 20px, centred. Label is visually hidden but available to assistive technology; show a tooltip on hover/focus.
- Active: 2px `--accent` left rule and `--paper-sunken`.
- Footer: omit the wordmark; keep a small brass hairline.

**Mobile, below 768px**

- Sidebar is hidden. Use the bottom navigation.

### 6.2 Mobile navigation

- Fixed bottom bar, 56px + safe-area inset, `--paper-raised`, 1px top rule.
- Five items: Dashboard, Contacts, Pipeline, Activities, Settings.
- Each item: 20px icon, 11px Plex Sans 500 label, 44px minimum touch target.
- Default: `--ink-muted`. Active: `--accent` icon and label, plus a 2px `--accent` rule on the top edge of the item.
- No floating pill, no raised centre button, no shadow.
- The bar must not cover content: the dashboard shell adds bottom padding equal to the bar height plus safe area.

### 6.3 Header and page titles

- Height: 64px desktop, 56px mobile.
- Surface: `--paper`; bottom border: 1px `--rule-strong`. No backdrop blur.
- Left side:
  - Breadcrumb: 12px Plex Sans, `--ink-muted`; “Home / Contacts”. The current page is `--ink`. Separator is a thin `/`, not a chevron.
  - Page title: Fraunces 500, `page-title`, `--ink`.
  - Description: 14px Plex Sans, `--ink-muted`, one line, hidden on mobile if space is tight.
- Right side:
  - Search control: 40px high, 1px `--rule-strong`, `radius-md`, `--paper-raised`, search icon 16px, “Search” in 14px `--ink-muted`, and `Ctrl K` in Plex Mono 10px inside a 1px `--rule` box. No rounded pill.
  - Theme toggle: 40px square, 1px rule, sun/moon icon. Same focus treatment.
  - Account menu: 40px square with a monogram or user icon; dropdown described in §6.9.
- Page titles are not duplicated inside the content. The header owns the page title; the content begins with the summary line or toolbar.

### 6.4 Buttons

| Variant | Background | Border | Text | Hover | Active |
|---|---|---|---|---|---|
| Primary | `--accent` | none | `--accent-contrast` | `--accent-hover` | translateY(1px) |
| Secondary | transparent | 1px `--rule-strong` | `--ink` | `--paper-sunken` | translateY(1px) |
| Ghost | transparent | none | `--ink-muted` | `--paper-sunken`, `--ink` | translateY(1px) |
| Destructive | transparent | 1px `--danger` at 40% | `--danger` | `--danger-tint` | translateY(1px) |
| Destructive solid | `--danger` | none | `--accent-contrast` | darken 8% | translateY(1px) |

- Radius: `radius-md` (4px). No pills.
- Height: 44px mobile, 40px desktop; small 32px; large 48px for the landing hero only.
- Padding: 16px horizontal; icon gap 8px.
- Font: Plex Sans 600 14px.
- Icons: 16px, stroke 1.75. Icons are functional, not decorative.
- Disabled: 50% opacity, no hover, `cursor: not-allowed`.
- Loading: replace the label with a 16px spinner plus a present-tense verb (“Saving…”). Keep the button width stable.
- Focus: dual ring described in §3.5.
- Do not append `→` to button labels. “Add contact”, not “Add contact →”.

### 6.5 Form controls

- Height: 44px mobile, 40px desktop.
- Surface: `--paper-raised`; border: 1px `--rule-strong`; radius: `radius-md`.
- Text: 16px mobile, 14px desktop, `--ink`.
- Placeholder: `--ink-subtle`.
- Focus: border `--focus`, plus a 2px `--focus` ring at 20% opacity.
- Invalid: border `--danger`, plus a 12px `--danger` message below the field. Use `aria-invalid` and `aria-describedby`.
- Disabled: `--paper-sunken`, `--ink-subtle`, 60% opacity.
- Labels: Plex Sans 500 13px, sentence case, 6px above the field. Required fields use a small `*` with an `sr-only` “required” phrase.
- Selects: native select with a custom 1px chevron; no rounded pill. The option list uses `--paper-raised` and `--ink`.
- Textareas: minimum 3 rows, `resize-y`, 16px line height. The notes composer uses a 2px `--accent` left rule to evoke a margin.
- Checkboxes: 18px square, 1px `--rule-strong`, `radius-sm`. Checked: `--success` fill, paper check. Focus ring around the box.
- Field groups: separate with a 1px `--rule` and a 12px gap; do not wrap each field in a card.

### 6.6 Tables and contact rows

**Desktop contacts register**

- Semantic `<table>` on desktop; the row itself is not a link, the name is.
- Header row: `--paper-sunken`, 1px bottom `--rule-strong`. Header labels: Plex Sans 500 12px `--ink-muted`, sentence case. No uppercase.
- Columns: **Contact** (name + email), **Company**, **Source**, **Stage**, **Added**.
- Row height: 56–64px. 1px `--rule` between rows; no vertical borders except the margin rule.
- Hover: `--paper-sunken`. Focus-within: 2px `--focus` inset ring.
- Contact cell: 36px monogram, name in Plex Sans 600 15px, email in 13px `--ink-muted`.
- Company and source: 14px `--ink-muted`, truncate at 24 characters.
- Stage: Deal Stage Stamp, size `sm`.
- Added: Plex Mono 13px `--ink-muted`, `12 Nov 2026`.
- Pagination: a ruled footer row, “Showing 1–12 of 57” in Plex Mono 13px on the left; Previous/Next as secondary buttons on the right. No page-number pills.

**Mobile contact rows**

- The table becomes a stacked list. Each row:
  - Top line: monogram + name (15px 600) + stamp (sm) on the right.
  - Second line: email, truncated.
  - Third line: company and source, 13px `--ink-muted`; “Added” date in mono.
- No horizontal scrolling. The whole row is a 44px-minimum tap target; the name link covers the row.
- Do not hide the stage on mobile.

### 6.7 Status indicators

- **Pipeline stage:** Deal Stage Stamp (§7). This is the primary status indicator.
- **Activity completion:** an 18px square checkbox, not a pill. Completed: `--success` fill, paper check, title in `--ink-muted` with a line-through. Pending: 1px `--rule-strong`, title in `--ink`.
- **Overdue:** `--danger` date text, a 14px clock icon, and a 2px `--danger` left rule on the row. Do not fill the whole row red.
- **Due today:** `--warning` date text and a small calendar icon. No filled row.
- **Counts:** Plex Mono 500, tabular. A count is never a coloured pill; it is a number with a label or a stage stamp.
- **Success:** `--success` text plus a check icon. Never green text alone.
- **Error:** `--danger` text plus an alert icon or a 1px danger rule. Never red text alone.

### 6.8 Cards and panels

Most content should **not** be in a card.

Use a **ledger panel** only when a group of content needs a boundary:

- Surface: `--paper-raised`.
- Border: 1px `--rule`; radius: `radius-md` (4px) maximum.
- No shadow.
- Header: 1px bottom `--rule`; title in Fraunces 500 20px; optional action on the right.
- Body padding: 16px mobile, 20–24px desktop.

Use a **well** (`--paper-sunken`, 1px `--rule`, no radius) for:

- Table headers.
- Read-only values (email, member since).
- Empty states.
- The notes composer background if a boundary is needed.

Do not put a panel inside a panel. Do not give every section a border. Prefer a section title plus a rule.

### 6.9 Search, filters, dialogs, dropdowns

**Search**

- 40px high, 1px `--rule-strong`, `radius-md`, `--paper-raised`.
- Search icon 16px `--ink-muted`; clear button appears only when there is a value.
- The global search opens the command palette; the page search filters the current register.
- Result counts use Plex Mono: “12 contacts”.

**Filters**

- A segmented control, not pills: a 1px `--rule-strong` container with `radius-md`; each segment is 36px high, 12px horizontal padding.
- Default: transparent, `--ink-muted`. Active: `--paper-sunken`, `--ink`, 2px `--accent` bottom rule. Hover: `--paper-sunken`.
- On mobile, allow the control to wrap to two lines; do not create page-level horizontal scroll.
- Status filters: All, New, Contacted, Interested, Converted. These map to existing `ContactStatus` values.
- Activity filters: All, Pending, Overdue, Due Today, Upcoming, Completed.
- Sort: a native select with the same field styling; label “Sort” visually hidden.

**Dialogs**

- Surface: `--paper-raised`; border: 1px `--rule-strong`; radius: `radius-md`; functional shadow.
- Max width: 480px; 560px for a wide confirmation.
- Scrim: `rgb(27 26 23 / 0.45)`. No blur.
- Title: Fraunces 500 22px. Body: Plex Sans 14/22 `--ink-muted`.
- Actions: right-aligned on desktop, full-width stacked on mobile; cancel first in DOM, primary last visually.
- Destructive confirmation: danger icon in a 32px square with a 1px danger border, not a large filled circle. Title “Delete this contact?”; body states exactly what will be removed; final button “Delete contact”.
- Focus trap, Escape to close, return focus to the trigger.

**Dropdowns and menus**

- Surface: `--paper-raised`; border: 1px `--rule`; radius: `radius-md`; functional shadow.
- Item height: 36px; 12px horizontal padding; 14px Plex Sans.
- Hover: `--paper-sunken`. Destructive item: `--danger` text and icon.
- Account menu: Settings, divider, Sign out. Sign out is destructive text, not a filled red button.
- Command palette: a dialog with a 56px search row, a 1px rule, and a list of results. Selected item: `--paper-sunken` and a 2px `--accent` left rule. Shortcuts in Plex Mono 11px.

### 6.10 Empty, loading, and error states

**Empty**

- A well (`--paper-sunken`) or a blank ruled area, not an illustration.
- Title in Fraunces 500 20px: “No contacts yet.”
- One sentence of direction: “Add your first contact to start your ledger.”
- One primary action if the user can act; otherwise a secondary link to the relevant place.
- Filtered empty: “No contacts match this view.” + “Clear filters” secondary action. Do not show the create action when a filter is active.

**Loading**

- Skeletons that match the final layout: ruled rows, not rounded grey blocks.
- Use `--paper-sunken` blocks with a 1px `--rule` and a subtle opacity pulse.
- Preserve row heights to avoid layout shift.
- `role="status"` and an `sr-only` “Loading…”.
- Do not use a centred spinner for a full page; use it only inside a button or a small inline region.

**Error**

- Inline error: 1px `--danger` border, `--danger-tint` background, `--danger` text, 14px. Place it next to the action that failed.
- Page-level error: a ruled section with a clear title, what happened, and a retry action. No apology copy, no vague “Something went wrong.”
- Field error: message below the field, linked with `aria-describedby`.
- Never rely on colour alone; pair with an icon and text.

### 6.11 Focus, hover, and active states

| State | Rule |
|---|---|
| Focus-visible | 2px `--paper` offset + 2px `--focus` ring. On accent surfaces, use a 2px `--accent-contrast` inner ring then `--focus`. |
| Hover (rows) | `--paper-sunken`; no movement. |
| Hover (buttons) | Colour shift only; no lift, no scale, no shadow. |
| Active (buttons) | 1px downward translate; no scale. |
| Active (nav) | 2px `--accent` left rule + `--paper-sunken`. |
| Selected (filters) | `--paper-sunken` + 2px `--accent` bottom rule. |
| Dragging | 40% opacity on the source; 2° rotation and functional shadow on the overlay. |
| Disabled | 50% opacity; no hover; `cursor: not-allowed`. |
| Current page | `aria-current="page"`; visual active state as above. |

Focus must remain visible in both themes and on all surfaces. Do not remove outlines without a replacement.

---

## 7. Signature element — the Deal Stage Stamp

### 7.1 Concept

The Deal Stage Stamp is a visual mark that records the contact’s current pipeline stage, as if a clerk stamped the record when the stage changed. It turns the existing `ContactStatus` value into the most recognisable object in the product.

It is **not** a new data field. It reads the existing status:

- `NEW` → **New**
- `CONTACTED` → **Contacted**
- `INTERESTED` → **Interested**
- `CONVERTED` → **Converted**

### 7.2 Anatomy

```
┌──────────────────┐
│ ┌──────────────┐ │
│ │  INTERESTED  │ │
│ └──────────────┘ │
└──────────────────┘
```

- A rectangular outer frame, 1px, in the stage text colour at 55% opacity.
- A 2px gap, then an inner frame, 1px, in the stage text colour at 35% opacity.
- Fill: the stage tint.
- Text: the stage word, Plex Mono 600, uppercase, 11px, letter-spacing 0.08em, stage text colour.
- Padding: 4px 8px (sm), 5px 10px (md), 6px 12px (lg).
- Radius: 2px.
- Rotation: deterministic from the contact id, between `-1.5deg` and `+1.5deg`. The same contact always gets the same angle. Do not rotate on hover.
- Opacity: 0.94 on the fill to suggest ink on paper. Do not add texture, noise, or a shadow.
- No icon inside the stamp. The word is the mark.

### 7.3 Sizes

| Size | Font | Padding | Use |
|---|---|---|---|
| `sm` | 10px | 3px 7px | Contacts table, dense activity rows |
| `md` | 11px | 4px 8px | Pipeline cards, dashboard lists |
| `lg` | 12px | 6px 12px | Contact detail record card |

### 7.4 Placement

- **Contacts list:** the Stage column, right-aligned. On mobile, top-right of the stacked row.
- **Pipeline cards:** top-right, aligned with the contact name. The column itself also uses the stage colour as a 2px top rule and the stage name in its header.
- **Contact details:** top-right of the record card, `lg`, next to the contact’s name and company. This is the largest instance and the page’s anchor.
- **Activity history (contact detail):** `sm`, next to the contact name on each activity row. The contact’s current stage is available on that page.
- **Dashboard:** `sm` or `md` in recent contacts and the pipeline register.

### 7.5 Behaviour

- The stamp is **not interactive** in v1. It is a label, not a dropdown.
- Stage changes happen through the existing edit form or the pipeline “Move to” select. After a change, the stamp re-renders with the new stage and a 150ms press animation: scale `1.04 → 1`, opacity `0.8 → 1`. Respect `prefers-reduced-motion`.
- The stamp must never be used for activity type, completion, priority, or anything other than pipeline stage.
- Do not use the stamp as a decorative logo or repeat it in the page background.

### 7.6 Accessibility

- Render the stage word as real text, not an image.
- Add `aria-label="Stage: Interested"` to the stamp container.
- The stamp must remain legible without colour: the word is always present.
- Maintain the contrast pairs in §3.4.
- The rotation is decorative; do not encode information in the angle.

### 7.7 Do / do not

| Do | Do not |
|---|---|
| Keep the double rule and the stage word | Add a drop shadow or emboss |
| Use the stage tint as the fill | Use a gradient or metallic effect |
| Rotate 1–1.5° deterministically | Randomise the angle on every render |
| Use it only for pipeline stage | Reuse it as a generic badge |
| Keep uppercase only inside the stamp | Use uppercase for table headers or labels |

---

## 8. Page plans

Each page has a distinct composition. Do not force them into one template.

### 8.1 Landing page (`/`)

**Job:** explain the product and get the visitor to sign in.

**Layout — “the specimen spread”**

- **Header:** 64px, paper, 1px bottom rule. Wordmark in Fraunces 20px, “Sign in” text link, theme toggle, “Get started” primary button. No blurred sticky bar; solid paper with a rule.
- **Hero:** two columns on desktop (7/5), stacked on mobile.
  - Left: display-xl headline, “Every lead has a next step.” in `--ink`. No gradient text, no accent word. Body copy 18px, max 55ch. Primary “Get started” and secondary “Explore LeadFlow” (both go to `/login`, as today). A short list of three capabilities with small line icons, separated by rules, not checkmark pills.
  - Right: a **ledger specimen** — a static, paper-raised panel showing one contact record:
    - Folio header “Contact record” with a small brass rule.
    - Contact name in Fraunces, company in Plex Sans, a Deal Stage Stamp `md`.
    - A ruled “Next step” line with a date in mono.
    - Two ruled note lines.
    - Caption: “A page from your ledger.” in 12px `--ink-subtle`.
  - The specimen is illustrative. It must not imply analytics, automation, or features that do not exist.
- **Features:** a ruled three-column editorial band, not three cards. Each column has a 20px line icon, a Plex Sans 600 17px title, and a 14px description, separated by 1px vertical rules. Titles: “Contact management”, “Sales pipeline”, “Insights” (the existing copy).
- **CTA:** a full-width band on `--paper-sunken`, 1px top and bottom rules. Headline in Fraunces, one sentence, primary button. No card, no shadow.
- **Footer:** 1px top rule, copyright, Terms, Privacy. No social badges, no badge wall.

**Avoid:** gradient hero, blurred blobs, fake stat cards, floating product screenshots with heavy shadows, uppercase eyebrows, “Trusted by” logos that do not exist.

### 8.2 Login (`/login`)

**Job:** sign in with GitHub or Google, quickly and confidently.

**Layout — “the ledger cover”**

- Desktop: a two-panel composition, 1.05fr / 0.95fr, inside a 1px `--rule-strong` frame, `radius-md`, no shadow. Max width 960px.
  - **Left panel — the cover:** solid `--accent` (oxblood), `--accent-contrast` text. No gradient. A double rule at the top and bottom. Brand mark and “LeadFlow” in Fraunces 24px. A display-l statement: “Every lead has a next step.” Three benefits as ruled entries, each with a 16px check icon and 14px text. A small “CRM” label in Plex Mono 11px. Footer: “© 2026 LeadFlow.”
  - **Right panel — the form:** `--paper-raised`. A 32px monogram/icon, “Welcome back.” in Fraunces 28px, one sentence of direction. Two provider buttons:
    - GitHub: `--ink` background, paper text, official mark.
    - Google: `--paper-raised`, 1px `--rule-strong`, ink text, official mark.
    - Both 48px, `radius-md`, no lift, no violet focus ring. Focus uses the dual ring.
  - A 1px rule with “Secure authentication” in 12px `--ink-subtle` between the provider buttons and the security note. The note is a `--paper-sunken` well with a 1px rule and a check icon.
  - Terms and Privacy links in 12px, underlined. “Back to home” as a ghost link.
- Mobile: the left panel collapses to a compact 120px masthead in oxblood with the wordmark and the statement; the form fills the rest. Hide the benefits and the footer. No blobs, no decorative background.

**Avoid:** violet gradient panel, gradient wordmark, uppercase “WELCOME TO LEADFLOW” eyebrow, slate-coloured provider buttons that ignore the palette.

### 8.3 Dashboard (`/dashboard`)

**Job:** answer “what needs my attention today?” and “where does my pipeline stand?”

**Layout — “the day book”**

- **Folio header:** greeting in Fraunces 32px, “Good morning, Alex.” Date in Plex Mono 13px `--ink-muted` beneath it.
- **Today line:** a single ruled summary row, not six stat cards:
  - “3 overdue · 2 due today · 5 upcoming” is banned as a middot string. Instead use three labelled entries separated by vertical rules:
    - `Overdue` (label 12px) / `3` (data-l, danger if > 0)
    - `Due today` / `2`
    - `Upcoming` / `5`
  - Each entry is a link to the corresponding activity filter, as today.
- **Main grid (desktop 8/4):**
  - **Left — Today’s ledger:** a ruled table of the activities that need attention. Columns: checkbox, activity, contact, due date. Use the existing recent activities data plus the overdue/due-today counts; if the page only has recent activities, show the five most recent with their completion state and link to the filtered activity register for the rest. Do not invent a new query.
  - **Right — Pipeline register:** four rows, one per stage, each with the stage stamp `sm`, the stage name, a thin ledger bar (2px high) scaled to the count, and the count in Plex Mono. Below, a single line: “Conversion 29%” with the number in mono. This replaces the separate `PipelineOverview` card.
- **Below:** two ruled sections side by side on desktop:
  - **Recent contacts:** five rows, monogram, name, company, stage stamp, added date. Link to the contact.
  - **Recent activity:** five rows, type icon, title, contact, date, completion checkbox. Link to the contact.
- **No stat cards.** The numbers live in the summary line, the pipeline register, and the row counts.

**Avoid:** a 4-up KPI card row, a second 3-up card row, identical cards for every section, coloured icon tiles.

### 8.4 Contacts (`/contacts`)

**Job:** scan, search, filter, and open a contact.

**Layout — “the register”**

- **Folio header:** title “Contacts”, description, count in Plex Mono (“57 contacts”), and “Add contact” primary button on the right.
- **Toolbar:** search field (full width on mobile, 320px on desktop) + segmented status filter. A result count line in mono beneath.
- **Register:** semantic table on desktop with the columns from §6.6. On mobile, stacked rows.
- **Pagination:** ruled footer with the range and Previous/Next.
- **Empty:** a blank ruled well. “No contacts yet.” / “Add your first contact to start your ledger.” + primary action. Filtered empty: “No contacts match this view.” + “Clear filters”.
- **No card wrapper** around the table. The table is the page.

**Avoid:** gradient avatars, status pills, a card per contact, a grid of contact tiles.

### 8.5 Contact details (`/contacts/[id]`)

**Job:** understand one relationship and act on it.

**Layout — “the folio”**

- **Record header:** a two-column band.
  - Left: 64px monogram (paper-sunken, 1px rule, ink text), name in Fraunces 32px, position and company in Plex Sans 14px `--ink-muted`, source and added date in mono.
  - Right: the Deal Stage Stamp `lg`, Edit and Delete secondary/destructive actions. Delete opens the existing confirmation dialog.
  - A double rule beneath the band.
- **Body grid (desktop 7/5):**
  - **Left — Contact information:** a definition ledger, not a card. Two columns of label/value pairs with 1px row rules. Labels 12px `--ink-muted`; values 15px `--ink`. Email and phone are links. Missing values read “Not provided” in `--ink-subtle`.
  - **Right — Notes:** the margin-notes panel. A composer with a 2px `--accent` left rule, then note entries separated by 1px rules. Timestamps in Plex Mono 12px. Edit/Delete as text actions, not buttons.
- **Activities:** full-width below. A ruled list with a date gutter on the left (mono), type icon, title, content, due date, completion checkbox, delete. Each row shows the contact’s stage stamp `sm` next to the contact name where the stage is available. Empty: “No activities yet.” + “Add activity” link to the existing `/activities/new?contactId=...`.
- **No nested cards.** Sections are separated by rules and space.

**Avoid:** a profile card floating on a grey background, a gradient avatar, a row of identical info cards.

### 8.6 Contact creation and editing (`/contacts/new`, `/contacts/[id]/edit`)

**Job:** enter or update a record accurately.

**Layout — “the new folio”**

- Back link at the top, then the page title in Fraunces 32px and one sentence of direction.
- A single paper sheet (`--paper-raised`, 1px `--rule`, `radius-md`, no shadow) containing the form, or no panel at all on mobile. Prefer the sheet on desktop for focus.
- Form groups, separated by 1px rules:
  1. **Identity:** first name, last name, email, phone.
  2. **Company:** company, position, source.
  3. **Record:** status (select with the four existing stages).
- Desktop: two columns, 24px gap. Mobile: one column.
- Labels above fields; helper text only where it prevents a mistake (e.g. source examples).
- Actions: Cancel (secondary) and “Create contact” / “Save changes” (primary) at the bottom right on desktop; full-width stacked on mobile.
- Editing keeps the contact’s stage stamp in the header so the user can see the current state while editing.
- Error: inline at the top of the form, in a 1px danger well; do not use a toast.

**Avoid:** wrapping the form in a generic rounded card with a shadow, or putting each field in its own card.

### 8.7 Pipeline (`/pipeline`)

**Job:** see and change the stage of every contact.

**Layout — “the stage register”**

- **Folio header:** title “Pipeline”, description, and a register summary line, not three stat cards:
  - `Total 42` / `In progress 30` / `Converted 12` / `Conversion 29%`, each label in 12px and value in Plex Mono 20px, separated by vertical rules.
- **Board:** four columns on desktop, each a ledger section:
  - Column header: 2px top rule in the stage colour, stage name in Fraunces 20px, count in Plex Mono, one-line description in 12px `--ink-muted`.
  - Column body: `--paper-sunken` well with 1px rule; no outer card shadow.
  - Cards: `--paper-raised`, 1px `--rule`, `radius-md` (4px max), 12–16px padding. Top row: name (Plex Sans 600 15px) and Deal Stage Stamp `md`. Second row: company, email. Bottom row: “Added 3 days ago” in mono and the “Move to” select. The whole card is draggable; the select is the keyboard-accessible alternative.
  - Drag: source card 40% opacity; overlay 2° rotation with functional shadow. Drop target: 1px dashed `--accent` rule and `--paper-sunken`, not a coloured ring.
  - Empty column: “No contacts in this stage.” in a dashed well. Keep the drop target.
- **Mobile:** horizontal snap columns at 85% width, with a visible stage index above (four small stage labels; the active one is underlined). No page-level horizontal overflow. The “Move to” select remains.
- **Tablet:** two columns visible, horizontal scroll inside the board only.

**Avoid:** coloured top borders plus coloured badges plus coloured counts all at once; a kanban card kit with big shadows; a separate stat-card row.

### 8.8 Activities (`/activities`)

**Job:** know what to do next and record what happened.

**Layout — “the day book”**

- **Folio header:** title “Activities”, description, “New activity” primary button.
- **Summary row:** a single ruled strip with three labelled entries: Overdue, Today, Pending. Each is a link to its filter. Numbers in Plex Mono; overdue uses `--danger` only when greater than zero. Not three cards.
- **Toolbar:** segmented filter, search field, sort select. On mobile: filter wraps, search full width, sort below.
- **Register:** a ruled list with a date gutter on the left:
  - Date gutter: due date in Plex Mono 12px; overdue in `--danger`; today in `--warning`; no date shows “No date” in `--ink-subtle`.
  - Main: completion checkbox, type icon, title (Plex Sans 600 15px), content (14px, two lines max), contact link, edit/delete text actions.
  - Completed rows: title in `--ink-muted`, line-through, checkbox checked.
  - Overdue rows: 2px `--danger` left rule; do not fill the row.
- **Empty:** “No activities in this view.” + “Clear filters” or “New activity”. If there are no contacts, explain that a contact is needed first.
- **No pagination** in the current implementation; do not design page controls that do not exist. If the list grows long, the page scrolls; the spec notes pagination as a future product decision, not a design requirement.

**Avoid:** a card per activity, coloured pills for type, a second stat-card row.

### 8.9 Settings (`/settings`)

**Job:** manage profile, appearance, and data export.

**Layout — “the record book”**

- **Folio header:** title “Settings”, description.
- Three ruled sections, not three cards:
  1. **Profile:** full name field, email as a read-only well, member since in mono. “Save changes” primary button at the section end, right-aligned.
  2. **Appearance:** three rectangular options (Light, Dark, System), each 1px rule, `radius-md`, 44px high, icon + label. Selected: `--paper-sunken` + 2px `--accent` bottom rule + `aria-pressed="true"`. No rounded cards, no preview thumbnails.
  3. **Your data:** one sentence explaining the CSV export, then a secondary “Export my data (CSV)” button/link. Keep the existing `/api/export` behavior.
- Success and error messages are inline, below the relevant action, in 14px. Success uses `--success` + check; error uses `--danger` + alert.
- Max width 720px; left-aligned.

**Avoid:** settings cards floating on grey, a theme picker made of three large rounded tiles, a full-width primary button on desktop.

### 8.10 Notes (part of contact details)

**Job:** record context that is not a task.

**Layout — “margin notes”**

- Section title “Notes” in Fraunces 22px, with a 1px rule beneath.
- Composer: a textarea on `--paper-raised` with a 2px `--accent` left rule, 16px line height, 3 rows. Placeholder “Write a note…”. “Add note” primary button below, right-aligned; disabled when empty.
- Note entries: separated by 1px `--rule`; content in Plex Sans 15/24; timestamp in Plex Mono 12px `--ink-subtle`; Edit and Delete as text actions. Delete uses the existing confirmation dialog.
- Edit mode: the same textarea style, with Save (primary) and Cancel (secondary) inline.
- Empty: “No notes yet.” + one sentence: “Add context you will want later.” No illustration.
- Loading: two ruled skeleton rows, not a spinner.
- Error: inline danger well above the composer.

**Avoid:** each note in a rounded card, a chat-bubble metaphor, a floating action button.

---

## 9. Responsive behavior

### 9.1 Breakpoints

| Name | Width | Shell | Content |
|---|---|---|---|
| Mobile | 375px (design target; verify 320px) | Bottom nav, 56px header | 1 column, 16px padding |
| Tablet | 768px | 72px icon rail, 56px header | 8 columns, 16px gutters |
| Desktop | 1440px | 240px sidebar, 64px header | 12 columns, 24px gutters, max 1280px |

### 9.2 Mobile (375px)

- Header: 56px; breadcrumb hidden; page title 26px; description hidden; search collapses to a 40px icon button; account menu 40px.
- Bottom nav: 5 items, 56px + safe area; content bottom padding ≥ 72px.
- Page padding: 16px. Section gap: 20px.
- Contacts: stacked rows; no horizontal scroll. Name + stamp on the first line; email, company, source, date below.
- Pipeline: horizontal snap columns at 85% width; the board scrolls, the page does not. Add a stage index above the board.
- Forms: single column; buttons full width, primary last in DOM order but visually below cancel? Use `flex-col-reverse` to keep the primary at the bottom, as today.
- Dialogs: `calc(100vw - 32px)` max width; actions stacked full width.
- Tables inside a page: never wider than the viewport. If a table cannot fit, switch to the stacked row layout rather than horizontal scroll.
- Touch targets: 44px minimum. The stamp is not a target.
- Long content: `overflow-wrap: anywhere` on emails and note text; `min-width: 0` on every flex/grid child; truncate names and companies.

### 9.3 Tablet (768px)

- Sidebar becomes a 72px icon rail. Tooltips on hover/focus; labels visually hidden.
- Header: 56px; page title 28px; description visible if it fits on one line.
- Contacts: table may remain a table if all five columns fit; otherwise drop **Source** to the second line under the name. Do not drop the stage.
- Dashboard: 2-column summary row; main grid stacks to one column (Today’s ledger above the pipeline register).
- Pipeline: two columns visible; horizontal scroll inside the board.
- Forms: two columns only if each field is at least 280px wide; otherwise one column.
- Settings: max width 720px, left-aligned.

### 9.4 Desktop (1440px)

- Full 240px sidebar, 64px header, content max 1280px.
- Contacts: full five-column register.
- Dashboard: 8/4 main grid; recent sections side by side.
- Contact details: 7/5 body grid; activities full width.
- Pipeline: four columns, equal width, 16px gap.
- Settings: 720px max width; do not stretch fields across the page.
- Landing: 7/5 hero; features in three columns; CTA full width but content capped at 720px.

### 9.5 Overflow rules

- `html, body { overflow-x: hidden; }` is a last resort, not a fix. Fix the child that overflows.
- Every flex/grid child gets `min-width: 0`.
- Tables use `table-layout: fixed` with explicit column widths on desktop; cells truncate.
- The pipeline board is the only intentional horizontal scroller; it must be inside a container with `overflow-x: auto`.
- Filters may wrap; they must not create page overflow.
- Images and the existing brand icon use `max-width: 100%; height: auto`.
- Verify at 320px, 375px, 768px, 1024px, and 1440px.

---

## 10. Motion

Motion is functional and sparse.

- **Page load (landing only):** one orchestrated sequence — the headline and specimen fade/rise once, 300ms, staggered by 60ms. No per-section reveals on scroll.
- **In-app page changes:** no fade/slide transition. The page should appear immediately. The current `PageTransition` wrapper should be removed or reduced to a 120ms opacity change if a transition is required for perceived performance.
- **Stamp change:** 150ms press (`scale 1.04 → 1`, opacity `0.8 → 1`) when a stage changes. This is the signature motion.
- **Row hover:** colour only, 120ms. No lift.
- **Button hover:** colour only, 120ms. No lift or shadow.
- **Dialog/dropdown:** 120ms opacity + 4px translate. No spring, no bounce.
- **Drag:** overlay follows the pointer; 2° rotation; 150ms settle on drop.
- **Reduced motion:** remove all transforms and transitions except colour changes; the stamp appears without the press animation.

Do not add parallax, scroll-triggered reveals, animated counters, or looping decorative motion.

---

## 11. Accessibility

- **Contrast:** all text tokens meet WCAG AA (4.5:1) on their intended surfaces; the ratios in §3 are verified. Brass is decorative only and never used for text.
- **Colour independence:** stage = word + stamp shape + colour; overdue = text + icon + rule; completed = checkbox + line-through + colour.
- **Keyboard:** every interactive element is reachable and operable. The command palette supports arrow keys and Enter. Dialogs trap focus and restore it. The pipeline “Move to” select is the keyboard alternative to drag-and-drop.
- **Focus:** always visible; dual ring; never `outline: none` without a replacement.
- **Semantics:** use `<nav>`, `<main>`, `<table>`, `<dl>`, `<label>`, and headings in order. Use `aria-current="page"` for navigation. Use `aria-pressed` for theme and filter toggles.
- **Live regions:** async status (“Saving…”, “Saved”, errors) uses `role="status"` or `role="alert"` as appropriate.
- **Forms:** every input has a label; errors are linked with `aria-describedby`; invalid fields use `aria-invalid`.
- **Touch:** 44px minimum targets on mobile; 8px minimum spacing between adjacent targets.
- **Text scaling:** layout must survive 200% zoom without horizontal scrolling; avoid fixed heights on text containers.
- **Images:** the existing icon is decorative where the wordmark is present; use empty `alt`. If it conveys meaning, use a meaningful `alt`.
- **Motion:** respect `prefers-reduced-motion`.
- **Dark mode:** verify every token pair in both themes; do not assume a light-mode colour works on charcoal.

---

## 12. Implementation mapping (for the later build phase)

This section is guidance only. Do not change code as part of this document.

### 12.1 Token mapping

| Existing token | New role |
|---|---|
| `--background` | `--paper` |
| `--foreground` | `--ink` |
| `--card` / `--card-foreground` | `--paper-raised` / `--ink` |
| `--muted` / `--muted-foreground` | `--paper-sunken` / `--ink-muted` |
| `--primary` / `--primary-foreground` | `--accent` / `--accent-contrast` |
| `--border` / `--input` | `--rule` / `--rule-strong` |
| `--ring` | `--focus` |
| `--destructive` | `--danger` |
| `--chart-1…5` | stage colours + `--ink` + `--rule` |
| `--sidebar*` | `--paper-raised`, `--ink`, `--paper-sunken`, `--accent` |

Dark mode needs a separate `--accent-solid` because a light accent text colour cannot serve as a button background. Use `--accent` for text/icons and `--accent-solid` for solid buttons.

### 12.2 Class-level changes

- Replace `rounded-xl` / `rounded-2xl` on panels with `rounded-[4px]` or no radius.
- Remove `shadow-sm`, `shadow-md`, `shadow-lg`, and `shadow-2xl` from cards and buttons. Keep shadows only on overlays.
- Replace `bg-linear-to-*`, `bg-gradient-*`, `from-*`, `via-*`, `to-*`, and `bg-clip-text` with flat tokens.
- Replace `blur-*` decorative layers with nothing.
- Replace avatar gradients and the duplicated `gradientFor` helpers with a single monogram component using `--paper-sunken` and `--ink`.
- Replace the four duplicated status maps with one stage token map.
- Replace pill status chips with the Deal Stage Stamp.
- Replace `border-t-4` pipeline accents with a 2px top rule in the stage colour.
- Replace `backdrop-blur` on the header, dialogs, and command palette with solid surfaces and a scrim.
- Replace uppercase/tracking eyebrow labels with sentence-case labels or remove them.
- Replace middot meta strings with labelled columns or rules.
- Remove the `PageTransition` fade/slide from in-app pages, or reduce it to a 120ms opacity change.

### 12.3 What must not change

- Routes, data model, API behavior, auth, validation, and tenancy.
- Existing actions: create/edit/delete contact, create/edit/delete note, create/edit/delete/complete activity, drag pipeline stage, search, filter, sort, paginate contacts, export CSV, change theme, sign in/out.
- The meaning of `ContactStatus` and `ActivityType`.
- The existing brand icon asset. If it clashes with the palette, use it at small sizes on paper and do not recolour it in this phase.

---

## 13. Design review checklist

Use this after implementation. Each item should be answerable with “yes” and evidence.

### Brand consistency

- [ ] Oxblood is the only brand accent; no purple or violet appears anywhere.
- [ ] No gradients, blurred blobs, glow fields, or glassmorphism remain.
- [ ] Paper and ink tokens are used consistently in light and dark mode.
- [ ] Brass appears only on hairlines, stamp details, and small marks; never as text.
- [ ] The Deal Stage Stamp appears in contacts, pipeline cards, contact details, and relevant activity history.
- [ ] The stamp is the same artifact in every context, with only size changing.
- [ ] The page reads as a ledger, not a generic SaaS dashboard.

### Accessibility and contrast

- [ ] All text meets 4.5:1 on its actual background in both themes.
- [ ] Stage, overdue, completed, success, warning, and error states are understandable without colour.
- [ ] Focus is visible on every interactive element, including on accent and dark surfaces.
- [ ] Keyboard navigation reaches every action, including pipeline stage changes.
- [ ] Dialogs trap focus, close on Escape, and restore focus.
- [ ] Form errors are linked to their fields and announced.
- [ ] Touch targets are at least 44px on mobile.
- [ ] `prefers-reduced-motion` removes non-essential motion.
- [ ] The layout survives 200% zoom without horizontal scrolling.

### Responsive behavior

- [ ] 375px: no horizontal page scroll; bottom nav works; contact rows stack; forms are single column.
- [ ] 768px: icon rail works; pipeline scrolls inside its container only; tables either fit or drop a non-essential column.
- [ ] 1440px: sidebar, 12-column grid, and content max-width behave as specified.
- [ ] Long names, emails, companies, and note text do not break layout.
- [ ] The pipeline board is the only intentional horizontal scroller.
- [ ] Safe-area insets are respected on mobile.

### Typography

- [ ] Fraunces (or Newsreader) is used for page and section titles only; not for body or table cells.
- [ ] IBM Plex Sans is used for UI and body.
- [ ] IBM Plex Mono is used for numbers, dates, timestamps, and the stamp.
- [ ] Numerals are tabular wherever columns align.
- [ ] Line lengths stay within 60–75 characters for prose.
- [ ] No all-caps labels except the stamp.
- [ ] No gradient text, no accent word in a headline, no letter-spaced eyebrows.
- [ ] Dates use one consistent format.

### Component consistency

- [ ] One button system; primary/secondary/ghost/destructive behave the same everywhere.
- [ ] One input system; heights, borders, focus, and error states match.
- [ ] One table/row system; hover and focus states match.
- [ ] One stamp system; sizes and colours match.
- [ ] One dialog/dropdown system; scrim, radius, and shadow match.
- [ ] Cards are used only where a boundary is meaningful; no card-in-card.
- [ ] Empty, loading, and error states use the same voice and layout.

### Product-specific visual identity

- [ ] A screenshot is recognisable as LeadFlow without the logo.
- [ ] The Deal Stage Stamp is the memorable element; everything around it is quiet.
- [ ] The ledger margin rule and folio headers carry real structure.
- [ ] The dashboard is a day book, not a KPI wall.
- [ ] The contacts page is a register, not a card grid.
- [ ] The pipeline is a stage register, not a generic kanban kit.
- [ ] The copy is plain, active, and specific; no filler or invented claims.
- [ ] No feature is implied that the product does not have.

### Performance

- [ ] No decorative images, gradients, or blur layers were added for the redesign.
- [ ] Fonts are loaded with `next/font` or self-hosted with `font-display: swap`; no layout shift.
- [ ] Only the weights actually used are loaded.
- [ ] The stamp is CSS/text, not an image or SVG per row.
- [ ] No new client-side JavaScript is added solely for visual effects.
- [ ] Skeletons preserve layout and do not cause cumulative layout shift.
- [ ] The redesign does not add dependencies.

### No generic AI-generated patterns

- [ ] No warm-cream + high-contrast-serif + terracotta default; the ledger structure and stamp carry the identity.
- [ ] No near-black + acid-green accent.
- [ ] No broadsheet pastiche with hairline rules and zero radius as the only idea; the ledger is functional.
- [ ] No identical rounded cards with one radius and one soft shadow.
- [ ] No tracked-out all-caps eyebrow above every heading.
- [ ] No middot meta strings.
- [ ] No `→` appended to every link and button.
- [ ] No tinted near-black standing in for black; the dark theme is warm charcoal.
- [ ] No monospace used decoratively; it is used for actual data.
- [ ] No fade-and-slide-up on every section; motion is sparse and functional.

---

## 14. Conflicts and constraints

These are known tensions between this design and the current implementation. They are listed so the build phase can make deliberate choices rather than discover them late.

1. **Fonts are not installed.** The app currently uses Geist. Fraunces, IBM Plex Sans, and IBM Plex Mono must be added in the implementation phase. This document intentionally does not install or import them.
2. **The approved palette overlaps with a common generated aesthetic.** Warm cream, a high-contrast serif, and a warm accent are a known AI-design cluster. The differentiation must come from the ledger structure, the margin rule, the register layouts, and the Deal Stage Stamp — not from the palette alone. Do not add a second decorative idea to compensate.
3. **The current landing and login pages use violet/fuchsia gradients and blurred blobs.** These must be removed entirely. This is a broad visual change, not a token swap.
4. **Avatar gradients are duplicated in at least three files** (`src/lib/avatar.ts`, `src/app/(dashboard)/contacts/page.tsx`, `src/app/(dashboard)/contacts/[id]/page.tsx`). The new monogram system replaces all of them. No data is lost; the monogram is derived from the existing first and last initials.
5. **The Deal Stage Stamp needs the contact status.** It is available on contacts, pipeline, contact details, and dashboard recent contacts. The global activities query selects only contact id, name, and company, so showing the stamp there requires adding the existing `status` field to that query. That is a query change, not a new feature.
6. **The dashboard currently has seven stat cards.** The new design removes the stat-card wall and recomposes the same data into a summary line, a pipeline register, and ruled lists. No metric is removed.
7. **The current app uses `rounded-xl` and `shadow-sm` widely.** The new radius and elevation rules require a component sweep. This is expected and should be done with tokens, not one-off classes.
8. **The current status colours are duplicated in four places.** The new system requires one stage token map. This is a consistency fix, not a functional change.
9. **The current `PageTransition` and `Reveal` components use fade/slide motion.** The new motion rules discourage per-page and per-section reveals. Remove or restrict them; do not add more.
10. **The delete confirmation uses a blurred scrim and a rounded modal.** The new design uses a solid scrim and a 4px radius. The confirmation flow itself stays the same.
11. **The contacts list is a div-based list, not a semantic table.** The desktop design calls for a table. Implementation may need markup changes while preserving the full-row link behavior. Ensure the accessible name and focus target remain clear.
12. **The current login provider buttons use slate and violet focus rings.** The new design keeps official provider marks but uses the ledger palette and the shared focus ring.
13. **The existing brand icon is a colourful PNG.** It may clash with the oxblood/paper palette. Do not recolour or replace it in this phase; use it at small sizes on paper and evaluate a monochrome variant later.
14. **The pipeline loads all contacts and the activities list is unpaginated.** The design must not imply pagination or virtualisation that does not exist. The layout should remain usable with long lists; pagination is a future product decision.
15. **The landing product preview currently shows invented statistics.** The new specimen shows one contact record and a next step, which is illustrative and closer to the real product. Do not add fake charts, logos, testimonials, or pricing.
16. **The design uses `ContactStatus` exactly as it exists.** Do not add stages, probabilities, deal values, or stage-change timestamps. The stamp reflects current status only; no history is implied.
17. **No dark-mode asset variants exist.** The design relies on tokens, not images. Verify the existing icon on both paper and charcoal.

---

## 15. Definition of done for the design phase

This design phase is complete when:

- `DESIGN.md` exists at the project root and is the single source of truth for the visual direction.
- The palette, typography, components, page plans, stamp, responsive behavior, and checklist are specified.
- No source file, dependency, or existing uncommitted change has been touched.
- The next implementation task can begin with tokens and typography, then components, then pages — without reopening the visual direction.

The first implementation step should be **tokens and typography only**: define the light/dark CSS variables, load the three families, and verify contrast and focus on a single page. Do not start with the landing page or the dashboard; the system must exist before the pages are rebuilt.
