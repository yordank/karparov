# Лична визитка / портфолио

Сайт на **React** (с **Vite**). Публикува се автоматично в **Railway** при всяко качване в GitHub.

## Стартиране локално

```bash
npm install
npm run dev
```

и отвори адреса, който показва (обикновено `http://localhost:5173`).

`npm run build` прави готовия сайт в папка `dist/`.

## Структура

```
index.html               — входна HTML страница (meta тагове, шрифтове)
src/main.jsx             — стартира React
src/App.jsx              — общ layout и избор на страница
src/context.jsx          — език (EN/BG), тема, навигация (#/blog)
src/translations.js      — целият текст на сайта на английски и български
src/pages/Home.jsx       — началната страница (секции, проекти)
src/pages/BlogPage.jsx   — списък със статии
src/pages/PostPage.jsx   — една статия
src/components/          — Header, Footer, PostList
src/posts.js             — зарежда статиите от posts/
src/style.css            — стилове, светла/тъмна тема
posts/                   — статиите: posts.json (списък) + <slug>.md (текст)
public/                  — снимки, robots.txt, sitemap.xml
railway.json             — настройки за Railway
```

## Промени по съдържанието

- Текстове: `src/translations.js` (двата езика един до друг).
- Проекти: масивът `PROJECTS` в `src/pages/Home.jsx`.
- Цветове: CSS променливите в `:root` в `src/style.css`.

## Нова статия в блога

1. Създай файл `posts/<slug>.md` с текста на статията в Markdown.
   `<slug>` е кратко име с латиница и тирета, например `bitcoin-halving`.
2. Добави запис най-отгоре в `posts/posts.json`:

```json
{
  "slug": "bitcoin-halving",
  "date": "2026-11-10",
  "title": { "bg": "Заглавие на български", "en": "Title in English" },
  "summary": { "bg": "Едно изречение за статията.", "en": "One sentence about the post." },
  "lang": "bg"
}
```

- `date` е във формат `ГГГГ-ММ-ДД`. Статиите се подреждат автоматично по дата — най-новите първи.
- `lang` е езикът, на който е написан текстът. Ако читателят е на другия език, ще види бележка.
- Заглавието и резюмето може да са само на един език: `"title": "Само едно заглавие"`.
- `"draft": true` скрива статията, докато не е готова.

Последните 3 статии се показват и на началната страница.

Адресът на статия е `https://yordank.github.io/karparov/#/blog/<slug>`.

## Публикуване

Railway следи основния клон в GitHub. При всяко качване Railpack разпознава Vite, пуска `npm run build` и публикува папка `dist/`.
Важно: в `package.json` не трябва да има скрипт `start` — иначе Railway няма да сервира сайта като статичен.
