---
# E-Waste Calculator

This project is an **E-Waste Calculator** built using [Create React App](https://github.com/facebook/create-react-app). The app helps users estimate the impact of their electronic waste, encouraging sustainable disposal practices.

## Overview

-The E-Waste Calculator leverages React for dynamic user interfaces and Material UI Icons for a modern design. It features a Slider component to input data and uses AWS Amplify Gen2 for backend services like authentication, API, and data storage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Material UI Icons**: Provides a rich set of icons to enhance the UI.
- **Slider**: A UI component for smooth input controls.
- **AWS Amplify Gen2**: Used for backend services, including authentication, API management, and data storage.
- **Chart.js & React Chart.js**: Libraries used for rendering charts in the app.
- **React Slick**: Used for creating sliders or carousels.
- **Google Maps API**: Integrated using `@react-google-maps/api` for map functionalities.

## Installation

To set up the project, you need to install the following packages:

```bash
# Material UI and related dependencies
npm install @mui/material @emotion/react @emotion/styled

# React Router for navigation
npm install react-router-dom

# Charting libraries
npm install chart.js react-chartjs-2

# AWS Amplify for backend integration
npm install aws-amplify @aws-amplify/ui-react

# React Slick for carousels
npm install react-slick slick-carousel

# Material UI Icons for UI enhancement
npm install @mui/icons-material

# Google Maps API integration
npm install @react-google-maps/api

# Development dependencies
npm install source-map-loader --save-dev
npm install react-scripts --save-dev
npm install @babel/plugin-proposal-private-property-in-object --save-dev

# Web Vitals for performance monitoring
npm install web-vitals --save

# TypeScript setup
npm install typescript@4.9.5 --save-dev

# Create the latest AWS Amplify project
npm create amplify@latest
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Additional Resources

- [Material UI](https://mui.com/) for design components.
- [AWS Amplify Documentation](https://docs.amplify.aws/) for backend setup and integration.
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) for creating charts.
- [React Slick Documentation](https://react-slick.neostack.com/) for building carousels.
- [Google Maps API Documentation](https://developers.google.com/maps/documentation) for integrating maps.

---