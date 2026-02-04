# SEO Guidelines & Best Practices
## EM Taxi Touristique - SEO Implementation Reference

This document serves as a comprehensive guide for maintaining and improving SEO performance for the EM Taxi Touristique website. Follow these guidelines when making any changes to ensure optimal search engine visibility.

---

## 📋 Table of Contents

1. [SEO Architecture](#seo-architecture)
2. [Meta Tags Management](#meta-tags-management)
3. [Structured Data (Schema.org)](#structured-data-schemaorg)
4. [Semantic HTML Requirements](#semantic-html-requirements)
5. [Image Optimization](#image-optimization)
6. [Content Guidelines](#content-guidelines)
7. [Language-Specific SEO](#language-specific-seo)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility & SEO](#accessibility--seo)
10. [Testing & Validation](#testing--validation)

---

## 🏗️ SEO Architecture

### Current Implementation

- **SEO Component**: `src/components/SEO.tsx`
  - Dynamically updates meta tags based on language
  - Manages structured data (JSON-LD)
  - Updates document language attribute

- **Base Meta Tags**: `index.html`
  - Primary meta tags (title, description, keywords)
  - Open Graph tags
  - Twitter Card tags
  - Canonical URL

- **SEO Files**:
  - `public/robots.txt` - Search engine crawler instructions
  - `public/sitemap.xml` - XML sitemap for all pages

### File Structure

```
taxi-em/
├── index.html              # Base HTML with meta tags
├── public/
│   ├── robots.txt         # Crawler instructions
│   └── sitemap.xml        # Site structure
└── src/
    └── components/
        └── SEO.tsx        # Dynamic SEO management
```

---

## 🏷️ Meta Tags Management

### Required Meta Tags

Every page must include these essential meta tags:

#### Primary Meta Tags
```html
<meta name="title" content="[Page Title]" />
<meta name="description" content="[160-160 character description]" />
<meta name="keywords" content="[Relevant keywords, comma-separated]" />
<meta name="author" content="EM Taxi Touristique" />
<meta name="robots" content="index, follow" />
```

#### Open Graph (Social Media)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="http://em-taxi.com/" />
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="http://em-taxi.com/logo.png" />
<meta property="og:locale" content="fr_FR" />
```

#### Twitter Cards
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="http://em-taxi.com/" />
  <meta property="twitter:title" content="[Page Title]" />
  <meta property="twitter:description" content="[Description]" />
  <meta property="twitter:image" content="http://em-taxi.com/logo.png" />
```

### Language-Specific Meta Tags

The SEO component automatically updates meta tags based on language. When adding new content:

1. **Update `src/components/SEO.tsx`**:
   - Add language-specific titles, descriptions, and keywords
   - Ensure all three languages (FR, EN, AR) are covered

2. **Best Practices**:
   - Keep titles under 60 characters
   - Keep descriptions between 150-160 characters
   - Use relevant, location-based keywords (e.g., "Maroc", "Morocco", "المغرب")
   - Include service keywords (e.g., "chauffeur privé", "transfert aéroport")

### Example: Adding New Page

```typescript
// In SEO.tsx, add to seoContent object:
const seoContent = {
  fr: {
    title: 'EM Taxi Touristique - [Page Name] | Transport Premium au Maroc',
    description: '[French description - 150-160 chars]',
    keywords: 'taxi maroc, [additional keywords]',
  },
  en: {
    title: 'EM Taxi Touristique - [Page Name] | Premium Transport in Morocco',
    description: '[English description - 150-160 chars]',
    keywords: 'taxi morocco, [additional keywords]',
  },
  ar: {
    title: 'EM تاكسي توريستيك - [Page Name] | النقل الفاخر في المغرب',
    description: '[Arabic description - 150-160 chars]',
    keywords: 'تاكسي المغرب, [additional keywords]',
  },
};
```

---

## 📊 Structured Data (Schema.org)

### Current Implementation

The site uses **LocalBusiness** schema with the following structure:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EM Taxi Touristique",
  "telephone": "+212762728706",
  "email": "contact@em-taxi.com",
  "address": { "@type": "PostalAddress", "addressCountry": "MA" },
  "openingHoursSpecification": { "opens": "00:00", "closes": "23:59" },
  "serviceType": ["Airport Transfer", "Private Chauffeur", ...],
  "hasOfferCatalog": { ... }
}
```

### Guidelines for Updates

1. **When Adding New Services**:
   - Add to `serviceType` array
   - Add to `hasOfferCatalog.itemListElement` if it's a pricing tier

2. **When Updating Business Info**:
   - Update contact information in structured data
   - Keep address and geo information accurate
   - Update aggregate rating if new reviews are added

3. **Validation**:
   - Always validate structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)
   - Ensure all required fields are present

### Additional Schema Types to Consider

- **Service**: For individual service pages
- **Review**: For customer testimonials
- **FAQPage**: If adding FAQ section
- **BreadcrumbList**: For navigation structure

---

## 🏛️ Semantic HTML Requirements

### Required Semantic Elements

All sections must use proper semantic HTML5 elements:

#### Section Structure
```html
<section id="section-id" aria-label="Descriptive label">
  <header>
    <h2>Section Title</h2>
    <p>Section subtitle/description</p>
  </header>
  <!-- Section content -->
</section>
```

#### Current Implementation
- ✅ Hero: `<section>` with proper heading hierarchy
- ✅ Services: `<section>` with `<header>`
- ✅ Pricing: `<section>` with `<header>`
- ✅ About: `<section>` with semantic structure
- ✅ Contact: `<section>` with `<header>`
- ✅ Footer: `<footer>` element

### Heading Hierarchy

Maintain proper heading hierarchy (H1 → H2 → H3):

```
H1: Main page title (Hero section only)
H2: Section titles (Services, Pricing, About, Contact)
H3: Subsection titles (Service cards, Pricing plans)
H4: Feature titles, card titles
```

**Rules**:
- Only ONE H1 per page (in Hero section)
- Never skip heading levels (H1 → H3 is wrong, use H1 → H2 → H3)
- Use headings for structure, not styling

### ARIA Labels

Add `aria-label` attributes for:
- Sections: `aria-label="Descriptive section name"`
- Buttons with icons only: `aria-label="Button purpose"`
- Images: Use descriptive `alt` text instead
- Navigation: `aria-label="Main navigation"`

---

## 🖼️ Image Optimization

### Alt Text Requirements

**Every image MUST have descriptive alt text** following these rules:

#### Format
```
[Image Subject] - EM Taxi Touristique - [Context/Description]
```

#### Examples
```html
<!-- Good -->
<img src="logo.png" alt="EM Taxi Touristique - Logo - Transport Premium au Maroc" />
<img src="driver.jpg" alt="Chauffeur professionnel EM Taxi Touristique - Transport premium au Maroc depuis 2009" />
<img src="service.jpg" alt="Transfert Aéroport - EM Taxi Touristique - Service de transport premium" />

<!-- Bad -->
<img src="logo.png" alt="logo" />
<img src="driver.jpg" alt="driver" />
<img src="service.jpg" alt="" />
```

#### Guidelines
1. **Be Descriptive**: Describe what the image shows
2. **Include Brand**: Always mention "EM Taxi Touristique"
3. **Add Context**: Include relevant service/location information
4. **Keep It Concise**: 125 characters or less
5. **No Redundancy**: Don't start with "Image of..." or "Picture of..."

### Image Performance

```html
<!-- Add loading="lazy" for below-the-fold images -->
<img 
  src="image.jpg" 
  alt="Descriptive alt text" 
  loading="lazy"
/>
```

**When to use `loading="lazy"`**:
- ✅ Images below the fold
- ✅ Images in cards/grids
- ✅ Background images (if using `<img>`)
- ❌ Hero images (should load immediately)
- ❌ Above-the-fold images

### Image File Naming

Use descriptive, SEO-friendly filenames:
```
✅ chauffeur-professionnel-maroc.jpg
✅ mercedes-s-class-taxi.jpg
✅ transfert-aeroport-casablanca.jpg
❌ img1.jpg
❌ photo.png
❌ untitled.jpg
```

---

## 📝 Content Guidelines

### Title Tags

**Format**: `[Brand] - [Page/Service] - [Location/Value Prop] | [Year/Differentiator]`

**Examples**:
- `EM Taxi Touristique - Transport Premium & Chauffeur Privé au Maroc | Depuis 2009`
- `EM Taxi Touristique - Transfert Aéroport Casablanca | Service 24/7`

**Rules**:
- Maximum 60 characters
- Include primary keyword
- Include location (Maroc/Morocco)
- Include brand name

### Meta Descriptions

**Format**: `[What you offer] [Where] [Since when/Key benefit]. [Service details]. [Call to action].`

**Examples**:
- `EM Taxi Touristique offre des services de transport de luxe au Maroc depuis 2009. Chauffeur privé, transferts aéroport, transport d'affaires. Mercedes S-Class, BMW. Service 24/7.`

**Rules**:
- 150-160 characters (optimal length)
- Include primary keywords naturally
- Include location
- Include key services
- End with a benefit or CTA

### Keywords Strategy

**Primary Keywords** (always include):
- `taxi maroc` / `taxi morocco` / `تاكسي المغرب`
- `chauffeur privé maroc` / `private chauffeur morocco`
- `transport premium maroc` / `premium transport morocco`
- `EM Taxi Touristique`

**Secondary Keywords** (include when relevant):
- `transfert aéroport` / `airport transfer`
- `mercedes chauffeur` / `mercedes driver`
- `taxi touristique` / `tourist taxi`
- `transport de luxe` / `luxury transport`

**Location Keywords**:
- `Casablanca`, `Rabat`, `Marrakech`, `Fès`
- `Maroc`, `Morocco`, `المغرب`

---

## 🌐 Language-Specific SEO

### Language Implementation

The site supports three languages with proper SEO for each:

#### French (Default)
- **Locale**: `fr_FR`
- **HTML Lang**: `fr`
- **Keywords**: Focus on "Maroc", "chauffeur privé", "transport premium"

#### English
- **Locale**: `en_US`
- **HTML Lang**: `en`
- **Keywords**: Focus on "Morocco", "private chauffeur", "premium transport"

#### Arabic
- **Locale**: `ar_MA`
- **HTML Lang**: `ar`
- **Keywords**: Focus on "المغرب", "سائق خاص", "نقل فاخر"

### Hreflang Tags

For future multi-language pages, implement hreflang:

```html
<link rel="alternate" hreflang="fr" href="http://em-taxi.com/?lang=fr" />
<link rel="alternate" hreflang="en" href="http://em-taxi.com/?lang=en" />
<link rel="alternate" hreflang="ar" href="http://em-taxi.com/?lang=ar" />
<link rel="alternate" hreflang="x-default" href="http://em-taxi.com/" />
```

### Translation Files

When adding new content, ensure translations exist in:
- `src/locales/fr.json`
- `src/locales/en.json`
- `src/locales/ar.json`

**SEO Considerations**:
- Translate keywords naturally (don't force keywords)
- Maintain keyword relevance in each language
- Use local terminology (e.g., "chauffeur" in French vs "driver" in English)

---

## ⚡ Performance Optimization

### Core Web Vitals

Ensure the site meets Google's Core Web Vitals:

1. **Largest Contentful Paint (LCP)**: < 2.5 seconds
   - Optimize hero images
   - Use lazy loading for below-fold content
   - Minimize render-blocking resources

2. **First Input Delay (FID)**: < 100 milliseconds
   - Minimize JavaScript execution time
   - Use code splitting
   - Defer non-critical JavaScript

3. **Cumulative Layout Shift (CLS)**: < 0.1
   - Set image dimensions
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

### Image Optimization

- Use WebP format when possible
- Compress images (aim for < 200KB)
- Use appropriate image sizes (responsive images)
- Implement lazy loading

### Code Optimization

- Minify CSS and JavaScript in production
- Use code splitting
- Remove unused dependencies
- Optimize bundle size

---

## ♿ Accessibility & SEO

### Accessibility Best Practices

1. **Alt Text**: All images must have descriptive alt text
2. **ARIA Labels**: Use for interactive elements without text
3. **Semantic HTML**: Use proper HTML5 semantic elements
4. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
5. **Color Contrast**: Maintain WCAG AA contrast ratios (4.5:1 for text)

### SEO Benefits of Accessibility

- Better user experience = lower bounce rate
- Screen readers can understand content structure
- Semantic HTML helps search engines understand content
- Accessible sites rank better in search results

---

## ✅ Testing & Validation

### SEO Testing Checklist

Before deploying changes, verify:

#### Meta Tags
- [ ] Title tags are unique and under 60 characters
- [ ] Meta descriptions are 150-160 characters
- [ ] Open Graph tags are present and correct
- [ ] Twitter Card tags are present and correct
- [ ] Canonical URL is set correctly

#### Structured Data
- [ ] Validate JSON-LD using [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check for errors in structured data
- [ ] Verify all required fields are present

#### Technical SEO
- [ ] All images have alt text
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Semantic HTML elements used correctly
- [ ] `robots.txt` allows crawling
- [ ] `sitemap.xml` is accessible and valid

#### Performance
- [ ] Page load time < 3 seconds
- [ ] Mobile-friendly (responsive design)
- [ ] HTTPS enabled (in production)
- [ ] No console errors

### Tools for Validation

1. **Google Search Console**: Monitor search performance
2. **Google Rich Results Test**: Validate structured data
3. **PageSpeed Insights**: Check performance metrics
4. **Lighthouse**: Comprehensive SEO audit
5. **W3C Validator**: HTML validation
6. **Schema.org Validator**: Structured data validation

### Regular Maintenance

- **Weekly**: Check Google Search Console for errors
- **Monthly**: Review and update meta descriptions if needed
- **Quarterly**: Audit structured data and update if business info changes
- **Annually**: Review and update sitemap, check for broken links

---

## 🚀 Quick Reference

### When Adding New Content

1. ✅ Add semantic HTML structure (`<section>`, `<header>`, etc.)
2. ✅ Include proper heading hierarchy
3. ✅ Add descriptive alt text to images
4. ✅ Update SEO component with new meta tags (if new page)
5. ✅ Update sitemap.xml
6. ✅ Test structured data (if adding new service types)
7. ✅ Validate with SEO testing tools

### When Modifying Existing Content

1. ✅ Maintain semantic HTML structure
2. ✅ Keep heading hierarchy intact
3. ✅ Update alt text if images change
4. ✅ Update meta descriptions if content changes significantly
5. ✅ Test that structured data still validates

### Common Mistakes to Avoid

❌ **Don't**:
- Use generic alt text like "image" or "photo"
- Skip heading levels (H1 → H3)
- Forget to update meta tags for new pages
- Use images without alt text
- Create duplicate content across languages
- Use keyword stuffing in meta descriptions
- Ignore mobile optimization

✅ **Do**:
- Write descriptive, natural alt text
- Maintain proper heading hierarchy
- Update SEO component when adding pages
- Test structured data after changes
- Keep content unique per language
- Focus on user experience, not just keywords
- Optimize for mobile-first indexing

---

## 📚 Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev SEO Guide](https://web.dev/learn-seo/)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Google Search Central](https://developers.google.com/search)

---

## 📝 Notes

- This document should be updated whenever SEO implementation changes
- Always test changes in development before deploying
- Monitor Google Search Console for any issues after deployment
- Keep structured data in sync with actual business information

---

**Last Updated**: January 2026
**Maintained By**: Development Team
**Project**: EM Taxi Touristique
