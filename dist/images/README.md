# Images Directory

This folder contains all static images for the portfolio.

## Folder Structure

- `experience/` - Images for experience items (company logos, project screenshots)
- `projects/` - Images for project showcases
- `personal/` - Personal photos (professional photo, candid photos)

## How to Use

In your `portfolioData.ts` file, reference images like this:

```typescript
imageUrl: "/images/experience/thegoodgametheory.jpg"
imageUrl: "/images/projects/navsmart.png"
imageUrl: "/images/personal/professional-photo.jpg"
```

**Note:** Always use paths starting with `/images/` (not `./images/` or `../images/`)

## Image Naming Convention

Use lowercase with hyphens:
- ✅ `thegoodgametheory-logo.jpg`
- ✅ `setu-project.png`
- ❌ `TheGoodGameTheory Logo.jpg` (spaces and capitals)







