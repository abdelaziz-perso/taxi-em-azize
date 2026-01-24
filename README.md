# EM Taxi Touristique

A modern, responsive website for EM Taxi Touristique - a premium luxury transportation service in Morocco. Built with React, TypeScript, and Vite.

## 🚗 Features

- **Multi-language Support**: Available in French, English, and Arabic
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Scroll Progress Indicator**: Visual progress bar showing page scroll position
- **Welcome Assistant**: Interactive virtual assistant for user guidance
- **Contact Form**: Integrated EmailJS for seamless contact form submissions
- **AOS Animations**: Smooth scroll animations using AOS (Animate On Scroll)
- **Premium Sections**:
  - Hero section with call-to-action
  - Services showcase
  - Pricing packages (Standard, Business, Premium)
  - About us with company information
  - Contact form and information
  - Footer with quick links

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **AOS** - Animation library
- **EmailJS** - Contact form email service
- **Lucide React** - Icon library
- **CSS3** - Styling with custom components

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taxi-em
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
taxi-em/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, videos, and other media
│   ├── components/     # React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pricing.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Services.tsx
│   │   └── WelcomeAssistant.tsx
│   ├── contexts/       # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── locales/        # Translation files
│   │   ├── ar.json
│   │   ├── en.json
│   │   └── fr.json
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css      # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🌐 Languages

The website supports three languages:
- **Français** (French) - Default
- **English**
- **العربية** (Arabic)

Language switching is available through the navbar language selector.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

## 🎨 Key Components

### Navbar
- Sticky navigation with scroll effects
- Mobile hamburger menu
- Language selector
- Quick contact buttons

### Hero
- Eye-catching hero section
- Call-to-action buttons
- Video background support

### Services
- Airport transfers
- Business & Corporate
- Events & Special Occasions
- On-Demand Service

### Pricing
- Three pricing tiers (Standard, Business, Premium)
- Feature comparison
- Custom quote option

### Contact
- Contact form with EmailJS integration
- Phone, WhatsApp, and Email contact options
- Service type selection

## 🔧 Configuration

### EmailJS Setup
To enable contact form functionality, configure EmailJS in the Contact component with your service credentials.

### Language Configuration
Add or modify translations in the `src/locales/` directory:
- `en.json` - English translations
- `fr.json` - French translations
- `ar.json` - Arabic translations

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be generated in the `dist/` directory.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Context API for state management
- CSS modules for component styling
- ESLint for code quality

## 📞 Contact Information

- **Phone**: +212 762 728 706
- **Service**: Available 24/7

---

**EM Taxi Touristique** - Your trusted partner for premium transportation in Morocco since 2009.
