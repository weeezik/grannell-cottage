# Grannell Cottage

A private booking system for Grannell Cottage, an ancestral homestead located on Chebeague Island, Maine. This web application allows family members to view and book stays at the cottage.

## Features

- 🏠 **Member-only Access**: Secure login system for family members
- 📅 **Interactive Calendar**: View availability and make bookings
- 📝 **Booking Management**: Create and view booking details
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Calendar**: [React Big Calendar](https://github.com/jquense/react-big-calendar)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **TypeScript**: For type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/grannell-cottage.git
cd grannell-cottage
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and add your environment variables:

```bash
cp .env.example .env.local
```
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
MEMBERS_PASSWORD=your-members-password
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Project Structure

```bash
grannell-cottage/
├── src/
│ ├── app/ # Pages
│ ├── components/ # Reusable components
│ ├── styles/ # Global styles
│ └── utils/ # Utility functions
```

## Key Features Explained

### Authentication

- Uses NextAuth.js for secure authentication
- Single password protection for all family members
- Protected routes for member-only access

### Booking System

- Interactive calendar interface
- Date range selection
- Booking details with notes
- View existing bookings

### Calendar Features

- Month-by-month navigation
- Today button for quick navigation
- Visual indicators for:
  - Selected dates
  - Existing bookings
  - Current date

## Deployment


### Code Style
- Uses ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Environment Variables

Required environment variables:

- `NEXTAUTH_URL`: Full URL of your application
- `NEXTAUTH_SECRET`: Random string for session encryption
- `MEMBERS_PASSWORD`: Password for member access

## License

Private - All Rights Reserved

## Support

For support, please contact [Your Contact Information]

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] Email notifications for bookings
- [ ] Booking cancellation functionality
- [ ] Calendar export feature
- [ ] User profiles

