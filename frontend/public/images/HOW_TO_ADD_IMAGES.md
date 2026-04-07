# Images Kaise Add Karein (How to Add Images)

## 📁 Step 1: Images Ko Folder Mein Rakhein

Apne images ko following folders mein rakhein:

### Folder Structure:
```
frontend/public/images/
├── profile/          # Profile photos
│   └── photo.jpg     # Apna profile photo yahan rakhein
├── projects/         # Project screenshots
│   ├── project1.jpg
│   ├── project2.png
│   └── ...
├── certificates/     # Certificates
│   ├── cert1.jpg
│   └── ...
├── gallery/          # General gallery images
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
└── logos/            # Logo files
    └── logo.svg
```

## 📸 Step 2: Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp` (Recommended - smaller file size)
- `.gif`
- `.svg`

## 💻 Step 3: Code Mein Use Karein

### Example 1: Simple Image (Home Page)
```tsx
import Image from 'next/image';

<Image
  src="/images/profile/photo.jpg"
  alt="Your Name"
  width={200}
  height={200}
  className="rounded-full"
/>
```

### Example 2: Profile Photo with Hover Effect
```tsx
<div className="relative w-32 h-32 rounded-full border-4 overflow-hidden">
  <Image
    src="/images/profile/photo.jpg"
    alt="Profile Photo"
    fill
    className="object-cover"
  />
</div>
```

### Example 3: Gallery Mein Images
`frontend/app/gallery/page.tsx` file ko edit karein:

```tsx
const galleryImages = [
  { 
    src: '/images/gallery/your-image1.jpg', 
    alt: 'Description', 
    title: 'Image Title' 
  },
  { 
    src: '/images/gallery/your-image2.jpg', 
    alt: 'Description 2', 
    title: 'Image Title 2' 
  },
  // Add more images here...
];
```

### Example 4: Projects Page Mein
```tsx
<Image
  src="/images/projects/project-screenshot.jpg"
  alt="Project Screenshot"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## ⚡ Important Notes:

1. **Path**: Images ka path hamesha `/images/...` se start hoga (not `/public/images/...`)
2. **Next.js Image Component**: Hamesha `next/image` use karein for better performance
3. **Optimization**: Next.js automatically optimize karta hai images ko
4. **File Size**: Large images ka size kam karein before uploading (recommended: <500KB)

## 🎨 Image Optimization Tips:

1. Use WebP format for better compression
2. Resize images to appropriate dimensions before adding
3. Use tools like:
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)
   - ImageMagick for bulk resize

## 📝 Quick Checklist:

- [ ] Profile photo add kiya (`/images/profile/photo.jpg`)
- [ ] Project screenshots add kiye (`/images/projects/`)
- [ ] Gallery images add kiye (`/images/gallery/`)
- [ ] Certificates add kiye (`/images/certificates/`)
- [ ] Gallery page mein images ki list update ki (`/app/gallery/page.tsx`)

---

**Note**: Agar image exist nahi karti, to error show nahi hoga - component automatically hide ho jayega.

