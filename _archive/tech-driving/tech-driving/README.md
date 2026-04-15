# Tech Driving - Driving School Website

Welcome to the Tech Driving project! This repository contains the code for a modern, responsive driving school website that offers a unique 3D scroll-based experience on the landing page and structured content across additional pages.

## Project Structure

- **app/**: Contains all the application code.
  - **about/**: About page with structured content.
  - **courses/**: Courses page detailing training programs.
  - **why/**: Reasons to choose this driving school, featuring quality highlights.
  - **contact/**: Contact information and location with embedded Google Maps.
  - **components/**: Reusable components for the application.
    - **DrivingScrollSequence.tsx**: 3D scroll-based animation component.
    - **Navbar.tsx**: Navigation bar with language toggle.
    - **PageHeader.tsx**: Consistent headers for pages.
    - **SectionCard.tsx**: Card component for displaying content.
    - **ScrollProgress.tsx**: Scroll progress indicator.
  - **layout.tsx**: Overall layout including navbar and global styles.
  - **page.tsx**: Landing page.
  - **globals.css**: Global styles and CSS variables.

- **public/**: Contains static assets like images.
  - **D_school-jpg/**: Directory for images used in the application.

- **package.json**: Lists project dependencies and scripts.

- **tailwind.config.ts**: Configures Tailwind CSS for styling.

- **tsconfig.json**: TypeScript configuration settings.

- **postcss.config.js**: Configures PostCSS for processing CSS.

## Features

- **3D Scroll Animation**: Engaging landing page with a unique scroll-based animation.
- **Responsive Design**: All pages are fully responsive and maintain a consistent design.
- **Language Toggle**: Switch between English and Gujarati without reloading the page.
- **Google Maps Integration**: Contact page includes an embedded Google Map for location.
- **Visually Appealing Cards**: Features and training details are displayed in attractive card formats.
- **Dynamic Content**: JSON-based translation system for language switching.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd tech-driving
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.