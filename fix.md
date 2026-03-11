# Portfolio Website SEO Optimization

## ROLE

You are a **Senior Frontend Engineer and Technical SEO Expert**.

Your task is to improve my **portfolio website SEO** by adding proper **metadata, meta tags, structured data, and technical SEO optimizations**.

Follow modern SEO standards used in production websites.

### IMPORTANT

* Do NOT change UI
* Do NOT modify styling
* Do NOT break existing functionality
* Only add SEO related improvements

---

# OBJECTIVE

Optimize the portfolio website for:

* Search engine indexing
* Google ranking
* Social media preview
* Faster crawlability
* Better metadata structure
* Semantic HTML
* Performance optimization

---

# 1 Add Essential Meta Tags

Ensure the following exist inside the `<head>` section.

```
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Aditya Shah | Software Developer Portfolio</title>

<meta name="description" content="Aditya Shah portfolio showcasing software development projects, AI tools, full stack applications, and modern web technologies.">

<meta name="keywords" content="Aditya Shah, software developer, full stack developer, web developer portfolio, AI developer, JavaScript developer, React developer, backend developer, software engineer portfolio">

<meta name="author" content="Aditya Shah">

<meta name="robots" content="index, follow">
```

---

# 2 Add Open Graph Metadata

These tags improve link previews on **LinkedIn, Facebook, WhatsApp, Discord etc.**

```
<meta property="og:title" content="Aditya Shah | Software Developer Portfolio">
<meta property="og:description" content="Portfolio of Aditya Shah showcasing full stack development, AI projects, and modern web applications.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:image" content="https://yourdomain.com/preview.png">
```

---

# 3 Add Twitter Metadata

Improve previews on **Twitter / X**.

```
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Aditya Shah | Software Developer">
<meta name="twitter:description" content="Software developer portfolio featuring AI tools, web apps, and modern full stack projects.">
<meta name="twitter:image" content="https://yourdomain.com/preview.png">
```

---

# 4 Add Canonical Tag

Prevent duplicate SEO indexing.

```
<link rel="canonical" href="https://yourdomain.com">
```

---

# 5 Add Structured Data (Schema.org)

Add structured JSON-LD data for a **Person Portfolio**.

```
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Person",
 "name": "Aditya Shah",
 "url": "https://yourdomain.com",
 "jobTitle": "Software Developer",
 "sameAs": [
   "https://github.com/yourgithub",
   "https://linkedin.com/in/yourlinkedin"
 ]
}
</script>
```

---

# 6 Improve Semantic HTML

Ensure sections use proper semantic tags.

```
<header>
  <nav></nav>
</header>

<main>

  <section id="about"></section>

  <section id="projects"></section>

  <section id="skills"></section>

  <section id="contact"></section>

</main>

<footer></footer>
```

---

# 7 Image SEO Optimization

Every image must include descriptive alt text.

Example:

```
<img src="ai-workflow-builder.png" alt="AI workflow builder project created by Aditya Shah">
```

Enable lazy loading.

```
<img src="project.png" loading="lazy" alt="Full stack ecommerce project preview">
```

---

# 8 Add robots.txt

Create a **robots.txt** file at the root of the website.

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

# 9 Add sitemap.xml

Create a sitemap for search engines.

```
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://yourdomain.com</loc>
  </url>

  <url>
    <loc>https://yourdomain.com/projects</loc>
  </url>

  <url>
    <loc>https://yourdomain.com/contact</loc>
  </url>

</urlset>
```

---

# 10 Performance SEO

Optimize loading performance.

Preload fonts.

```
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

Ensure:

* images optimized
* lazy loading enabled
* unused scripts removed

---

# 11 SEO Friendly URLs

Good URLs:

```
/projects/ai-workflow-builder
/projects/ecommerce-platform
```

Bad URLs:

```
/project?id=123
/page?id=45
```

---

# 12 Mobile SEO

Ensure responsive meta tag exists.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

# 13 High Value SEO Keywords

Use these keywords in metadata and content.

```
software developer portfolio
full stack developer portfolio
web developer portfolio
AI developer portfolio
React developer portfolio
JavaScript developer portfolio
backend developer portfolio
software engineer portfolio
modern web developer
full stack projects
```

---

# OUTPUT REQUIREMENTS

The final implementation should include:

1. Updated `<head>` metadata
2. robots.txt file
3. sitemap.xml file
4. structured data implementation
5. summary of SEO improvements
