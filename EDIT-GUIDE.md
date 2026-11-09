# 📘 دليل تعديل الموقع — Ziad Sakr Portfolio

> الموقع: **https://ziad-sakr-portfolio.pages.dev**
> الكود: فولدر `ziad-sakr-portfolio` على الديسكتوب + GitHub (خاص): `sheetswork26-hue/ziad-sakr-portfolio`

---

## ⚡ الخلاصة في 3 خطوات (لأي تعديل)

1. عدّل الملف (الجداول تحت بتقولك أنهي ملف).
2. جرّب على جهازك (اختياري):
   ```bash
   npm run dev
   ```
   وافتح `http://localhost:4321` — أي تعديل بيظهر فوراً. اقفله بـ `Ctrl + C`.
3. ارفع على النت:
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name ziad-sakr-portfolio --branch main
   ```
   ⏱️ حوالي دقيقة · 💰 مجاني

> 💡 شغّل الأوامر من Terminal **جوه فولدر المشروع** (في VS Code: `Terminal → New Terminal`).

**احفظ نسخة على GitHub بعد كل تعديل (موصى به):**
```bash
git add -A
git commit -m "وصف التعديل"
git push
```

---

## 🗂️ خريطة الملفات

| الملف / الفولدر | فيه إيه |
|---|---|
| `src/site.ts` | **أهم ملف**: اسمك، التايتل، الوصف، الإيميل، الواتساب، اللينكات، الأرقام، مفتاح الفورم |
| `src/content/projects/*.md` | المشاريع (ملف لكل مشروع) |
| `public/workflows/*.json` | الـ workflows اللي بتظهر تفاعلية في صفحة المشروع |
| `public/me.webp` | صورتك |
| `public/favicon.svg` | أيقونة الصقر (التاب) |
| `public/og.jpg` | صورة المشاركة على LinkedIn/WhatsApp |
| `src/styles/global.css` | الألوان والخطوط (أول 25 سطر) |
| `src/pages/index.astro` | الصفحة الرئيسية: الخدمات، خطوات الشغل، التواصل |
| `src/components/IntroHero3.astro` | الجزء اللي فيه صورتك والتايتل (شكل الموبايل في آخر الملف تحت `phones (≤720px)`) |
| `src/components/AutomationStory.astro` | أنيميشن قبل/بعد الأتمتة |
| `src/layouts/Base.astro` | الهيدر، الفوتر، زرار الواتساب |
| `scripts/make-og.mjs` | بيعمل صورة المشاركة من جديد |
| `design-archive/` | صورتك الأصلية + مقارنة قبل/بعد (مش بتترفع) |

---

## ✏️ تعديلات شائعة

### 1) تغيير بياناتك (اسم، تايتل، لينكات، واتساب، أرقام)
📄 `src/site.ts`
```ts
role: 'AI Automation Engineer · Full-Stack Developer',
whatsapp: '+20 106 746 1252',
links: { linkedin: '...', github: '...', whatsapp: 'https://wa.me/201067461252' },
stats: [ { value: '4', label: 'end-to-end systems shipped' }, ... ],
```
عدّل الكلام بين `' '` بس، وسيب العلامات زي ما هي.

### 2) تعديل مشروع موجود
📄 `src/content/projects/اسم-المشروع.md`
- الجزء اللي فوق بين `---` و `---` = البيانات (العنوان، الأرقام، الأدوات، الـ flow).
- الجزء اللي تحت = كلام الـ case study (عادي، Markdown: `## عنوان` و `- نقطة`).

### 3) إضافة مشروع جديد
1. انسخ أي ملف في `src/content/projects/` وسمّيه باسم المشروع بالإنجليزي وشَرطات، مثلاً `invoice-bot.md` (ده هيبقى اللينك: `/projects/invoice-bot/`).
2. عدّل البيانات والكلام.
3. (اختياري) الـ workflow التفاعلي:
   - من n8n: `... → Download` للـ workflow.
   - ⚠️ **امسح أي credentials / API keys / أرقام تليفونات / IDs** من الملف.
   - حطه في `public/workflows/invoice-bot.json`، واكتب في ملف المشروع: `workflow: /workflows/invoice-bot.json`
4. ترتيب الظهور: `order: 5` (الأصغر يظهر الأول).
5. ارفع (الخطوات فوق).

### 4) تغيير صورتك
1. حط الصورة الجديدة مكان `public/me.webp` **بنفس الاسم** (لو JPG/PNG حوّلها لـ webp أو اطلب من Claude).
2. حدّث صورة المشاركة:
   ```bash
   node scripts/make-og.mjs
   ```
3. ارفع.

### 5) تغيير الألوان
📄 `src/styles/global.css` — أول السطور:
```css
--accent: #ea4b71;        /* اللون الأساسي (وردي n8n) */
--accent-strong: #d6365f; /* لون الزراير */
--bg: #0e0b16;            /* الخلفية */
```

### 6) تعديل الخدمات أو خطوات الشغل
📄 `src/pages/index.astro` — فوق في الملف: `const services = [...]` و `const process = [...]`.

### 7) الفورم (التواصل)
- الرسايل بتوصل على إيميل حساب **Web3Forms**.
- المفتاح في `src/site.ts` → `web3formsKey`.
- لو غيرت الدومين: غيّره كمان في إعدادات الفورم على web3forms.com.

### 8) الأنيميشن الافتتاحي
- بيظهر **مرة واحدة في كل زيارة** (مش بيتكرر لما ترجع للصفحة الرئيسية أو تعمل refresh أو تفتح لينك زي `/#work`).
- عشان تشوفه تاني: افتح `https://ziad-sakr-portfolio.pages.dev/?intro`
- الكلام والتوقيت في `src/components/AutomationStory.astro`.

---

## 🤖 لو هتستخدم Claude للتعديل (توفير توكنز)

- افتح **session جديدة** على فولدر المشروع (مش المحادثة القديمة الطويلة).
- اطلب بشكل محدد واجمع التعديلات في رسالة واحدة. أمثلة:
  - «غيّر رقم الـ nodes في `site.ts` لـ 200 وارفع الموقع»
  - «ضيف مشروع جديد اسمه X من الفولدر ده ... بنفس شكل باقي المشاريع وارفع»
  - «غيّر لون الـ accent لـ #7c4dff ووريني معاينة قبل الرفع»
- ملف `CLAUDE.md` في المشروع بيعرّف Claude بالمشروع تلقائياً.

---

## 🛠️ مشاكل ممكن تقابلك وحلها

| المشكلة | الحل |
|---|---|
| `wrangler` يقول *Not logged in* | `npx wrangler login` في Terminal عادي ووافق في المتصفح |
| `npm` يقول `EALLOWSCRIPTS` | شغّل أوامر wrangler من Terminal تفاعلي (VS Code / PowerShell) مش من سكريبت |
| `npm run dev` يقول ناقص packages | `npm install` مرة واحدة |
| الموقع مش بيتحدث بعد الرفع | `Ctrl + Shift + R` في المتصفح (تحديث بدون كاش) |
| رفعت حاجة غلط وعاوز ترجع | Cloudflare Dashboard → Workers & Pages → ziad-sakr-portfolio → Deployments → على النسخة القديمة: **Rollback** |

---

## 🧱 الأدوات المستخدمة

- **Astro** — بناء الموقع (Static, سريع جداً)
- **Cloudflare Pages** — الاستضافة (مجاني)
- **Web3Forms** — فورم التواصل
- **sharp** — معالجة الصور وصورة المشاركة
- **n8n demo component** — عرض الـ workflows تفاعلياً
