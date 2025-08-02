# Echomate Lite - Social Media Platform

A modern, responsive social media platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **User Authentication** - Secure login and registration system
- **Profile Management** - Complete user profiles with customizable backgrounds
- **Social Feed** - Real-time post sharing and interaction
- **Responsive Design** - Mobile-first approach with glass morphism UI
- **Modern UI/UX** - Beautiful glass morphism design with purple gradients

### Profile Features
- **Editable Profiles** - Update profile information, photos, and backgrounds
- **Background Customization** - Choose from preset backgrounds or upload custom images
- **Profile Statistics** - Track posts and likes
- **Bio Management** - Rich text descriptions and location tracking

### Post Features
- **Create Posts** - Share thoughts and updates with the community
- **Like System** - Interactive like functionality
- **Comment System** - Engage with other users' posts
- **Share Posts** - Share content across the platform

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Glass Morphism
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/echomate-lite.git
   cd echomate-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎨 Design System

### Glass Morphism
- **Frosted glass effects** with backdrop blur
- **Transparent overlays** with subtle borders
- **Purple gradient themes** throughout the application
- **Smooth animations** and hover effects

### Color Palette
- **Primary**: Purple gradients (#667eea to #764ba2)
- **Secondary**: Blue accents (#48dbfb)
- **Background**: Dark theme with glass effects
- **Text**: White with varying opacity levels

## 📱 Pages

### Landing Page (`/`)
- Welcome screen with authentication options
- Beautiful hero section with call-to-action

### Feed Page (`/feed`)
- Main social feed with posts
- Create new posts functionality
- Like and comment interactions

### Profile Page (`/profile`)
- User profile with customizable background
- Edit profile information
- View user statistics and posts
- Background customization options

### Create Post (`/create-post`)
- Rich post creation interface
- Image upload capabilities
- Preview functionality

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── Layout/
│   │   └── Navbar.tsx
│   └── UI/
│       ├── Button.tsx
│       └── Input.tsx
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── Landing.tsx
│   ├── Feed.tsx
│   ├── Profile.tsx
│   └── CreatePost.tsx
├── types/
│   └── index.ts
└── App.tsx
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Performance Optimizations

- **Lazy Loading** - Images load only when needed
- **Optimized Images** - Smaller file sizes for faster loading
- **Code Splitting** - Efficient bundle splitting
- **Responsive Images** - Different sizes for different devices

## 🔒 Security

- **Protected Routes** - Authentication-based access control
- **Input Validation** - Form validation and sanitization
- **Secure File Uploads** - Image upload with type checking

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Phase 1: Front End build is finished** ✅ 
