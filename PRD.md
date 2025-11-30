# Planning Guide

A professional presentation builder and viewer for SZMC that enables users to create, manage, and present slide-based content with a clean, institutional interface suitable for medical or organizational presentations.

**Experience Qualities**: 
1. **Professional** - The interface should inspire confidence and credibility, appropriate for medical or institutional settings
2. **Focused** - Clear visual hierarchy that keeps attention on the content without distracting elements
3. **Efficient** - Streamlined workflows that allow quick creation and seamless presentation delivery

**Complexity Level**: Light Application (multiple features with basic state)
  - The app includes presentation creation, editing, slide management, and a full-screen presentation mode with navigation

## Essential Features

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
- **Functionality**: Full-screen slide viewer with keyboard/button navigation
- **Purpose**: Deliver presentations professionally with distraction-free viewing
- **Trigger**: User clicks "Present" button from editor view
- **Progression**: Click present → Enter fullscreen → Navigate with arrows/keys → Display slide number → Exit to editor
- **Success criteria**: Smooth transitions, keyboard shortcuts work, slide counter visible, easy exit

### Slide Navigation
- **Functionality**: Move between slides using arrow keys, buttons, or click navigation
- **Purpose**: Provide flexible control during presentation delivery
- **Trigger**: User initiates navigation in presentation mode
- **Progression**: Press arrow key or click button → Slide transitions → Counter updates → Cannot go beyond bounds
- **Success criteria**: Navigation is responsive, smooth, and predictable with visual feedback

## Edge Case Handling
- **Empty presentations**: Show helpful empty state with guidance to add first slide
- **Single slide**: Disable previous/next navigation appropriately, show 1/1 counter
- **Long content**: Implement scroll within slides if content exceeds viewport
- **Unsaved work**: Auto-save all changes immediately to prevent data loss
- **Deleted presentations**: Confirm before deletion with clear warning message

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
  - Card (presentation list items, slide previews) - with subtle shadow and hover lift
  - Button (primary actions: "New Presentation", "Present", "Add Slide") - with accent color for primary, ghost for secondary
  - Input (presentation title, slide title) - clean with focus ring
  - Textarea (slide content) - generous padding and height
  - Dialog (delete confirmations) - centered modal with clear actions
  - Separator (dividing sections in editor)
  - ScrollArea (slide list, long content in presentation mode)
  
- **Customizations**: 
  - Full-screen presentation viewer component with dark background
  - Slide navigation controls with keyboard shortcut indicators
  - Draggable slide reorder interface or simple up/down arrows
  - Empty state illustrations for new presentations
  
- **States**: 
  - Buttons: default (solid accent), hover (slight lift + darker), active (pressed down), disabled (low opacity + no hover)
  - Inputs: default (subtle border), focus (accent ring + border), filled (subtle background change)
  - Cards: default (white + shadow), hover (lifted shadow + border accent), selected (accent border)
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
  
- **Spacing**: 
  - Container padding: p-6 (24px) for main areas
  - Card padding: p-6 for generous whitespace
  - Gap between cards: gap-4 (16px) for visual separation
  - Gap in forms: gap-3 (12px) for related fields
  - Section margins: mb-8 (32px) between major sections
  
- **Mobile**: 
  - Stack presentation cards vertically on mobile
  - Reduce padding to p-4 on small screens
  - Simplify editor to single-slide focus with navigation
  - Touch-friendly button sizing (min 44px tap targets)
  - Hide slide preview sidebar on mobile, show slide counter prominently
  - Presentation mode adapts font sizes for smaller screens while maintaining readability
