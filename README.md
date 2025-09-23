# Weather App - Context API, useReducer

⚠️ Note: This project was fully rebuilt and re-uploaded due to issues with the previous repo (cache corruption & deployment bugs). The current version reflects a complete refactor with improved structure and documentation.

This is a weather application built with React to showcase my skills and growth in front-end development. The app allows users to check current weather conditions for any location globally, providing weather data and interactive features. The goal of this project is to demonstrate my ability to integrate multiple technologies, interact with third-party APIs, and build a polished, user-friendly application. It also serves as a portfolio piece highlighting my front-end development skills.

## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Features](#features)
- [Screenshots](#screenshots)
- [Links](#links)
- [Built with](#built-with)
- [useReducer](#usereducer)
  - [Why use useReducer](#why-use-usereducer)
- [What I learned](#what-i-learned)
- [Useful Resources](#useful-resources)
- [Contributing](#contributing)
- [Installation Instructions](#installation-instructions)
- [Author](#author)

## Overview

### The challenge

The idea for this project was to build a weather app using external API(OpenWeather API) that allows users to:

- Search for the current weather of any city or location in the world through an external weather API
- View details like temperature, air quality, humidity, wind speed, and weather conditions (e.g., clear, cloudy, rainy).
- View 5-day weather forecast through an external weather API
- Interact with the app in a clean, responsive layout that adapts to various screen sizes.
- Allow the user to toggle between dark (default) and light themes
- Allow the user to toggle between Celsius and Fahrenheit units
- Allow the user to navigate between the basic weather card and detailed weather card including forecast
- Allow the user to save cities to a favorite list, with an option to directly display the weather data for that city, without needing to search for it again
- Save cities to local storage to persist data
- Allow the user to remove a city from the favorites list and from the local storage
- Allow the user to display weather data, including a 5-day forecast using geolocation

## Features

---

- Search current weather for any city/location worldwide
- View temperature, air quality, humidity, wind speed, and weather conditions
- See 5-day weather forecast
- Toggle between dark (default) and light themes
- Switch between Celsius and Fahrenheit units
- Navigate between basic and detailed weather cards
- Save favorite cities with persistent local storage
- Cities saved to favorites are stored in local storage, so users’ favorite locations persist even after refreshing or closing the browser.
- Remove cities from favorites and local storage
- Use geolocation to get local weather and forecast

### Screenshot

![Weather App Dark Theme Desktop Layout - Details Card](./screenshots/screenshot-dark-theme.png)
![Weather App Light Theme Desktop Layout - Details Card](./screenshots/screenshot-light-theme.png)
![Weather App Dark Theme Desktop Layout - Basic Card](./screenshots/screenshot-basic-weather-dark-theme.png)
![Weather App Light Theme Desktop - Basic Card ](./screenshots/screenshot-basic-weather-light-theme.png)
![Weather App Dark Theme Mobile Layout - Basic Card](./screenshots/screenshot-dark-theme-mobile%20layout-basic-card.png)
![Weather App Dark Theme Mobile Layout - Details Card](./screenshots/screenshot-dark-theme-mobile%20layout-details-card.png)
![Weather App Light Theme Mobile Layout - Basic Card](./screenshots/screenshot-light-theme-mobile%20layout-basic-card.png)
![Weather App Light Theme Mobile Layout - Details Card](./screenshots/screenshot-light-theme-mobile%20layout-details-card.png)

### Links

- Solution URL: [Github Repo](https://github.com/Zdravko93/weather_app_context_useReducer_portfolio.git)
- Live Site URL: [Live Demo](https://zdravko93.github.io/weather_app_context_useReducer_portfolio/)

### Built with

- Semantic HTML5
- **JavaScript**
- **React**
- **Context API**: For managing global state and centralizing the application logic to avoid redundant prop drilling
- **useReducer**: A React hook used for managing more complex state logic
- OpenWeather API: Used to fetch weather data
- Fetch API: For handling asynchronous requests to the API
- CSS variables: For light theme styles
- CSS Flexbox: For both basic layout and responsive design

#### useReducer

In this project, I used the 'useReducer' hook to manage state in components where the logic was more complex than a simple `useState` could handle.

##### Why use `useReducer`

- **More Complex State Logic**: When the state logic involves multiple sub-values or when the next state depends on the previous one, `useState` can become cumbersome. `useReducer` is ideal for managing more complex state transitions, especially when the component state becomes difficult to manage with multiple `useState` hooks.

- **Predictable State Changes**: `useReducer` works by dispatching actions that modify the state based on the current state. This approach makes it easier to manage state transitions in a predictable manner, especially for larger applications.

### 📘 What I Learned

- Improved responsive design principles
- Mastered asynchronous programming using `fetch()`
- Focused on clean, minimalistic UI/UX
- Implemented error handling for API failures
- Deepened knowledge of React Context and `useReducer`
- Boosted confidence through problem-solving
- Improved refactoring and estimation skills

## Useful Resources

- [React](https://react.dev/) - React docs
- [MDN Web Docs - Flexbox](https://developer.mozilla.org/en-US/) - An essential guide for working with Flexbox for responsive layouts.
- [CSS-Tricks](https://css-tricks.com/) - Using Custom Properties (CSS Variables) - Helpful resource for understanding CSS custom properties (variables) and how to use them in your projects.
- [Stack Overflow](https://stackoverflow.com/questions) - Excellent resource when you find yourself stuck

## Contributing

Contributions are welcome! If you'd like to improve the app or fix any bugs, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes and commit them (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request explaining your changes

Feel free to open issues for bugs or feature requests!

## Installation Instructions

1. Clone the repository to your local machine using Git:
   ```bash
   git clone https://github.com/Zdravko93/weather_app_context_useReducer_portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather_app_context_useReducer_portfolio
   ```
3. Install the necessary dependencies

   ```bash
    npm install
   ```

4. Start the development server

   ```bash
   npm start
   ```

   This will launch the application in development mode. By default, it will be available in your browser at http://localhost:3000. The page will automatically reload if you make edits.

5. Start contributing or experimenting:
   Now that the project is up and running, you can start making changes to the code. You can experiment with adding new features, modifying existing components, or improving the app. Any changes you make will be reflected live in your browser, thanks to the development server.

## Author

Front-end developer with a passion for building interactive, user-friendly web applications. This project is a reflection of my growth as a developer and my commitment to building clean, functional, and beautiful web experiences.

- Github - [Zdravko](https://github.com/Zdravko93)
- Frontend Mentor - [@Zdravko93](https://www.frontendmentor.io/profile/Zdravko93)
- LinkedIn - [Zdravko](https://www.linkedin.com/in/zdravkodelic/)
