# SZMC Presentations

A professional presentation builder and viewer for SZMC with AI-powered content generation and customizable themes.

## Features

### 🎯 Core Functionality
- **Create & Manage Presentations**: Build multiple presentation decks with easy organization
- **Slide Editor**: Add, edit, reorder, and delete slides with title and content fields
- **Full-Screen Presentation Mode**: Professional distraction-free viewing with smooth transitions
- **Auto-Save**: All changes persist immediately to prevent data loss

### 🤖 AI-Powered Features
- **AI Content Generation**: Generate complete presentations from a topic description
  - Specify your topic and desired number of slides (1-20)
  - AI creates well-structured, professional content instantly
  - Review and customize generated content as needed

- **AI Slide Enhancement**: Improve individual slides with AI suggestions
  - Refine titles and content for clarity and professionalism
  - Maintain your original intent while improving structure
  - One-click enhancement for quick improvements

### 🎨 Theme Customization
Choose from 6 professional themes to match your presentation style:
- **Professional Blue**: Trust and authority for institutional settings
- **Medical Green**: Calm and healing for healthcare presentations
- **Corporate Gray**: Sophisticated and neutral for business
- **Warm Orange**: Energetic and inviting for engaging talks
- **Elegant Purple**: Creative and refined for special occasions
- **Minimal Black**: Bold and impactful for modern presentations

Each theme features carefully designed gradient backgrounds and color schemes that apply throughout presentation mode.

### ⌨️ Keyboard Shortcuts (Presentation Mode)
- `Arrow Right` or `Space`: Next slide
- `Arrow Left`: Previous slide
- `Escape`: Exit presentation mode

## Usage

### Creating a Presentation
1. Click **"New Presentation"** or **"AI Generate"** from the dashboard
2. For manual creation: Enter a title and start adding slides
3. For AI generation: Describe your topic and specify slide count

### Editing Slides
1. Select a presentation from the dashboard
2. Use the sidebar to navigate between slides
3. Edit title and content in the main editor
4. Click **"AI Enhance"** to improve individual slides
5. Use up/down arrows to reorder slides
6. Click **"Theme"** to change the presentation's visual style

### Presenting
1. Click **"Present"** from the editor view
2. Use arrow keys or buttons to navigate
3. Press `Escape` or click the X button to exit

## Technical Details

Built with:
- React 19 with TypeScript
- Spark Runtime SDK for AI integration and data persistence
- Tailwind CSS + shadcn/ui components
- Framer Motion for smooth animations
- Phosphor Icons

## Data Persistence

All presentations are automatically saved using the Spark KV store, ensuring your work is preserved between sessions.

---

📄 License: MIT License, Copyright GitHub, Inc.
