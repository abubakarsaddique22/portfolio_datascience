# Abubakar Saddique — Portfolio (v2)

A rebuilt, single-page, dark-mode portfolio for an AI/ML Engineer. Plain HTML/CSS/JS —
no build step, no framework, deploys straight to GitHub Pages.

## Before you push this live

This redesign only includes new `index.html`, `css/`, and `js/`. You still need to
copy two things over from your **old repo**:

1. `images/about-me.png` → drop your photo into the `images/` folder here (same filename).
2. `cv/Abubakar_Saddique_AI_ML_Resume_v1.pdf` → drop your résumé into the `cv/` folder here (same filename).

If you use different filenames, update the two references in `index.html`
(search for `images/about-me.png` and `cv/Abubakar_Saddique_AI_ML_Resume_v1.pdf`).

## What changed vs the old version

- Rebuilt from scratch (no more Colorlib template) — dark, AI/ML-flavored visual identity
  built around an animated "training loss" chart in the hero.
- Sticky nav with active-section highlighting + mobile hamburger menu.
- Typing animation cycling through your roles.
- Scroll-triggered reveal animations (fade/slide-in), respects prefers-reduced-motion.
- Skill bars animate in on scroll; added a "tools & frameworks" tag row (LangChain, CrewAI,
  Ollama, Power BI, AWS, MySQL, Git, Python) pulled from your actual bio/experience text.
- Experience + education merged into one vertical timeline.
- Project cards redesigned with tags and hover motion — same 7 projects/links as before.
- Removed: Colorlib template credit, the static "0+ Projects completed" counter,
  placeholder tel/mailto links.
- Contact section kept intentionally simple (no form backend) — just clean tappable
  cards for email, phone, LinkedIn and GitHub, per your "keep it light" request.

## Structure

```
index.html
css/style.css
js/script.js
images/about-me.png   <- add your photo here
cv/...pdf              <- add your résumé here
```

## Deploying

Just replace the contents of your portfolio_datascience repo with these files
(keeping your existing images/ photo and cv/ PDF), commit, and push to main.
GitHub Pages will pick it up automatically.
