# 📈 TradeBrain - Stock Trading Made Simple

A modern, responsive stock trading platform built with **Next.js 15**, **React 19**, and **TypeScript**. This project provides real-time stock market data, interactive charts, and a comprehensive trading interface for the Indian stock market.

## ✨ Features

### 🏠 **Homepage**

- **Interactive Image Carousel** - Showcasing market trends with Shadcn UI components
- **Hero Section** - Eye-catching design with stock market information
- **Live Market Stats** - Real-time NIFTY, SENSEX, Bank Nifty, and IT sector data
- **Financial Tips** - Auto-rotating investment advice and tips
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### 📊 **Stock Analytics**

- **Interactive Stock Charts** - Built with Recharts for data visualization
- **Real-time Price Data** - Live stock prices with percentage changes
- **OHLC Data Display** - Open, High, Low, Close price information
- **Volume Analysis** - Trading volume and value metrics
- **Historical Data** - Configurable time periods (1D, 7D, etc.)

### 🔍 **Stock Search & Discovery**

- **Smart Search Bar** - Auto-complete with debounced API calls
- **Stock Suggestions** - Real-time search results with company details
- **Dynamic Routing** - Individual stock pages with detailed analytics
- **Favorites System** - Save and track preferred stocks (localStorage)

### 🎨 **UI/UX Components**

- **Shadcn UI Integration** - Modern, accessible component library
- **Custom Carousel** - Image slider with navigation controls
- **Stock Ticker** - Scrolling market data marquee
- **Responsive Header** - Navigation with mobile menu toggle
- **Loading States** - Smooth loading animations and skeletons

## 🛠 Tech Stack

### **Frontend Framework**

- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest React features and hooks
- **TypeScript** - Type-safe development

### **Styling & UI**

- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library
- **Lucide React** - Beautiful icon set
- **CSS Modules** - Scoped styling support

### **Data Visualization**

- **Recharts 2.12** - Responsive charts built on D3
- **React Fast Marquee** - Smooth scrolling ticker

### **HTTP & State Management**

- **Axios** - HTTP client with interceptors
- **React Hooks** - Built-in state management
- **Local Storage** - Client-side data persistence

### **Development Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
src/
├── api/                    # API service functions
│   └── stock.ts           # Stock-related API calls
├── app/                   # Next.js App Router
│   ├── (global_view)/     # Route groups
│   │   └── stock/[symbol] # Dynamic stock pages
│   ├── favicon.ico
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── app/              # Application-specific components
│   │   ├── SearchBar.tsx  # Stock search functionality
│   │   ├── StockGraph.tsx # Chart visualization
│   │   └── StockTicker.tsx # Market ticker
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Footer.tsx    # Page footer
│   │   └── NavLinks.tsx  # Navigation links
│   ├── providers/        # Context providers
│   │   ├── LayoutProvider.tsx # Layout wrapper
│   │   └── RootProvider.tsx   # Root providers
│   ├── screens/          # Page-level components
│   │   └── MainApp.tsx   # Homepage component
│   └── ui/               # Shadcn UI components
│       ├── button.tsx    # Button component
│       └── carousel.tsx  # Carousel component
├── lib/                  # Utility functions
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
├── server/               # Server configurations
│   └── api.ts           # Axios instance
├── services/            # Business logic
│   └── stock.ts         # Stock service functions
└── types/               # TypeScript definitions
    └── stock.ts         # Stock-related types
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd trade-brain-assignment
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
NEXT_PUBLIC_API_URL=https://portal.tradebrains.in/api/assignment
NEXT_PUBLIC_WEBAPP_URL=http://localhost:3000
NEXT_PUBLIC_AXIOS_TIMEOUT=10000
```

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📡 API Integration

The application integrates with the TradeBrain API for stock data:

### **Endpoints Used**

- `GET /search` - Stock search with keyword
- `GET /stock/{symbol}/prices` - Historical price data
- `GET /index/NIFTY/movers/` - Market movers data

### **API Features**

- **Configurable Parameters** - Days, type (INTRADAY), limit
- **Error Handling** - Comprehensive error management
- **Type Safety** - Full TypeScript definitions
- **Axios Integration** - Timeout and retry logic

## 🎯 Key Features in Detail

### **Stock Chart Component**

```typescript
interface StockGraphProps {
    data: ISStockPrice[];
}
```

- **Responsive Design** - Adapts to container size
- **Interactive Tooltips** - Rich data on hover
- **Multiple Data Points** - Supports 1 to N price points
- **Color Coding** - Green for gains, red for losses
- **Fallback States** - Handles empty data gracefully

### **Search Functionality**

- **Debounced Input** - Optimized API calls
- **Auto-complete** - Real-time suggestions
- **Keyboard Navigation** - Accessible interaction
- **Error Handling** - User-friendly error states

### **Carousel Implementation**

- **Shadcn Integration** - Modern component library
- **Touch Support** - Mobile-friendly gestures
- **Auto-play** - Optional automatic progression
- **Keyboard Navigation** - Arrow key support

## 🎨 Design System

### **Color Palette**

- **Primary**: Purple/Blue gradients
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale

### **Typography**

- **Font Family**: System fonts with fallbacks
- **Scale**: Tailwind's type scale
- **Weights**: 400, 500, 600, 700

### **Spacing & Layout**

- **Grid System**: CSS Grid and Flexbox
- **Responsive Breakpoints**: sm, md, lg, xl
- **Container Sizes**: Max-width constraints

## 🔧 Configuration

### **TypeScript Configuration**

- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` for clean imports
- **React 19**: Latest JSX transform

### **Tailwind Configuration**

- **Custom Colors**: Brand color palette
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for dark theme

### **Next.js Configuration**

- **App Router**: Modern routing system
- **Turbopack**: Fast development builds
- **TypeScript**: Full type checking

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Medium screen optimizations
- **Desktop**: Full-featured experience
- **Touch Friendly**: Large tap targets

## 🧪 Development Features

- **Hot Reload**: Instant development feedback
- **Type Checking**: Real-time TypeScript validation
- **ESLint**: Code quality enforcement
- **Auto-formatting**: Consistent code style

## 🚀 Deployment

### **Build Process**

```bash
pnpm build  # Creates optimized production build
```

### **Deployment Targets**

- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

## 📈 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the TradeBrain assignment.

## 🙋‍♂️ Support

For questions or support, please reach out to the development team.

---

**Built with ❤️ by @Krithik-m-codes for TradeBrain**
