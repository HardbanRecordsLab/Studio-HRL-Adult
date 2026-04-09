# Studio HRL Adult - React Version

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
cd react-app
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── sections/        # Page sections
│   │   ├── forms/           # Form components
│   │   ├── tables/          # Data tables
│   │   └── ui/              # UI components
│   ├── pages/               # Next.js pages
│   ├── hooks/               # Custom hooks
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎯 Features

### ✅ Completed
- **Project Structure**: Complete React + TypeScript setup
- **Styling**: TailwindCSS with custom design system
- **Navigation**: Responsive navigation with auth
- **State Management**: Zustand for global state
- **API Layer**: Axios-based API client
- **TypeScript**: Complete type definitions
- **Constants**: Platform data and configuration

### 🔄 In Progress
- Component development
- Page implementation
- Backend integration
- Authentication system

### 📋 To Do
- Build all components
- Implement all pages
- Add backend API
- Deploy application

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Next.js 14
- **Styling**: TailwindCSS + custom design system
- **State**: Zustand
- **API**: Axios + React Query
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🎨 Design System

### Colors
- `dark`: #07050A
- `gold`: #C9A84C
- `crimson`: #9B1F35
- `text`: #EDE0D4

### Typography
- `cormorant`: Cormorant Garamond (serif)
- `montserrat`: Montserrat (sans-serif)
- `bebas`: Bebas Neue (display)

### Components
- Custom cursor animation
- Grain overlay effect
- Smooth scroll
- Responsive design

## 📱 Pages

1. **Home** (`/`) - Landing page
2. **Casting** (`/casting`) - Application form
3. **Academy** (`/academy`) - Educational content
4. **Portfolio** (`/portfolio`) - Partner profiles
5. **Admin** (`/admin/*`) - Admin dashboard

## 🔧 Development

### Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test         # Run tests
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t studio-hrl-adult .
docker run -p 3000:3000 studio-hrl-adult
```

## 📊 Performance

- **Bundle Size**: Optimized with code splitting
- **SEO**: Next.js SSR/SSG
- **Images**: Next.js Image optimization
- **Caching**: React Query + Next.js caching

## 🔐 Security

- **Authentication**: JWT tokens
- **Validation**: Zod schemas
- **CSRF**: Next.js protection
- **XSS**: React auto-escaping

## 🧪 Testing

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 📈 Scalability

- **Component Architecture**: Reusable components
- **State Management**: Zustand stores
- **API Layer**: Centralized API calls
- **Type Safety**: Full TypeScript coverage

## 🎯 Business Logic

#### Platform Integration
- 18 total platforms (10 Live Cam + 8 Fansite)
- API connections
- Real-time sync
- Revenue tracking

### Admin Features
- Partner management
- Content management
- Financial reporting
- Platform connections

## 🚧 Current Status

**Phase 1: Setup Complete** ✅
- Project structure created
- Dependencies configured
- TypeScript setup
- TailwindCSS configured
- API client built
- State management setup

**Phase 2: Components** 🔄
- Building core components
- Implementing pages
- Adding interactions

**Phase 3: Backend** ⏳
- API endpoints
- Database setup
- Authentication

## 🎯 Next Steps

1. **Complete Components**: Build all React components
2. **Implement Pages**: Create all 5 pages
3. **Add Backend**: Node.js + Express API
4. **Deploy**: Production deployment
5. **Test**: Comprehensive testing

## 📞 Support

For issues or questions:
- Email: hrl-adult-studio@hardbanrecordslab.online
- Headquarters: Switzerland
- GitHub: Create issue in repository

---

**Note**: This is the React version of Studio HRL Adult platform. It provides better performance, scalability, and developer experience compared to the static HTML version.
