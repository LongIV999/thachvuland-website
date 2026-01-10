# Approach: VR Project Experience

## Gap Analysis

| Component | Status | Gap |
| --------- | ------ | --- |
| **Smart Filters** | Partial | Missing Price Range filter. UI needs "Smart" look (maybe tags or slider?). |
| **Bento Grid** | Partial | Current logic is simple (every 5th item wide). Need more robust layout for diverse content sizes. |
| **Masonry Gallery** | Basic | Just images stacked. Needs Lightbox or interactive viewer for "Premium" feel. |
| **VR/3D** | Placeholder | Logic exists (`loadVrTour`) but UI is basic overlay. Needs proper container and perhaps "Matterport" specific integration handling. |
| **Sticky Sidebar** | Basic | Exists but needs validation on mobile/tablet. |

## Recommended Approach

### 1. Enhanced "Smart Filter" Bar
- Add **Price Range Slider** (using a lightweight no-dep slider or custom CSS/JS).
- Convert "Location" to a searchable dropdown or multi-select if needed, but standard select is fine for MVP.
- Add "Clear All" with animation.

### 2. True Bento Grid Layout
- Use CSS Grid with specific span classes (`col-span-2`, `row-span-2`).
- Update `scripts/main.js` to assign these classes based on a more interesting pattern (e.g., 1 heavy, 2 small, 1 tall) or explicit data attributes.

### 3. Premium Masonry Gallery + Lightbox
- Implement a **Lightbox** (using a simple custom JS modal) so clicking an image opens it full screen.
- Improve Masonry layout using CSS `columns` or Grid with `dense` flow.

### 4. VR/3D Integration
- Standardize the `vrUrl` field in `projectData`.
- Enhance the `vr-viewer` container to handle aspect ratios better.
- Add "Loading" state for the iframe.

## Risk Map

| Component | Risk | Reason | Verification |
| --------- | ---- | ------ | ------------ |
| Price Slider | MEDIUM | Custom UI component might be buggy on mobile | Test touch events on mobile view |
| VR Iframe | LOW | Standard iframe, low complexity | Test with sample Matterport URL |
| Bento Layout | LOW | pure CSS/JS | Browser resize testing |
| Lightbox | LOW | Custom JS, standard pattern | Click testing |

## Verification Plan

- **Automated**: None (Static site).
- **Manual**:
    - Desktop/Mobile resize checks for Bento Grid.
    - Click-through test for Price Filter (min/max logic).
    - Open/Close test for Lightbox.
    - Load test for VR iframe (using a placeholder generic 3D URL).
