# Assignment 1 - Travlog

## Overview

Travlog is Assignment 1 built under Josh Technology Group's Frontend induction programme. It is built in HTML, SCSS and JavaScript. This project is accessible and responsive and supports all browsers. The project follows BEM naming conventions and SCSS 7-folder structure.

## Tech Stack

-   HTML
-   SCSS
-   JS
-   Icomoon
-   ESLint
-   Prettier
-   Vite Plugins
-   Husky
-   Splide.Js

## User Manual

### Prerequisites

-   **Node.js**: Version 18+ or 20+. You can download and install it from nodejs.org.
-   **npm**: Node.js package manager, which comes bundled with Node.js.

### Installing

To set up the project on your local environment, follow these steps:

1. **Clone the Repository**

    First, you need to clone the repository.

2. **nvm (Node Version Manager)**: If the required Node version 18+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:

    - **Switch Node Version**: If the required Node version is already installed, run:

    ```bash
    nvm use
    ```

    - **Install Node Version**: If the required Node version isn’t installed, you can install it by running:

    ```bash
    nvm install
    ```

    > **_Tip:_** If you don't have nvm installed, you can install it by following the instructions on [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

    Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.

3. **Install the necessary dependencies using npm**

    ```bash
    npm install
    ```

4. **Run the Development Server**

    ```bash
    npm run dev
    ```

    The app will typically be available at http://localhost:3000, but check the terminal output for the exact URL.

    > **_NOTE:_** Note: If you want to change the server's port number, you can do so by modifying the **vite.config.js** file at the root level of the project:

    ```js
    server{
        port:<New Port>,
    }
    ```

5. **Build the Project**

    ```bash
    npm run build
    ```

    This command will generate the optimized files in the dist directory.

6. **Lint the Code**
    ```bash
    npm run lint
    ```

## Directory Structure

├── public
│ └── assets
│ ├── favicon.svg
│ ├── fonts
│ │ ├── CircularStd-Bold.woff2
│ │ ├── CircularStd-Book.woff2
│ │ ├── figtree-bold.woff2
│ │ ├── figtree-medium.woff2
│ │ ├── icomoon.woff
│ │ ├── Inter-Bold.woff2
│ │ ├── Inter-Regular.woff2
│ │ ├── Inter-SemiBold.woff2
│ │ ├── roboto-mono-bold.woff2
│ │ └── selection.json
│ └── images
│ ├── footer-icon.webp
│ ├── hero-beach.webp
│ ├── hero-city.webp
│ ├── hero-earth-bg.webp
│ ├── hero-mountain.webp
│ ├── testimonial-bg.webp
│ ├── testimonials-bg.webp
│ ├── testimonials-profile.webp
│ ├── travelpoint-icon.webp
│ └── travel-point-img.webp
├── src
│ ├── script
│ │ ├── constants.js
│ │ ├── deals.js
│ │ ├── footer.js
│ │ ├── index.js
│ │ ├── navbar.js
│ │ ├── testimonials.js
│ │ ├── travelpoint.js
│ │ └── utility.js
│ └── styles
│ ├── abstracts
│ │ ├── \_colors.scss
│ │ ├── \_functions.scss
│ │ ├── \_index.scss
│ │ ├── \_mixins.scss
│ │ └── \_variables.scss
│ ├── base
│ │ ├── \_base.scss
│ │ ├── \_index.scss
│ │ ├── \_reset.scss
│ │ └── \_typography.scss
│ ├── components
│ │ ├── \_arrow.scss
│ │ ├── \_badge.scss
│ │ ├── \_buttons.scss
│ │ ├── \_cards.scss
│ │ ├── \_index.scss
│ │ ├── \_links.scss
│ │ └── \_spin-wheel.scss
│ ├── layout
│ │ ├── \_deals.scss
│ │ ├── \_footer.scss
│ │ ├── \_hero.scss
│ │ ├── \_index.scss
│ │ ├── \_navbar.scss
│ │ ├── \_partners.scss
│ │ ├── \_testimonial.scss
│ │ └── \_travelpoint.scss
│ ├── main.scss
│ ├── pages
│ ├── themes
│ │ ├── \_index.scss
│ │ └── \_theme.scss
│ └── vendors
│ ├── \_icomoon.scss
│ ├── \_index.scss
│ └── \_splide.scss
├── vite.config.js
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── prettier.config.js

## Browser Support

-   Chrome
-   Firefox
