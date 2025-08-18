# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based SaaS landing page template, specifically configured for promoting a WordPress Contact Form Management plugin. The landing page showcases features like multi-tenant architecture, AI-powered analysis, encryption, and WordPress integration.

## Tech Stack

- **Astro** - Static site generator with component-based architecture
- **Tailwind CSS v4 (Alpha)** - Utility-first CSS framework
- **TypeScript** - Type safety and modern JavaScript features

## Development Commands

All commands are run from the root of the project:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run start` | Alias for `npm run dev` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro` | Access Astro CLI commands |

**Note**: The development server runs on port 4321 (not 3000 as mentioned in some documentation).

## Architecture Overview

### Project Structure
- **`src/pages/`** - File-based routing (index.astro, login.astro, signup.astro, etc.)
- **`src/layouts/BaseLayout.astro`** - Main layout wrapper with Navigation and Footer
- **`src/components/`** - Organized by feature areas:
  - `landing/` - Landing page sections (Hero, Pricing, etc.)
  - `global/` - Site-wide components (Navigation, Footer, Testimonial)
  - `Forms/` - Authentication forms (Login, Signup)
  - `infopages/` - Legal/info pages (FAQ, Privacy, Terms)

### Styling System
- **Tailwind CSS v4 (Alpha)** - Uses single `src/styles/global.css` file
- **Custom theme** defined in `@theme` directive with accent and base color systems
- **Inter/InterVariable** fonts with fallbacks
- No separate `tailwind.config.js` - configuration handled in CSS file

### Key Configuration
- **`astro.config.mjs`** - Includes Tailwind CSS via Vite plugin and sitemap integration
- **Site URL** placeholder at `https://yoursite.com` (needs to be updated for production)
- **TypeScript** configured for modern ESNext features with node-style module resolution

## Landing Page Purpose

This template promotes a Contact Form Management WordPress plugin with these key features:

### Core Plugin Features to Highlight
- **Multi-tenant Architecture** - Workspace-based isolation for different clients
- **AI-Powered Analysis** - Spam detection, categorization, sentiment analysis
- **End-to-End Encryption** - Secure data handling and storage
- **WordPress Integration** - Seamless WPForms bridge plugin
- **Professional Inbox** - Advanced filtering, sorting, and management
- **Email Reply Integration** - Direct email responses from the plugin

### Target Audience
- **WordPress Site Owners** - Need better contact form management
- **Digital Agencies** - Managing multiple client websites
- **Businesses** - Requiring professional contact form handling
- **Developers** - Looking for secure, scalable form solutions

## Development Notes

### Tailwind CSS v4 Specifics
- Uses `@import "tailwindcss"` and `@plugin` directives in CSS
- Custom properties defined in `@theme` block in `global.css`
- Alpha version features may change - monitor Tailwind CSS updates

### Component Architecture
- Landing page uses modular section components (Hero, SectionOne, SectionTwo, etc.)
- BaseLayout provides consistent Navigation and Footer across all pages
- Authentication forms (Login/Signup) are separate from main landing flow

### Asset Organization
- Static assets in `public/` directory
- Brand icons and dashboard screenshots included for product demonstration
- SVG icons for integrations (WordPress, WPForms, Linear, etc.)

## Important Technical Details

### External Dependencies
- **Inter/InterVariable Fonts** - Loaded from rsms.me CDN in BaseHead.astro
- **Alpine.js v3.10.5** - Included via CDN for interactive components
- **Astro Sitemap** - Auto-generates sitemap.xml for SEO

### SEO and Meta Configuration
- **BaseHead.astro** contains comprehensive SEO setup with OpenGraph and Twitter cards
- **Placeholder URLs** (`https://yoursite.com`, `https://www.yourwebsite.com/`) need updating for production
- **FormFlow branding** already integrated throughout meta tags and content

### Page Architecture
- **File-based routing** - Each `.astro` file in `src/pages/` becomes a route
- **BaseLayout.astro** wrapper provides consistent header/footer across all pages
- **Landing page sections** are modular and can be reordered in `src/pages/index.astro`

### WordPress Integration Theme
This template specifically promotes a WordPress contact form management plugin with:
- WPForms integration messaging
- WordPress ecosystem branding
- Professional form management positioning