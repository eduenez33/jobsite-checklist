# Jobsite Checklist

A React-based web application for managing construction job sites and their associated checklists. Track multiple job sites, manage checklist items, and view site locations on an interactive map.

## Live Demo

[View Live Application](https://eduenez33.github.io/jobsite-checklist/)

## Overview

Jobsite Checklist is a single-page application that helps construction managers and contractors organize and track their job sites. The app allows users to:

- Create and manage multiple job sites
- Add detailed information including address, status, and dates
- Build custom checklists for each site with quantities and units
- Track completion status of checklist items
- View job sites on an interactive map
- Monitor project statistics (total, active, and completed sites)

All data is stored locally in the browser using localStorage, ensuring privacy and offline functionality.

## Technologies Used

### Frontend

- **React** (v18.3.1) - UI library for building component-based interfaces
- **React Router DOM** (v6.30.1) - Client-side routing with HashRouter for GitHub Pages compatibility
- **Vite** (v5.3.1) - Fast build tool and development server
- **Lucide React** (v0.552.0) - Modern icon library

### Styling

- CSS3 with custom properties
- Responsive design principles
- BEM methodology for CSS organization

### Development Tools

- ESLint - Code linting and quality checks
- gh-pages - Automated deployment to GitHub Pages

### APIs & Services

- Google Maps API - Interactive map display for job site locations
- Browser localStorage API - Client-side data persistence

## URL Routes

The application uses React Router with HashRouter for client-side navigation:

- **`/`** (or `/#/`) - Dashboard home page displaying all job sites and statistics
- **`/site/:siteId`** (or `/#/site/:siteId`) - Detailed view of a specific job site with its checklist

**Example URLs:**
- Production: `https://eduenez33.github.io/jobsite-checklist/#/`
- Production Site Detail: `https://eduenez33.github.io/jobsite-checklist/#/site/1702856400000`
- Local Dev: `http://localhost:3000/#/`
- Local Dev Site Detail: `http://localhost:3000/#/site/1702856400000`

> **Note:** HashRouter is used for GitHub Pages compatibility. All routes use the `#` prefix in the URL.

## API Endpoints (Local Storage Service)

The application uses a custom storage service that mimics API behavior with localStorage:

### Sites

- `getAllSites()` - Retrieve all job sites
- `getSiteById(id)` - Get a specific site by ID
- `createSite(siteData)` - Create a new job site
- `updateSite(id, updatedData)` - Update existing site
- `deleteSite(id)` - Delete a job site

### Checklist Items

- `addChecklistItem(siteId, itemData)` - Add item to site checklist
- `updateChecklistItem(siteId, itemId, updates)` - Update checklist item (toggle completion)
- `deleteChecklistItem(siteId, itemId)` - Remove item from checklist

### Data Model

**Site Object:**

```javascript
{
  id: number,                    // Unique identifier (timestamp)
  siteName: string,              // Name of the job site
  address: string,               // Full street address
  status: 'active' | 'completed', // Project status
  startDate: string,             // ISO date string
  estimatedCompletion: string,   // ISO date string
  checklist: Array,              // Array of checklist items
  createdAt: string              // ISO timestamp
}
```

**Checklist Item Object:**

```javascript
{
  id: number,           // Unique identifier
  text: string,         // Item description
  completed: boolean,   // Completion status
  quantity: number,     // Optional quantity
  unit: string         // Optional unit (e.g., "boxes", "tons")
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Google Maps API key (optional, for map functionality)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/eduenez33/jobsite-checklist.git
   cd jobsite-checklist
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Google Maps API (optional):**

   - Obtain an API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Add your API key to the `googleMapsService.js` file

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will open automatically at `http://localhost:3000`

## How to Use the App

### Creating a Job Site

1. Click the **"Create New Site"** button on the dashboard
2. Fill in the site details:
   - Site Name (required)
   - Address (required)
   - Status (Active/Completed)
   - Start Date
   - Estimated Completion Date
3. Click **"Create Site"** to save

### Managing Checklists

1. Click on a site card to view details
2. Add checklist items using the form:
   - Enter item name
   - Add optional quantity and unit
   - Click **"Add Item"** or press Enter
3. Check off items as completed
4. Delete items using the trash icon

### Editing and Deleting Sites

- Click the **Edit** icon on a site card to modify details
- Click the **Delete** icon to remove a site (with confirmation)

### Viewing Statistics

The dashboard displays:

- **Total Sites** - All job sites
- **Active Sites** - Sites currently in progress
- **Completed Sites** - Finished projects
