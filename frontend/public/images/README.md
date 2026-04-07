# Images Folder

Yahan apne portfolio ki images add karein.

## Folder Structure:
- `profile/` - Profile photos
- `projects/` - Project screenshots/images
- `certificates/` - Certificates
- `gallery/` - General gallery images
- `logos/` - Logo files

## Supported Formats:
- .jpg, .jpeg
- .png
- .webp
- .gif
- .svg

## Usage Example:
```tsx
import Image from 'next/image';

<Image 
  src="/images/profile/photo.jpg" 
  alt="Profile Photo"
  width={200}
  height={200}
/>
```

