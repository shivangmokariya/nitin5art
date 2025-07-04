# Professional Artist Gallery Website

A modern, responsive website for showcasing artwork with a beautiful gallery, admin panel, and contact system. Built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## 🎨 Features

### Public Features
- **Beautiful Gallery**: Responsive grid layout with filtering and search
- **Artwork Details**: Individual artwork pages with detailed information
- **Artist Profile**: About page with artist information and portfolio
- **Contact System**: Inquiry form for artwork and commission requests
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Secure Login**: JWT-based authentication system
- **Artwork Management**: Add, edit, and delete artwork
- **Image Upload**: Upload and manage artwork images
- **Site Settings**: Customize hero image, artist image, and site content
- **Inquiry Management**: View and manage customer inquiries
- **Analytics Dashboard**: View site statistics and performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artist-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   npm run setup
   ```
   This will create a `.env.local` file with secure defaults. You can also manually copy from `env.example`:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/artist-website
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-key-here
   
   # Admin Configuration
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your-admin-password-here
   
   # Google Drive Configuration
   GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com"}
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🔐 Environment Variables Setup

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

#### Database Configuration
```env
MONGODB_URI=mongodb://localhost:27017/artist-website
```
For production, use MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artist-website
```

#### Authentication
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
JWT_SECRET=your-jwt-secret-key-here
```

#### Admin Access
```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password-here
```

#### Google Drive Integration (Optional)
```env
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com"}
```

### Google Drive Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Drive API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API" and enable it

3. **Create a Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create the account

4. **Generate Service Account Key**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format and download the file

5. **Set up Google Drive Folder**
   - Create a folder in Google Drive
   - Share it with your service account email (with Editor permissions)
   - Copy the folder ID from the URL

6. **Configure Environment Variables**
   - Copy the entire JSON content from the downloaded service account key
   - Paste it as the `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable
   - Set the `GOOGLE_DRIVE_FOLDER_ID` to your folder ID

### Security Notes

- **Never commit `.env.local` or `google-service-account.json` to version control**
- **Use strong, unique secrets for `NEXTAUTH_SECRET` and `JWT_SECRET`**
- **In production, use environment variables provided by your hosting platform**
- **The `google-service-account.json` file is automatically ignored by git**

### Optional Environment Variables

```env
# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# External Image Storage (alternative to Google Drive)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📁 Project Structure

```
artist-website/
├── app/                    # Next.js 14 app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── gallery/           # Gallery pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── FeaturedGallery.tsx # Featured artwork component
│   ├── InquiryForm.tsx    # Contact form
│   ├── ArtistImage.tsx    # Artist profile image
│   └── HeroImage.tsx      # Hero section image
├── lib/                   # Utility functions
│   ├── mongodb.ts         # Database connection
│   ├── siteUtils.ts       # Site settings utilities
│   ├── statsUtils.ts      # Statistics utilities
│   ├── categoryUtils.ts   # Category management
│   ├── seedAdmin.ts       # Admin user seeding
│   └── checkDb.ts         # Database checking utilities
├── models/                # MongoDB models
│   ├── Painting.ts        # Artwork model
│   ├── Inquiry.ts         # Contact inquiry model
│   ├── Admin.ts           # Admin user model
│   └── SiteSetting.ts     # Site settings model
├── public/                # Static assets
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Key Components

### Home Page (`app/page.tsx`)
- Hero section with dynamic content
- Featured artwork gallery
- Category showcase
- Artist introduction
- Call-to-action sections

### Gallery (`app/gallery/page.tsx`)
- Responsive grid layout
- Search and filtering
- Pagination
- Category filtering
- Individual artwork pages

### Admin Panel (`app/admin/`)
- Secure authentication
- Artwork management
- Image upload system
- Site settings management
- Inquiry management

### API Routes (`app/api/`)
- `/api/paintings` - Artwork CRUD operations
- `/api/inquiries` - Contact form submissions
- `/api/auth/*` - Authentication endpoints
- `/api/settings/*` - Site settings management
- `/api/upload` - Image upload handling

## 🛠️ Customization

### Styling
The project uses Tailwind CSS with a custom color palette:
- **Primary**: Orange/amber tones for branding
- **Secondary**: Gray tones for text and backgrounds

### Content Management
- Artist information is managed through the admin panel
- Site settings include hero image, artist image, and about text
- All content is stored in MongoDB for easy updates

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Create API routes in `app/api/` for backend functionality
4. Add new models in the `models/` directory if needed

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Setup
The application automatically creates:
- Admin user (admin@admin.com / Admin@123)
- Default site settings
- Required database indexes

### Environment Variables
See `env.example` for all available environment variables and their descriptions.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 