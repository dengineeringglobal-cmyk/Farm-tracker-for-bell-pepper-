# Farm Tracker - Bell Pepper Management System

A modern, full-featured web application for tracking and managing bell pepper farms with real-time weather monitoring, user authentication, data storage, and cloud synchronization capabilities.

## Features

### Weather Tracking
- Real-time weather data via OpenWeatherMap API
- Temperature, humidity, wind speed, and cloud cover monitoring
- Multi-city search support
- Beautiful, responsive weather dashboard with status indicators

### User Authentication
- Secure login and registration system
- Email validation and password requirements
- Session management with localStorage
- Protected pages (Dashboard & Data Management)
- User profile in navbar with logout functionality

### Data Management
- Local storage for farm data entries
- Cloud synchronization API ready
- CSV export functionality for data backup
- Data history table with sorting
- Crop health tracking and custom notes
- Add sample data for testing

### User Interface
- Modern, responsive design (mobile-first)
- Gradient backgrounds and smooth animations
- Lucide icons for visual clarity
- Navigation bar with authentication state
- 404 error page with navigation
- Loading states and error handling

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Storage**: LocalStorage (client) + Cloud API endpoints
- **Weather API**: OpenWeatherMap

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager

### Installation Steps

1. **Clone the repository**:
```bash
git clone https://github.com/dengineeringglobal-cmyk/Farm-tracker-for-bell-pepper-.git
cd Farm-tracker-for-bell-pepper-
```

2. **Install dependencies**:
```bash
npm install
# or pnpm install, yarn install, bun install
```

3. **Configure environment variables**:
Create a `.env.local` file:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_from_openweathermap
NEXT_PUBLIC_FARM_LOCATION=London
```

Get your free OpenWeatherMap API key: https://openweathermap.org/api

4. **Run development server**:
```bash
npm run dev
```

5. **Open in browser**:
Visit [http://localhost:3000](http://localhost:3000)

## Demo Credentials

Test the app with these credentials:
- **Email**: demo@farm.com
- **Password**: demo123

## Project Structure

```
farm-tracker/
├── app/
│   ├── api/
│   │   ├── export-excel/    # CSV export endpoint
│   │   └── cloud-sync/      # Cloud sync endpoint (placeholder)
│   ├── dashboard/           # Protected weather dashboard
│   ├── data/               # Protected data management
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout with navbar
│   ├── page.tsx            # Landing page
│   ├── not-found.tsx       # 404 page
│   └── globals.css         # Global styles
├── components/
│   ├── navbar.tsx                # Navigation bar
│   ├── auth-guard.tsx            # Auth protection wrapper
│   ├── weather-dashboard.tsx     # Main weather component
│   └── ui/
│       └── weather-card.tsx      # Weather card display
├── lib/
│   └── auth.ts             # Auth utilities
└── package.json            # Dependencies

```

## Key Pages

### Home Page (`/`)
- Landing page with feature overview
- Navigation to dashboard and auth pages
- Feature highlights

### Dashboard (`/dashboard`)
- Protected by auth guard
- Live weather data display
- Search weather by city
- Displays temperature, humidity, wind, cloud coverage

### Data Management (`/data`)
- Protected by auth guard
- View stored farm data in table
- Add sample data entries
- Export data as CSV file
- Cloud sync status indicator
- Real-time success/error messages

### Authentication Pages
- **Login** (`/login`) - Sign in with email/password
- **Register** (`/register`) - Create new account

## API Endpoints

### POST `/api/export-excel`
Exports farm data as CSV format
- **Body**: `{ data: FarmData[] }`
- **Response**: CSV file download

### POST `/api/cloud-sync`
Syncs farm data to cloud storage
- **Body**: `{ data: FarmData[], userId: string }`
- **Response**: `{ success: boolean, timestamp: string, entriesCount: number }`

## Authentication System

1. User registers with name, email, password
2. Login with email and password
3. Session stored in localStorage
4. Dashboard/Data pages protected with AuthGuard component
5. Logout from navbar menu

## Data Model

### FarmData Interface
```typescript
interface FarmData {
  date: string;              // YYYY-MM-DD
  temperature: number;       // °C
  humidity: number;          // %
  windSpeed: number;         // km/h
  cropHealth: string;        // e.g., "Good", "Fair", "Poor"
  notes: string;             // Custom observations
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WEATHER_API_KEY` | Yes | OpenWeatherMap API key |
| `NEXT_PUBLIC_FARM_LOCATION` | Yes | Default farm location (city name) |

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo in Vercel Dashboard
3. Add environment variables
4. Deploy automatically

### Other Platforms
Works with any Node.js hosting (Railway, Render, Netlify, etc.)

## Roadmap

- [x] Weather integration
- [x] User authentication system
- [x] Local data storage
- [x] CSV export
- [ ] Database backend (Supabase/Firebase)
- [ ] Real cloud storage
- [ ] Advanced analytics & charts
- [ ] Mobile application
- [ ] Weather alerts
- [ ] Multi-farm support
- [ ] Team collaboration
- [ ] IoT sensor integration

## Next Steps - Backend Setup

To complete the app with cloud storage:

1. **Choose a backend** (Supabase, Firebase, MongoDB, PostgreSQL)
2. **Update auth** to use backend instead of localStorage
3. **Implement cloud-sync endpoint** to save data to database
4. **Add user management** for persistent accounts
5. **Setup Row Level Security** for data privacy

Contact the development team for backend implementation.

## Troubleshooting

### Weather not loading?
- Check API key in `.env.local`
- Verify OpenWeatherMap API status
- Ensure city name is correct

### Login issues?
- Clear browser localStorage
- Check console for errors
- Verify email format

### Data not saving?
- Check browser storage quota
- Clear browser cache
- Check console for errors

## Support & Contact

**Development Team**: DE Engineering Global CMYK
**Email**: support@dengineeringglobal.com
**Repository**: https://github.com/dengineeringglobal-cmyk/Farm-tracker-for-bell-pepper-

## License

This project is open source and available under the MIT License.

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready (Frontend)  
**Next Phase**: Backend Integration
