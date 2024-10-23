Note: this repository stores all N322 projects, so accessing the specific homework will require downloading the respective directory.

- Homework 2

-- Create a React Native / Expo application using tabs
-- Application must have a tab navigation with three tabs
-- All pages must have content on the page, styled consistently
-- Use Clerk auth to sign up, sign in, and sign out
-- This must run in Expo and on an Android Emulator

This project uses Clerk to sign up, sign in, and sign out. On a first load of the app, users will see only a home screen with the option to sign up or sign in. Only after creating an account / signing in will users see the tabs and have access to the rest of the site. Once logged in, users can use the tabs/index screen to log out again. In a future pass, this logout would be added to the profile page or to a nav menu.

--- To run this project:
--- Download project files directly from the homework2 directory and use the npm scripts to run the project for web and android
npm run web
and
npm run android

--- Alternatively, you can download all files and use the terminal to cd into homework2. From there the npm scripts will run as intended
