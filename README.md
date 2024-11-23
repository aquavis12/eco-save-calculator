---
# E-Waste Calculator

This project is an **E-Waste Calculator** built using [Create React App](https://github.com/facebook/create-react-app). The app helps users estimate the impact of their electronic waste, encouraging sustainable disposal practices.

## Overview

- The E-Waste Calculator leverages React for dynamic user interfaces and Material UI Icons for a modern design. It features a Slider component to input data and uses AWS Amplify Gen2.
- Collect your old electronics, and start contributing to a cleaner environment today.
- Recycle your old electronics, save the environment, and earn rewards!
- Application uses two database tables one to store user details with ecopoints and one store ewaste details.(updated ecopoints will be stored in user details table.individual ecopoints for every submit will be stored in e-waste table. )
- Once you checked your ecoPoints in about page and its 1000 eocpoints  , the updatedecopoints will be to set 0 & mail will triggered .but still your ecopoints history will be there in E-waste table. Once e-waste partner issues  voucher and then we will delete the data of those history.
- Submit button in Form page will in disabled mode till if there is any e-waste details needed to submitted then it will be enabled 
- After successful submission , you will get e-mail triggered automatically. 
- In user details table , we dont maintain duplicate data , if same user submits again then  only  ecopints will be updated . We maintain record of individual submits in e-waste table.
- Future enhacements:  After partnering with e-waste partner.we can update more markers in google maps for more visibility and distribute vouchers based on ecopoints (must be >=1000)

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

## Technologies Used

- **React**: Front-end library for building the user interface.
- **Material UI Icons**: Provides a rich set of icons to enhance the UI.
- **Slider**: A UI component for smooth input controls.
- **AWS Amplify Gen2**: Used for backend services,API management
- **AWS SES & Route53** : for email notifications and domain registry
- **React Slick**: Used for creating sliders or carousels.
- **Google Maps API**: Integrated using `@react-google-maps/api` for map functionalities.

## Installation

To set up the project, you need to install the following packages:

```bash
# Material UI and related dependencies
npm install @mui/material @emotion/react @emotion/styled

# React Router for navigation
npm install react-router-dom

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
npm install dotenv

# Web Vitals for performance monitoring
npm install web-vitals --save

# TypeScript setup
npm install typescript@4.9.5 --save-dev

# AWS SDK
npm install aws-sdk

# Create the latest AWS Amplify project
npm create amplify@latest

#After the project setup run below command for sandbox
npm ampx sandbox 


```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Additional Resources

- [Material UI](https://mui.com/) for design components.
- [AWS Amplify Documentation](https://docs.amplify.aws/) for backend setup and integration.
- [React Slick Documentation](https://react-slick.neostack.com/) for building carousels.
- [Google Maps API Documentation](https://developers.google.com/maps/documentation) for integrating maps.
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html) for emails configurations.
---
