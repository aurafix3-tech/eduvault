# EduVault UI/UX Wireframes and Design Guidelines

## Design Philosophy

EduVault follows a modern, clean, and accessible design approach with:
- **Primary Color**: #1976d2 (Blue) - Trust, reliability, education
- **Secondary Color**: #dc004e (Pink/Red) - Energy, action, premium features
- **Typography**: Roboto font family for readability
- **Layout**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliance

## Page Wireframes

### 1. Homepage (`/`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR: Logo | Home | Resources | Jobs | Login/Profile]    │
├─────────────────────────────────────────────────────────────┤
│                    HERO SECTION                             │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │                 │  │ Your Gateway to Educational     │   │
│  │   [SCHOOL ICON] │  │ Excellence                      │   │
│  │                 │  │                                 │   │
│  │                 │  │ [Institution Dropdown]          │   │
│  └─────────────────┘  │ [Get Started Button]            │   │
│                       └─────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                   FEATURES SECTION                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │[VIDEO]  │ │[PAPERS] │ │[AI BOT] │ │ [JOBS]  │          │
│  │Lectures │ │Past     │ │Study    │ │Career   │          │
│  │         │ │Papers   │ │Assistant│ │Opps     │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
├─────────────────────────────────────────────────────────────┤
│                    STATS SECTION                            │
│   10,000+     50,000+      100+        95%                 │
│  Students    Resources  Institutions Success Rate          │
├─────────────────────────────────────────────────────────────┤
│                     CTA SECTION                             │
│        Ready to Excel in Your Studies?                     │
│     [Get Started Free] [Sign In]                           │
└─────────────────────────────────────────────────────────────┘
│                     FOOTER                                  │
└─────────────────────────────────────────────────────────────┘
```

### 2. Login Page (`/login`)

```
┌─────────────────────────────────────────────────────────────┐
│                    CENTERED CARD                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              [SCHOOL ICON]                          │   │
│  │            Welcome Back                             │   │
│  │    Sign in to access your EduVault account         │   │
│  │                                                     │   │
│  │  [📧] Email Address                                 │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │                                             │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  [🔒] Password                              [👁]    │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │                                             │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │           [Sign In Button]                          │   │
│  │                                                     │   │
│  │         Forgot your password?                       │   │
│  │    Don't have an account? Sign up here             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Registration Page (`/register`)

```
┌─────────────────────────────────────────────────────────────┐
│                    STEPPER FORM                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              [SCHOOL ICON]                          │   │
│  │              Join EduVault                          │   │
│  │                                                     │   │
│  │  ○────────○────────○                               │   │
│  │ Personal Academic Account                           │   │
│  │  Info     Info    Setup                             │   │
│  │                                                     │   │
│  │  STEP 1: Personal Information                       │   │
│  │  ┌─────────────────┐ ┌─────────────────┐           │   │
│  │  │ First Name      │ │ Last Name       │           │   │
│  │  └─────────────────┘ └─────────────────┘           │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ Phone Number                                │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │              [Back] [Next]                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4. Institution Page (`/institution/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR]                                                    │
├─────────────────────────────────────────────────────────────┤
│              INSTITUTION HEADER                             │
│  ┌─────────┐  KENYA MEDICAL TRAINING COLLEGE               │
│  │[LOGO]   │  Established 1927 • Nairobi, Kenya           │
│  │         │  📧 info@kmtc.ac.ke 📞 +254 20 2725711       │
│  └─────────┘                                               │
├─────────────────────────────────────────────────────────────┤
│                   COURSES GRID                              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐   │
│  │ Clinical Medicine│ │    Nursing      │ │  Pharmacy   │   │
│  │ & Community     │ │                 │ │             │   │
│  │ Health          │ │ 3 Years         │ │ 4 Years     │   │
│  │ 3 Years         │ │ 6 Semesters     │ │ 8 Semesters │   │
│  │ 6 Semesters     │ │                 │ │             │   │
│  │ [View Course]   │ │ [View Course]   │ │[View Course]│   │
│  └─────────────────┘ └─────────────────┘ └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 5. Course Page (`/course/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR]                                                    │
├─────────────────────────────────────────────────────────────┤
│                  COURSE HEADER                              │
│  Diploma in Clinical Medicine and Community Health          │
│  KMTC • 3 Years • Clinical Medicine Department              │
│                                                             │
│  [Year 1] [Year 2] [Year 3]                                │
├─────────────────────────────────────────────────────────────┤
│                   YEAR 1 UNITS                             │
│                                                             │
│  Semester 1                    Semester 2                  │
│  ┌─────────────────────────┐   ┌─────────────────────────┐ │
│  │ ANAT101                 │   │ ANAT102                 │ │
│  │ Human Anatomy I         │   │ Human Anatomy II        │ │
│  │ 4 Credit Hours          │   │ 4 Credit Hours          │ │
│  │ [View Resources]        │   │ [View Resources]        │ │
│  └─────────────────────────┘   └─────────────────────────┘ │
│  ┌─────────────────────────┐   ┌─────────────────────────┐ │
│  │ PHYS101                 │   │ PHYS102                 │ │
│  │ Human Physiology I      │   │ Human Physiology II     │ │
│  │ 4 Credit Hours          │   │ 4 Credit Hours          │ │
│  │ [View Resources]        │   │ [View Resources]        │ │
│  └─────────────────────────┘   └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 6. Resources Page (`/resources`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR]                                                    │
├─────────────────────────────────────────────────────────────┤
│                    FILTERS BAR                              │
│  [Institution ▼] [Course ▼] [Year ▼] [Type ▼] [Search...]  │
├─────────────────────────────────────────────────────────────┤
│                  RESOURCES GRID                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎥 Human Anatomy Lecture 1          [PREMIUM] 💎   │   │
│  │ ANAT101 • Year 1 Semester 1                        │   │
│  │ Dr. Jane Smith • 45 minutes                         │   │
│  │ 👁 1,234 views • ⬇ 567 downloads                   │   │
│  │                                    [View] [Download] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Past Paper - Anatomy Final Exam  [PREMIUM] 💎   │   │
│  │ ANAT101 • December 2023                             │   │
│  │ PDF • 2.3 MB                                        │   │
│  │ 👁 892 views • ⬇ 445 downloads                     │   │
│  │                                    [View] [Download] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [AI CHATBOT WIDGET]                                        │
│  💬 Ask me anything about your studies!                     │
└─────────────────────────────────────────────────────────────┘
```

### 7. Jobs Page (`/jobs`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR]                                                    │
├─────────────────────────────────────────────────────────────┤
│                    FILTERS BAR                              │
│  [Course ▼] [Type ▼] [Experience ▼] [Location ▼] [Search]  │
├─────────────────────────────────────────────────────────────┤
│                    JOBS LIST                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Clinical Officer - Nairobi Hospital    [UNLOCK 200] │   │
│  │ 🏥 Nairobi Hospital • Nairobi                       │   │
│  │ 💰 KSH 80,000 - 120,000/month                      │   │
│  │ 📅 Full Time • Junior Level                         │   │
│  │ 🎯 Clinical Medicine, Patient Care                   │   │
│  │ 📍 Deadline: 30 days                                │   │
│  │                                         [View More] │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Software Developer - Tech Startup      [UNLOCK 200] │   │
│  │ 💻 InnovateTech Kenya • Remote                      │   │
│  │ 💰 KSH 100,000 - 180,000/month                     │   │
│  │ 📅 Full Time • Entry Level                          │   │
│  │ 🎯 JavaScript, Python, React                        │   │
│  │ 📍 Deadline: 45 days                                │   │
│  │                                         [View More] │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 8. Admin Dashboard (`/admin`)

```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR with Admin Badge]                                   │
├─────────────────────────────────────────────────────────────┤
│                  DASHBOARD STATS                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 1,234   │ │   567   │ │   89    │ │   23    │          │
│  │Students │ │Resources│ │ Pending │ │ Jobs    │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
├─────────────────────────────────────────────────────────────┤
│                 QUICK ACTIONS                               │
│  [Upload Resource] [Create Job] [Manage Users] [Reports]    │
├─────────────────────────────────────────────────────────────┤
│                PENDING APPROVALS                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Anatomy Notes - John Doe                        │   │
│  │ Uploaded 2 hours ago                                │   │
│  │                              [Approve] [Reject]    │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎥 Physiology Lecture - Jane Smith                 │   │
│  │ Uploaded 5 hours ago                                │   │
│  │                              [Approve] [Reject]    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Mobile Responsive Design

### Mobile Navigation
- Hamburger menu for navigation
- Collapsible sidebar
- Touch-friendly buttons (minimum 44px)
- Swipe gestures for cards

### Mobile Layout Adjustments
- Single column layout
- Larger touch targets
- Simplified forms
- Bottom navigation for key actions

## Accessibility Features

### Visual Accessibility
- High contrast ratios (4.5:1 minimum)
- Focus indicators
- Alternative text for images
- Scalable fonts

### Keyboard Navigation
- Tab order management
- Skip links
- Keyboard shortcuts
- Focus management

### Screen Reader Support
- Semantic HTML
- ARIA labels
- Descriptive headings
- Status announcements

## Interactive Elements

### Buttons
```css
Primary Button: Blue background, white text, rounded corners
Secondary Button: White background, blue border, blue text
Danger Button: Red background, white text
Disabled Button: Gray background, gray text
```

### Cards
```css
Elevation: 4dp shadow
Border Radius: 16px
Padding: 24px
Hover Effect: Lift animation (translateY(-4px))
```

### Forms
```css
Input Fields: Outlined style with floating labels
Error States: Red border and error message
Success States: Green border and checkmark
Focus States: Blue border and shadow
```

### Loading States
- Skeleton screens for content loading
- Progress indicators for file uploads
- Spinner for form submissions
- Shimmer effects for image loading

## Animation Guidelines

### Micro-interactions
- Button hover effects (0.2s ease)
- Card lift on hover (0.3s ease-out)
- Form field focus animations (0.15s ease)
- Page transitions (0.4s ease-in-out)

### Loading Animations
- Fade in for content (0.5s ease-in)
- Slide up for modals (0.3s ease-out)
- Scale for buttons (0.1s ease)

## Color Palette

### Primary Colors
- Primary Blue: #1976d2
- Primary Blue Light: #42a5f5
- Primary Blue Dark: #1565c0

### Secondary Colors
- Secondary Pink: #dc004e
- Secondary Pink Light: #ff5983
- Secondary Pink Dark: #9a0036

### Neutral Colors
- Background: #f5f5f5
- Surface: #ffffff
- Text Primary: #212121
- Text Secondary: #757575
- Divider: #e0e0e0

### Status Colors
- Success: #4caf50
- Warning: #ff9800
- Error: #f44336
- Info: #2196f3

## Typography Scale

### Headings
- H1: 3.5rem (56px) - Hero titles
- H2: 2.5rem (40px) - Section headers
- H3: 2rem (32px) - Subsection headers
- H4: 1.5rem (24px) - Card titles
- H5: 1.25rem (20px) - List headers
- H6: 1rem (16px) - Small headers

### Body Text
- Body 1: 1rem (16px) - Primary text
- Body 2: 0.875rem (14px) - Secondary text
- Caption: 0.75rem (12px) - Captions and labels
- Button: 0.875rem (14px) - Button text

## Component Library

### Navigation Components
- Top Navigation Bar
- Sidebar Navigation
- Breadcrumbs
- Pagination
- Tab Navigation

### Data Display
- Cards
- Tables
- Lists
- Statistics Cards
- Progress Indicators

### Input Components
- Text Fields
- Select Dropdowns
- Checkboxes
- Radio Buttons
- File Upload
- Search Bar

### Feedback Components
- Alerts
- Snackbars
- Modals
- Tooltips
- Loading Spinners

### Layout Components
- Grid System
- Containers
- Spacers
- Dividers
- Sections
