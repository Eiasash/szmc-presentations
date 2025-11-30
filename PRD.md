# Planning Guide

A professional presentation builder and viewer for SZMC that enables users to create, manage, and present slide-based content with AI-powered content generation, customizable themes, and a clean institutional interface suitable for medical or organizational presentations.

**Experience Qualities**: 
1. **Professional** - The interface should inspire confidence and credibility, appropriate for medical or institutional settings
2. **Intelligent** - AI-powered features that enhance productivity without overwhelming the user
3. **Efficient** - Streamlined workflows that allow quick creation and seamless presentation delivery

**Complexity Level**: Light Application (multiple features with basic state)
  - The app includes presentation creation, editing, slide management, AI content generation, theme customization, and a full-screen presentation mode with navigation

## Essential Features

### AI Content Generation
- **Functionality**: Generate complete presentations from a topic description using AI
- **Purpose**: Accelerate presentation creation and provide structured starting points
- **Trigger**: User clicks "AI Generate" button from the main dashboard
- **Progression**: Click AI Generate → Enter topic and slide count → AI creates slides → Review and edit generated content
- **Success criteria**: AI generates relevant, well-structured slides that users can immediately use or customize

### AI Slide Enhancement
- **Functionality**: Improve individual slide content using AI suggestions
- **Purpose**: Refine and professionalize slide content quickly
- **Trigger**: User clicks "AI Enhance" button while editing a slide
- **Progression**: Edit slide → Click AI Enhance → AI improves title and content → User accepts or continues editing
- **Success criteria**: Enhanced content is more professional, clear, and well-structured while maintaining the original intent

### Theme Customization
- **Functionality**: Choose from multiple visual themes for presentations
- **Purpose**: Match presentation style to audience and occasion
- **Trigger**: User clicks "Theme" button while editing a presentation
- **Progression**: Click Theme → Preview theme options → Select theme → Presentation mode reflects chosen theme
- **Success criteria**: Theme changes apply immediately to presentation mode with appropriate colors and styling

### Presentation Management
- **Functionality**: Create, edit, and delete presentations with titles and metadata
- **Purpose**: Organize multiple presentation decks for different topics or events
- **Trigger**: User clicks "New Presentation" button or selects existing presentation
- **Progression**: Click new presentation → Enter title → Auto-save → View in list → Select to edit
- **Success criteria**: Presentations persist between sessions and can be accessed from the main dashboard

### Slide Editor
- **Functionality**: Add, edit, reorder, and delete slides with title and content fields
- **Purpose**: Build presentation content in a structured, easy-to-manage format
- **Trigger**: User opens a presentation from the dashboard
- **Progression**: View slide list → Click add slide → Enter title and content → Save automatically → Reorder via drag or buttons → Delete unwanted slides
- **Success criteria**: All slide changes persist immediately, slides can be reordered, and content supports formatting

### Presentation Mode
- **Functionality**: Full-screen slide viewer with keyboard/button navigation and themed backgrounds
- **Purpose**: Deliver presentations professionally with distraction-free viewing
- **Trigger**: User clicks "Present" button from editor view
- **Progression**: Click present → Enter fullscreen with theme → Navigate with arrows/keys → Display slide number → Exit to editor
- **Success criteria**: Smooth transitions, keyboard shortcuts work, slide counter visible, theme applies correctly, easy exit

### Slide Navigation
- **Functionality**: Move between slides using arrow keys, buttons, or click navigation
- **Purpose**: Provide flexible control during presentation delivery
- **Trigger**: User initiates navigation in presentation mode
- **Progression**: Press arrow key or click button → Slide transitions → Counter updates → Cannot go beyond bounds
- **Success criteria**: Navigation is responsive, smooth, and predictable with visual feedback

### Export Presentations
- **Functionality**: Export presentations to PDF or PowerPoint (PPTX) formats
- **Purpose**: Enable sharing, distribution, and offline presentation delivery
- **Trigger**: User clicks "Export" dropdown button while editing a presentation
- **Progression**: Click Export → Select format (PDF or PowerPoint) → File downloads with presentation content and theme styling
- **Success criteria**: Exported files maintain visual theme, include all slides with proper formatting, and can be opened in standard viewers

## Edge Case Handling
- **Empty presentations**: Show helpful empty state with guidance to add first slide, disable export button
- **Single slide**: Disable previous/next navigation appropriately, show 1/1 counter
- **Long content**: Implement scroll within slides if content exceeds viewport, handle text overflow in exports
- **Unsaved work**: Auto-save all changes immediately to prevent data loss
- **Deleted presentations**: Confirm before deletion with clear warning message
- **AI generation failures**: Show clear error messages and allow retry without losing input
- **AI rate limiting**: Gracefully handle API limits with informative messages
- **Invalid AI responses**: Fallback to default content or show error without breaking the app
- **Theme persistence**: Save theme choice with presentation for consistent viewing and export
- **Export failures**: Show error toast with clear message, allow retry
- **Large exports**: Display loading state during export generation

## Design Direction
The design should feel professional, trustworthy, and institutional - appropriate for medical or organizational settings. It should project authority and clarity while remaining approachable. A minimal interface serves the content-first purpose, ensuring presentations remain the focus while the tools feel sophisticated and purpose-built.

## Color Selection
Complementary (opposite colors) - Using a calm, professional blue as the primary brand color to convey trust and authority, with warm accent colors to add energy and highlight important actions.

- **Primary Color**: Deep professional blue (oklch(0.45 0.15 250)) - communicates trust, stability, and professionalism appropriate for medical/institutional context
- **Secondary Colors**: Light neutral backgrounds (oklch(0.98 0 0)) for cards and subtle grays for de-emphasized content
- **Accent Color**: Warm coral (oklch(0.65 0.18 25)) for call-to-action buttons and active states, providing energy without being aggressive
- **Foreground/Background Pairings**:
  - Background (Light off-white oklch(0.98 0.005 250)): Dark text (oklch(0.25 0.02 250)) - Ratio 12.1:1 ✓
  - Card (Pure white oklch(1 0 0)): Dark text (oklch(0.25 0.02 250)) - Ratio 14.2:1 ✓
  - Primary (Deep blue oklch(0.45 0.15 250)): White text (oklch(1 0 0)) - Ratio 7.8:1 ✓
  - Secondary (Light gray oklch(0.96 0.005 250)): Dark text (oklch(0.30 0.02 250)) - Ratio 10.5:1 ✓
  - Accent (Warm coral oklch(0.65 0.18 25)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓
  - Muted (Medium gray oklch(0.94 0 0)): Medium text (oklch(0.50 0.02 250)) - Ratio 5.2:1 ✓

## Font Selection
Typography should convey professionalism and clarity with excellent legibility for both interface elements and presentation content. Using Inter for UI elements provides a clean, modern feel, while using a larger, more readable sans-serif for slide content ensures presentations are clear even from a distance.

- **Typographic Hierarchy**:
  - H1 (Presentation Title): Inter SemiBold/32px/tight letter spacing/-0.02em
  - H2 (Slide Title in Editor): Inter SemiBold/24px/normal letter spacing
  - H3 (Slide Title in Presentation): Inter Bold/48px/tight letter spacing for visibility
  - Body (Editor Content): Inter Regular/16px/relaxed line-height 1.6
  - Body (Presentation Content): Inter Regular/28px/relaxed line-height 1.7 for distance reading
  - Small (Metadata/Counters): Inter Medium/14px/normal letter spacing
  - Caption (Helper text): Inter Regular/13px/muted color

## Animations
Animations should be purposeful and professional - nothing flashy or distracting, but enough motion to guide attention and provide feedback. The balance leans heavily toward subtle functionality with occasional moments of delight during key interactions like entering presentation mode.

- **Purposeful Meaning**: Slide transitions use smooth fades to maintain professionalism; button hovers provide subtle lift to indicate interactivity; entering presentation mode uses a gentle scale-up to signal mode change
- **Hierarchy of Movement**: Primary focus on slide transitions and navigation feedback; secondary focus on card hovers and button states; minimal movement in editor to avoid distraction

## Component Selection
- **Components**: 
  - Card (presentation list items, slide previews, theme preview) - with subtle shadow and hover lift
  - Button (primary actions: "New Presentation", "Present", "Add Slide", "AI Generate", "AI Enhance") - with accent color for primary, ghost for secondary
  - Input (presentation title, slide title, slide count) - clean with focus ring
  - Textarea (slide content, AI topic description) - generous padding and height
  - Dialog (delete confirmations, AI generation, theme selection) - centered modal with clear actions
  - Separator (dividing sections in editor)
  - ScrollArea (slide list, long content in presentation mode)
  
- **Customizations**: 
  - Full-screen presentation viewer component with themed gradient backgrounds
  - Theme preview cards with visual samples
  - AI generation modal with loading states
  - Slide navigation controls with keyboard shortcut indicators
  - Draggable slide reorder interface or simple up/down arrows
  - Empty state illustrations for new presentations
  
- **States**: 
  - Buttons: default (solid accent), hover (slight lift + darker), active (pressed down), disabled (low opacity + no hover), loading (spinner for AI)
  - Inputs: default (subtle border), focus (accent ring + border), filled (subtle background change), disabled (during AI generation)
  - Cards: default (white + shadow), hover (lifted shadow + border accent), selected (accent border), theme preview (gradient background)
  - Slides in editor: default, hover (background change), selected/active (accent left border)
  
- **Icon Selection**: 
  - Plus (add new presentation/slide)
  - Presentation/Monitor (present mode)
  - Pencil (edit)
  - Trash (delete)
  - ArrowLeft/ArrowRight (slide navigation)
  - X (close/exit)
  - List (slide overview)
  - CaretUp/CaretDown (reorder slides)
  - Sparkle (AI features - filled for emphasis)
  - Palette (theme selection)
  - Check (selected theme indicator)
  - Download (export menu)
  - FilePdf (PDF export option)
  - FilePpt (PowerPoint export option)
  
- **Spacing**: 
  - Container padding: p-6 (24px) for main areas
  - Card padding: p-6 for generous whitespace, p-4 for compact cards
  - Gap between cards: gap-4 (16px) for visual separation
  - Gap in forms: gap-3 (12px) for related fields
  - Section margins: mb-8 (32px) between major sections
  - Button groups: gap-2 (8px) for related actions
  
- **Mobile**: 
  - Stack presentation cards vertically on mobile
  - Reduce padding to p-4 on small screens
  - Simplify editor to single-slide focus with navigation
  - Touch-friendly button sizing (min 44px tap targets)
  - Hide slide preview sidebar on mobile, show slide counter prominently
  - Presentation mode adapts font sizes for smaller screens while maintaining readability
  - Stack theme preview cards in single column on mobile
  - Simplify AI generation form for mobile viewports
