# Nexus (Crypto & Weather Dashboard)

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-Latest-8A2BE2?style=for-the-badge)](https://ui.shadcn.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-brown?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![amCharts](https://img.shields.io/badge/amCharts-5.11.2-green?style=for-the-badge)](https://www.amcharts.com/)
[![amCharts](https://img.shields.io/badge/Recharts-2.15.2-orange?style=for-the-badge)](https://recharts.org/en-US/)

A modern, responsive dashboard application built with Next.js 15 (App Router) and React 19, providing real-time cryptocurrency tracking, weather forecasts, and financial news in one sleek interface.

## 🚀 Features

### 💰 Cryptocurrency Dashboard

- **Real-time updates** via WebSocket connection to Binance
- **Interactive data table** with comprehensive sorting options
- **Price alerts** with configurable thresholds
- **Favorites system** for tracking preferred cryptocurrencies
- **Detailed analysis view** with candlestick charts and historical data

### 🌦️ Weather Dashboard

- **Current conditions** for major Indian cities
- **Comprehensive meteorological data** including temperature, humidity, and sun cycles
- **Forecast visualization** with historical comparisons
- **Responsive card layout** for favorites

### 📰 News Feed

- **Latest cryptocurrency news** from trusted sources
- **Rich media integration** with images and attribution

### 🎨 User Experience

- **Dark/Light mode** theme switching
- **Fully responsive design** optimized for all devices
- **Intuitive navigation** for seamless user experience

## 🛠️ Technologies

This project leverages modern web technologies for optimal performance and developer experience:

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Data Management**:
  - TanStack Query
  - Zustand
- **Styling**:
  - Tailwind CSS
  - Shadcn UI
- **Form Handling**: React Hook Form + Zod
- **Data Visualization**: Rechart and amCharts
- **API Integration**: Axios + WebSockets

## 📋 Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm package manager

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gav1306/nexus.git
   cd nexus
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```
   NEXT_PUBLIC_BINANCE_BASE_URL="https://api.binance.us/api/v3"
   NEXT_PUBLIC_COINGECKO_BASE_URL="https://api.coingecko.com/api/v3"
   NEXT_PUBLIC_BINANCE_WEBSOCKET='wss://stream.binance.com/stream'
   NEXT_PUBLIC_OPEN_METEO_BASE_URL='https://api.open-meteo.com/v1/forecast'
   NEXT_PUBLIC_NEWS_BASE_URL="https://data-api.coindesk.com/news/v1"
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Production Deployment

1. **Build the application**

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

## 📁 Project Structure

```
/
├─ app/                  # Next.js App Router
│  ├─ crypto/            # Crypto routes
│  ├─ news/              # News routes
│  └─ weather/           # Weather layout
│  └─ globals.css        # Global CSS and Shadcn theme variables
│  └─ layout.jsx         # Root layout
├─ assets/               # Icons, Images and animations
├─ components/           # UI Components
│  └─ layouts/           # Shared Layout components
│  └─ ui/                # Shared UI components
├─ hooks/                # Custom React hooks
├─ lib/                  # Utilities and configurations
├─ modules/              # Modules
│  ├─ crypto/            # Crypto modules
│  ├─ news/              # News modules
│  └─ weather/           # Weather modules
├─ providers/            # Global providers
├─ services/             # Axios and Tanstack Query Instance
├─ utils/                # Common utility functions
```

```

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the incredible React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) for beautiful, accessible components
- [amCharts](https://www.amcharts.com/) for interactive data visualization
- [Recharts](https://recharts.org/en-US/) for simple and developer friendly charts
```
