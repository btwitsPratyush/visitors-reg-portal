# Society Visitor Registration Portal

![Society Visitor Registration Portal](https://greenvalleysh.vercel.app/)

A professional and elegant visitor management system designed for residential societies. This application streamlines the visitor registration process, enhances security, and provides comprehensive visitor tracking capabilities.

## Features

### Core Functionality
- **Visitor Registration Form** with validation for:
  - Full Name
  - Flat Number
  - Purpose of Visit (Delivery, Guest, Maintenance, Other)
  - Mobile Number (validated for exactly 10 digits)
- **Real-time Visitor Log** with:
  - Chronological display of all visitors
  - Sorting capabilities (newest/oldest first)
  - Search and filtering by name or flat number
  - Data export to CSV format
  - Bulk record management

### Technical Implementation
- **Responsive Design** optimized for all devices
- **Local Storage Integration** for persistent data
- **Form Validation** with real-time feedback
- **Toast Notifications** for user actions
- **Elegant UI** with subtle animations and transitions
- **Optimized Performance** with React best practices

## Getting Started

### Prerequisites
- Node.js 14.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/yourusername/society-visitor-portal.git
   cd society-visitor-portal
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application can be easily deployed to Vercel or Netlify:

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy
\`\`\`

## Technologies Used

- **Next.js** - React framework for production
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **React Hook Form** - Form validation library
- **Zod** - TypeScript-first schema validation
- **date-fns** - Date utility library
- **Lucide React** - Beautiful, consistent icon set

## Project Structure

\`\`\`
society-visitor-portal/
├── app/                  # Next.js app directory
├── components/           # React components
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── README.md             # Project documentation
└── package.json          # Project dependencies
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Screenshots

![Registration Form](https://placeholder.svg?height=200&width=400)
![Visitor Log](https://placeholder.svg?height=200&width=400)

---

© 2023 Society Visitor Registration Portal. All rights reserved.
\`\`\`

Now, let's update the page.tsx file to remove the top description and add an elegant about section at the bottom:
