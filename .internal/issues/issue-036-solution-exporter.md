---
id: 036
title: "feat: Solution Exporter"
status: in_progress
priority: high
assignee: tim
labels: [feat, euler]
packages: []
created: 2026-03-15
updated: 2026-03-15
---

# feat: Solution Exporter

PDF/share links w/ previews for solutions.

**Rationale**: Easy sharing/portfolio.

**Impl**: html2pdf.js + Web Share API button on Euler pages.

**Acceptance**: Export single/multi; mobile share.

## Design Proposal

### Overview
Implement PDF export and sharing functionality for Euler problem solutions on tvarley.github.io, allowing users to generate PDFs of individual or multiple solutions with preview capabilities and Web Share API integration.

### Current Architecture Analysis

#### Euler Problem Page Structure
- **Route**: `/euler/[...slug].astro` - Dynamic route for individual problems
- **Layout**: `EulerProblem.astro` - Main layout component with:
  - Header section (problem number, title, description)
  - Language tabs for code implementations
  - Code blocks using `CodeBlock.astro` (Expressive Code)
  - Navigation (prev/next, jump to problem)
- **Content Collections**: MDX files with problem data and implementations

#### Key Components
- `EulerProblem.astro`: Main layout with props for problem data, implementations, navigation
- `CodeBlock.astro`: Syntax-highlighted code display using astro-expressive-code
- `[...slug].astro`: Route handler that passes data to layout

### Technical Requirements

#### Libraries & Dependencies
- **html2pdf.js**: For PDF generation from HTML content
- **Web Share API**: Native sharing on supported devices (mobile browsers)
- **Fallback sharing**: Download links for unsupported browsers

#### Browser Support
- **PDF Generation**: Modern browsers supporting html2canvas + jsPDF
- **Web Share API**: Mobile browsers (iOS Safari, Android Chrome)
- **Progressive Enhancement**: Feature degrades gracefully without JS

### Current Bugs (Reported by User)
- **Bleed-Through**: The underlying page content is visible behind the PDF preview modal (z-index issue).
- **Source Code Formatting**: Code blocks look poor; needs proper monospaced fonts, syntax highlighting preservation, and "IDE-like" styling.
- **Text Alignment**: Generated PDF content is centered instead of left-aligned.

### Implementation Plan (Refined)

#### Phase 1: Core Infrastructure Setup
...

#### Phase 2: Single Problem Export (Completed)
- [x] 2.1 Export Button Integration
- [x] 2.2 PDF Generation Logic (Initial)
- [x] 2.3 Web Share Integration
- [x] 2.4 **Bug Fix**: Fix Z-Index bleed-through in ExportModal (Target: `z-[2147483647]` + Portal to Body).
- [x] 2.5 **Bug Fix**: Overhaul PDF CSS for "Source Code" fidelity (Strict Monospace, Light Theme, Pre-Wrap).
- [x] 2.6 **Bug Fix**: Force Left Alignment and safe Width (620px) to prevent clipping.
- [x] 2.7 **Enhancement**: Answer Extraction from code comments.
- [x] 2.8 **Enhancement**: Professional Branding (Header/Footer/Links).

#### Phase 3: Multi-Problem Export (Next)
- [ ] 3.1 Selection Interface (UI Ready - Logic Pending)
- [ ] 3.2 Multi-Problem PDF Generation Logic (Stitching content)
- [ ] 3.3 Batch Download optimization
...

##### 1.1 Library Integration
- Add html2pdf.js to package.json dependencies
- Create `src/lib/pdfExport.ts` utility module with:
  - PDF generation configuration
  - Element selection and formatting
  - Error handling and fallbacks

##### 1.2 Component Structure
- Create `src/components/SolutionExporter.astro` component
- Create `src/components/ExportModal.astro` for preview interface
- Create `src/components/MultiSelectModal.astro` for multi-problem selection

#### Phase 2: Single Problem Export

##### 2.1 Export Button Integration
- Add export button to EulerProblem.astro header section
- Position: Next to "View on Project Euler" link
- Styling: Consistent with existing button design (steel-blue theme)
- Icon: PDF/download icon

##### 2.2 PDF Generation Logic
- Target element: Entire article content (problem description + selected code implementation)
- PDF configuration:
  - Page format: A4
  - Margins: Standard
  - Quality: High (for code readability)
  - Filename: `euler-{problemNumber}-{title}.pdf`

##### 2.3 Web Share Integration
- Primary action: Web Share API (if supported)
- Share data: PDF file + title + description
- Fallback: Download link

#### Phase 3: Multi-Problem Export

##### 3.1 Selection Interface
- Add "Export Multiple" button to EulerProblem.astro
- Modal interface with:
  - Problem list (checkboxes)
  - Select all/deselect all
  - Current problem pre-selected
  - Difficulty/technology filtering

##### 3.2 Multi-Problem PDF Generation
- Combine multiple problem pages into single PDF
- Page breaks between problems
- Table of contents
- Filename: `euler-solutions-{timestamp}.pdf`

#### Phase 4: Preview & User Experience

##### 4.1 Preview Modal
- Before export: Show PDF preview
- Options: Page layout, margins, scaling
- Thumbnail generation for quick preview
- Edit/confirm workflow

##### 4.2 Mobile Optimization
- Touch-friendly buttons (min 44px)
- Responsive modals
- Swipe gestures for multi-select
- Web Share API prioritization on mobile

#### Phase 5: Progressive Enhancement & Accessibility

##### 5.1 JavaScript Enhancement
- Feature works without JavaScript (graceful degradation)
- Noscript fallbacks for critical functionality
- Error boundaries for PDF generation failures

##### 5.2 Accessibility Features
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader support
- ARIA labels and roles
- Focus management in modals

##### 5.3 Performance Considerations
- Lazy load html2pdf.js
- Optimize canvas rendering for large code blocks
- Memory management for multi-problem exports

### Component Architecture

#### SolutionExporter.astro
```astro
---
// Props: problem data, implementations
// State: export mode (single/multi), selected problems
---

<!-- Export buttons -->
<div class="export-controls">
  <button id="export-single">Export PDF</button>
  <button id="export-multiple">Export Multiple</button>
</div>

<!-- Modals -->
<ExportModal client:load />
<MultiSelectModal client:load />
```

#### ExportModal.astro
```astro
---
// Props: content to export, preview options
---

<dialog class="export-modal">
  <div class="preview-container">
    <!-- PDF preview -->
  </div>
  <div class="controls">
    <button>Generate PDF</button>
    <button>Share</button>
  </div>
</dialog>
```

### Integration Points

#### EulerProblem.astro Modifications
- Add export controls to header section (line ~67)
- Pass additional props for export functionality
- Include new components in layout

#### Route Modifications
- No changes needed to [...slug].astro
- All logic handled in components

### Testing Strategy

#### Unit Tests
- PDF generation utility functions
- Component rendering and interactions
- Web Share API fallbacks

#### Integration Tests
- End-to-end PDF export workflow
- Multi-problem selection and export
- Mobile sharing functionality

#### Browser Compatibility Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Android Chrome)
- Web Share API support detection

### Acceptance Criteria Validation

#### Functional Requirements
- [ ] Export button visible on all Euler problem pages
- [ ] Single problem PDF export generates correctly formatted PDF
- [ ] Multi-problem selection interface works
- [ ] PDF preview modal shows content before generation
- [ ] Web Share API integration on supported devices
- [ ] Fallback download functionality for unsupported browsers

#### Non-Functional Requirements
- [ ] No performance regression (maintain Lighthouse scores)
- [ ] Mobile-responsive design
- [ ] Accessible implementation
- [ ] Progressive enhancement (works without JS)
- [ ] Error handling for PDF generation failures

### Risk Assessment

#### High Risk
- PDF generation reliability across different code block sizes
- Web Share API browser compatibility
- Memory usage for large multi-problem exports

#### Mitigation Strategies
- Comprehensive error handling and fallbacks
- Feature detection for Web Share API
- Chunked PDF generation for large exports
- Progressive loading of export libraries

### Timeline Estimate

- Phase 1: 2-3 hours (library setup, basic components)
- Phase 2: 4-5 hours (single problem export)
- Phase 3: 3-4 hours (multi-problem export)
- Phase 4: 2-3 hours (preview and UX polish)
- Phase 5: 2-3 hours (accessibility and performance)
- Testing: 2-3 hours

**Total: 15-21 hours**

### Success Metrics

- PDF export works in target browsers
- Web Share API functions on mobile devices
- No JavaScript errors in console
- Maintains existing page performance
- Accessible via keyboard and screen readers