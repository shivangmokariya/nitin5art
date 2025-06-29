# Professional Artist Website

A modern, SEO-optimized website for showcasing paint sketch artwork with an admin panel for managing content and customer inquiries.

## Features

### Customer-Facing Website
- **Home Page**: Featured artwork carousel and artist introduction
- **Gallery**: Browse artwork with search and filtering capabilities
- **Individual Artwork Pages**: Detailed views with inquiry forms
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Mobile Responsive**: Fully responsive design for all devices
- **Search Functionality**: Full-text search across artwork titles and descriptions

### Admin Panel
- **Authentication**: Secure admin login with JWT
- **Dashboard**: Overview of statistics and quick actions
- **Artwork Management**: Add, edit, and delete paintings with SEO metadata
- **Inquiry Management**: View and manage customer inquiries
- **Analytics**: View performance metrics and insights

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Authentication**: JWT with HTTP-only cookies
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

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
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/artist-website
   JWT_SECRET=your-super-secret-jwt-key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   If using MongoDB locally:
   ```bash
   # Start MongoDB (if not already running)
   mongod
   ```
   
   If using MongoDB Atlas:
   - Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string and update `MONGODB_URI`

5. **Create admin user**
   
   The application will create a default admin user on first run, or you can create one manually:
   ```javascript
   // In MongoDB shell or Compass
   use artist-website
   db.admins.insertOne({
     username: "admin",
     email: "admin@example.com",
     password: "$2a$12$...", // bcrypt hash of your password
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
artist-website/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── gallery/           # Gallery pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # MongoDB schemas
├── public/                # Static assets
└── types/                 # TypeScript types
```

## API Endpoints

### Paintings
- `GET /api/paintings` - Get paintings with filters
- `POST /api/paintings` - Create new painting
- `GET /api/paintings/[id]` - Get single painting
- `PUT /api/paintings/[id]` - Update painting
- `DELETE /api/paintings/[id]` - Delete painting

### Inquiries
- `GET /api/inquiries` - Get inquiries with filters
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/[id]` - Update inquiry status
- `DELETE /api/inquiries/[id]` - Delete inquiry

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

## SEO Features

- **Meta Tags**: Dynamic meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup for artwork
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Image Optimization**: Next.js Image component with lazy loading
- **Performance**: Server-side rendering and optimization

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artist-website
JWT_SECRET=your-production-jwt-secret
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Customization

### Styling
- Edit `tailwind.config.js` for theme customization
- Modify `app/globals.css` for global styles
- Update color scheme in the config file

### Content
- Update metadata in `app/layout.tsx`
- Modify hero content in `app/page.tsx`
- Add your artwork through the admin panel

### Features
- Add new API endpoints in `app/api/`
- Create new components in `components/`
- Extend database schemas in `models/`

## Security Considerations

- JWT tokens are stored in HTTP-only cookies
- Passwords are hashed using bcrypt
- Input validation on all forms
- CORS protection on API routes
- Rate limiting recommended for production

## Performance Optimization

- Image optimization with Next.js Image
- Lazy loading for gallery images
- Pagination for large datasets
- Caching strategies for API responses
- Bundle optimization with Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## Roadmap

- [ ] Image upload functionality
- [ ] Advanced analytics dashboard
- [ ] Email notifications for inquiries
- [ ] Multi-language support
- [ ] E-commerce integration
- [ ] Blog/News section
- [ ] Social media integration
- [ ] Advanced search filters
- [ ] User accounts for customers
- [ ] Wishlist functionality 