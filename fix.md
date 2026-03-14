Refactor the Archive gallery and certificate modal to improve the overall **horizontal balance, vertical rhythm, and visual hierarchy** of the certificate viewing experience. The current implementation works functionally but produces poor UX due to uneven layout distribution, excessive empty space around the certificate, and weak separation between the document viewer and metadata panel.

The goal is to transform the archive into a **clean proof-of-work viewer** where the certificate is the visual centerpiece and the metadata panel acts as contextual support.

---

## Improve Modal Layout Balance

Rework the modal structure so the certificate viewer visually dominates the layout instead of feeling squeezed between margins and metadata.

The viewer panel should become the primary visual element and occupy the majority of horizontal space. The metadata panel should be treated as a secondary column that provides contextual information rather than competing with the document.

Ensure the layout adapts smoothly across different screen widths without compressing the certificate.

---

## Fix Certificate Viewer Framing

Currently the certificate appears to float inside the modal with weak visual boundaries.

Introduce a dedicated **viewer frame** around the document that visually separates it from the modal background. The frame should make the certificate feel like a physical document being viewed rather than a raw canvas element rendered by react-pdf.

The viewer frame should:

• center the document vertically and horizontally
• prevent the certificate from touching modal edges
• maintain proper document aspect ratio
• prevent extreme vertical stretching

The certificate should always feel **stable and grounded inside the viewer area**.

---

## Improve Viewer Interaction Layer

The zoom controls currently feel detached from the viewer experience.

Group all document interaction controls into a small floating toolbar attached to the viewer instead of leaving them loosely positioned.

Controls should feel like part of the viewer environment rather than part of the metadata panel.

Ensure zooming never breaks the modal layout or pushes the document outside the viewer frame.

---

## Strengthen Metadata Panel Hierarchy

The metadata panel currently feels visually dense and lacks proper grouping.

Restructure the panel into clear content sections that are easier to scan.

Sections should include:

Credential title
Issuer information
Issue date
Description
Skills or tags
Action buttons

Each section should feel visually separated from the next so that the panel reads like a structured information column instead of a continuous block of text.

---

## Improve Title and Content Flow

The credential title currently dominates the metadata panel in a way that creates visual imbalance.

Refactor the text hierarchy so the title remains prominent but does not overwhelm the panel layout.

Issuer information and date should appear clearly grouped under the title to create a logical reading flow.

Descriptions should feel comfortably readable and not squeezed into narrow vertical space.

---

## Improve Tag Presentation

Skills and tags should not feel like loose UI fragments.

Refactor the tags into a consistent chip system that wraps naturally inside the panel.

Tags should visually relate to each other and feel like a small skill cluster rather than individual buttons.

---

## Improve Gallery Card Design

The masonry gallery cards currently work but still feel slightly unbalanced vertically.

Improve the card structure so the certificate preview feels framed and visually connected to the card metadata.

The preview area should maintain the correct document aspect ratio while preventing extremely tall cards that break the masonry layout.

Card metadata should feel attached to the preview rather than appearing as a separate block below it.

---

## Improve Archive Page Balance

The archive page currently has a lot of empty horizontal space when only a few certificates exist.

Adjust the masonry container so the gallery visually centers itself instead of hugging the left side of the content area.

This makes the page feel more intentional when the archive is still small.

---

## Improve Visual Depth

Introduce subtle depth layers across the archive UI.

The viewer container, metadata panel, and gallery cards should each have slightly different visual surfaces so the interface does not feel flat.

Depth should be subtle and consistent with the rest of the portfolio design language.

---

## Improve Motion and Interaction

Add small interaction feedback to make the archive feel alive.

Gallery cards should respond to hover with subtle elevation.

The modal viewer should animate smoothly when opening and closing.

Transitions between gallery and modal should feel intentional and fluid.

---

## Maintain Compatibility with Current Stack

All improvements must work with the current technology stack:

react-masonry-css for the archive grid
react-pdf with pdfjs-dist for document rendering

The goal is not to replace these libraries but to **improve layout composition and interaction design around them**.

---

## Final UX Goal

The archive should feel like a **professional proof-of-work dashboard** where certificates are presented as visual artifacts rather than downloadable files.

Visitors should immediately recognize the certificates as the focal point of the page while metadata provides helpful context without overwhelming the interface.
