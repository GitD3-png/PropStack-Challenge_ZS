# Running the PropStack Challenge Application

This is a [Next.js](https://nextjs.org/) project that visualizes PropTech companies in the Multifamily real estate industry.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.0.0 or later)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow these simple steps to run the application locally:

1. **Clone the repository**

```bash
git clone https://github.com/GitD3-png/propstack-challenge.git
cd propstack-challenge
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open the application**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- **Dynamic Dropdown Navigation**: Browse through the PropTech hierarchy (Multifamily → Category → Sub-Category → Tag)
- **Company Cards**: View company information with logos and links
- **Tech Stack Visualization**: See the technologies used by each company
- **Admin Interface**: Add, edit, and delete companies through the admin panel at `/admin`
- **Local Storage**: All data is managed client-side using localStorage for persistence

## Data Structure

The application uses the JSON data located at `assets/PropStack_MF_Updated_Structure_Links.json` which contains the hierarchical structure of PropTech companies in the Multifamily real estate industry.

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Icons**: Icon library for React applications
- **localStorage API**: For client-side data persistence

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then, to start the production server:

```bash
npm start
# or
yarn start
```
