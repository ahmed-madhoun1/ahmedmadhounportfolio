# Ahmed Almadhoun Portfolio

A responsive personal portfolio website built with React, Vite, and Tailwind CSS.
Strictly follows the provided content and design requirements.

## Features
- **Responsive Design**: Mobile-first layout adaptable to all screens.
- **Dark Mode**: Toggle between light and dark themes.
- **Smooth Navigation**: Sticky navbar with smooth scrolling.
- **Project Showcase**: Expandable cards for detailed project descriptions.
- **Performance**: Optimized with Vite and lightweight icons.

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/ahmedalmadhoun-portfolio.git
   cd ahmedalmadhoun-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   npm run dev
   ```

## Deployment
This project is configured to deploy to **GitHub Pages** using GitHub Actions.

1. Push changes to the `main` branch.
2. The `.github/workflows/deploy.yml` workflow will automatically build and deploy to the `gh-pages` branch.
3. Enable GitHub Pages in your repository settings:
   - Go to **Settings** > **Pages**.
   - Select Source: **Deploy from a branch**.
   - Select Branch: **gh-pages** / /(root).

## License
MIT
