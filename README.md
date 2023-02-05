![dashboard](https://github.com/jdhawks2132/mqvc/blob/main/client/src/assets/images/screenshots/dashboard.png?raw=true)

<div align="center">

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ruby](https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white)
![rails](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![devise](https://img.shields.io/badge/Devise-7A00FF?style=for-the-badge&logo=devise&logoColor=white)
![sidekiq](https://img.shields.io/badge/Sidekiq-7A00FF?style=for-the-badge&logo=sidekiq&logoColor=white)
![redis](https://img.shields.io/badge/Redis-7A00FF?style=for-the-badge&logo=redis&logoColor=white)

</div>

# VendorFlow

## MQVC : Vendor Management System

## Table of Contents

- [VendorFlow](#vendorflow)
  - [MQVC : Vendor Management System](#mqvc--vendor-management-system)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Usage](#usage)
    - [User Stories](#user-stories)
  - [Technologies](#technologies)
  - [Installation](#installation)

## Description

VendorFlow is a web application designed to manage vendors, contacts, assignments, registrations, and payments. It is a full-stack application built with Ruby on Rails and React/Redux. It is a work in progress and is currently in the development phase.

## Usage

### User Stories

- As an **admin**, I want full CRUD functionality for vendors, contacts, assignments, registrations, sponsorships, and advertisements.

- As a **user**, I want to be able to log in and out of the application.
- As a **user**, I want to be able to see a list of assigned vendors.
- As a **user**, I want to be able to see attached contacts for each vendor.
- As a **user**, I want to be able to view vendor details including
  - Contact information
  - Assignment information
  - Registration information
  - Sponsorship information
  - Current Status
  - Advertisement information (if applicable)
- As a **user**, I want to be able to send emails to vendors regarding their status, sponsorships, registrations, advertisements, etc.

- As a **vendor**, I want to be able to log in and out of the application.
- As a **vendor**, I want to be able to update my contact information.

## Technologies

Frontend

- React 18.2.0
- Redux
- RTK Query
- Axios (for setting jwt token in headers)
- TailwindCSS
- TinyMCE (for rich text editing)


Backend

- Ruby 3.1.0
- Rails (API) 7.0.4
- PostgreSQL
- Devise
- Devise-jwt (for authentication)
- Sidekiq (for background jobs)
- Redis (for Sidekiq)
- SendGrid (for sending emails)

## Installation

1. Clone the repo
2. Make sure you have Ruby 3.1.0, Rails 7.0.4, and PostgreSQL installed
3. Run `bundle install` to install the required gems
4. Run `rails db:create` to create the database
5. Migration and seed the database with `rails db:migrate db:seed`
6. Run `rails s` to start the server
7. In a separate terminal, navigate to the client directory and run `npm install` to install the required packages
8. To start the client, run `npm start`
