# HPMN Power Website

Static website for Guangdong Huapu Intelligent Technology Co., Ltd.

## Deployment

Recommended setup:

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, create a project from that GitHub repository.
3. Use these build settings:
   - Framework preset: None
   - Build command: leave empty
   - Build output directory: `/`
4. First deploy only to the generated `*.pages.dev` preview URL.
5. Confirm the site and downloads work before changing any DNS for `hpmnpower.com`.

## CMS Editing

This repo includes `.pages.yml` for Pages CMS.

Editable content:

- `data/translations.json`: English and Chinese website copy.
- `data/site-data.json`: products, download cards, solution cards, and factory media.
- Product images can be uploaded to `assets/images/products`.

Download PDFs are stored in `public/downloads`.

Current download links include:

- `/public/downloads/HPMN_DALI_User_Manual.pdf`
- `/public/downloads/HPMN_Smart_Dimming_Power_Supply_User_Manual_EN.pdf`
- `/public/downloads/hpmn-2026hpmn-catalog.pdf`
- `/public/downloads/hpmn-asset.pdf`


Last deployment trigger: 2026-08-06 20:09:42 UTC
