# 🔄 Миграция со старой версии

## Что изменилось

### Было (старая HTML версия)
```
danilovcpp.github.io/
├── index.html          # Всё в одном файле
├── script.js           # Вся логика в одном файле
└── style.css           # Все стили в одном файле
```

### Стало (Next.js версия)
```
abacus-app/
├── app/                # Страницы (разделены по тренажерам)
├── components/         # Переиспользуемые компоненты
├── hooks/              # Логика вынесена в хуки
├── lib/                # Утилиты
└── types/              # TypeScript типы
```

## 🎯 Преимущества новой версии

### 1. Модульность
**Было:** Весь код в 3 файлах (HTML, JS, CSS)
**Стало:** Код разделён по модулям и компонентам

### 2. Переиспользование
**Было:** Дублирование кода для каждого элемента
**Стало:** Переиспользуемые компоненты (Button, Card, Input, etc.)

```tsx
// Старая версия - дублирование
<button class="btn btn-primary">Button 1</button>
<button class="btn btn-primary">Button 2</button>

// Новая версия - компонент
<Button variant="primary">Button 1</Button>
<Button variant="primary">Button 2</Button>
```

### 3. Типизация
**Было:** JavaScript без типов
**Стало:** TypeScript с полной типизацией

```typescript
// Теперь всё типизировано
interface AbacusProps {
  columns: number;
  value: number;
  onChange: (value: number) => void;
}
```

### 4. Маршрутизация
**Было:** Одна страница, переключение через display: none
**Стало:** Отдельные страницы для каждого тренажера

```
/                           - Главная
/trainers/basic            - Базовый режим
/trainers/flash-anzan      - Flash Anzan
/trainers/guess-result     - Угадай результат
...
```

### 5. Управление состоянием
**Было:** Классы с глобальным состоянием
**Стало:** React хуки с локальным состоянием

```typescript
// Старая версия
class Abacus {
  constructor() {
    this.values = [];
  }
}

// Новая версия
const { currentValue, setValue } = useAbacus(6);
```

## 📦 Соответствие компонентов

### Классы → Хуки

| Старый класс | Новый хук | Файл |
|--------------|-----------|------|
| `Abacus` | `useAbacus` | `hooks/useAbacus.ts` |
| `FlashAnzanTrainer` | `useFlashAnzan` | `hooks/useFlashAnzan.ts` |
| `PracticeMode` | встроено в страницу | `app/trainers/basic/page.tsx` |

### HTML → Компоненты

| Старый HTML | Новый компонент | Файл |
|-------------|-----------------|------|
| `<button class="btn">` | `<Button>` | `components/ui/Button.tsx` |
| `<div class="card">` | `<Card>` | `components/ui/Card.tsx` |
| `<input class="number-input">` | `<Input>` | `components/ui/Input.tsx` |
| `<select class="flash-select">` | `<Select>` | `components/ui/Select.tsx` |
| `<div class="abacus">` | `<Abacus>` | `components/trainers/Abacus.tsx` |

### CSS классы → Tailwind

| Старые классы | Новые Tailwind классы |
|---------------|----------------------|
| `.btn-primary` | `bg-gradient-primary` + другие утилиты |
| `.card` | Компонент Card с встроенными стилями |
| `.abacus` | Компонент Abacus с Tailwind |

## 🔧 Как портировать функциональность

### Пример 1: Кнопка сброса

**Было:**
```javascript
document.getElementById('reset').addEventListener('click', () => {
    abacus.reset();
});
```

**Стало:**
```tsx
const { reset } = useAbacus(6);

<Button onClick={reset}>Сбросить</Button>
```

### Пример 2: Установка значения

**Было:**
```javascript
document.getElementById('set-number').addEventListener('click', () => {
    const value = parseInt(input.value);
    abacus.setValue(value);
});
```

**Стало:**
```tsx
const [inputValue, setInputValue] = useState(0);
const { setValue } = useAbacus(6);

<Input
  value={inputValue}
  onChange={(e) => setInputValue(Number(e.target.value))}
/>
<Button onClick={() => setValue(inputValue)}>
  Показать на абакусе
</Button>
```

### Пример 3: Flash Anzan

**Было:**
```javascript
class FlashAnzanTrainer {
  start() {
    this.generateNumbers(count, digits);
    this.showNumbers(speed);
  }
}
```

**Стало:**
```tsx
const { start, numbers, stats } = useFlashAnzan();

const handleStart = () => {
  start(settings, onNumberShow, onFinish);
};

<Button onClick={handleStart}>Начать</Button>
```

## 🚀 Новые возможности

### 1. Серверный рендеринг (SSR)
Next.js поддерживает SSR из коробки для лучшего SEO

### 2. Оптимизация изображений
Автоматическая оптимизация через `next/image`

### 3. API Routes
Можно добавить API:
```typescript
// app/api/save-stats/route.ts
export async function POST(request: Request) {
  const stats = await request.json();
  // Сохранение статистики
  return Response.json({ success: true });
}
```

### 4. Метаданные
Улучшенное SEO:
```typescript
export const metadata = {
  title: 'Абакус - Базовый режим',
  description: 'Практика работы с абакусом',
};
```

### 5. Прогрессивное веб-приложение (PWA)
Легко добавить с помощью `next-pwa`

## 📊 Производительность

### Размер бандла
- **Старая версия:** ~50KB (без фреймворка)
- **Новая версия:** ~200KB (с React + Next.js)
- **Но:** Автоматическое code splitting, ленивая загрузка

### Скорость загрузки
- **Старая версия:** Одна страница, всё загружается сразу
- **Новая версия:** Каждая страница загружается отдельно

### Оптимизации
- Tree shaking
- Минификация
- Сжатие gzip/brotli
- Кэширование

## 🎓 Обучение

Если вы новичок в Next.js:

1. Начните с [QUICKSTART.md](QUICKSTART.md)
2. Изучите [DEVELOPMENT.md](DEVELOPMENT.md)
3. Посмотрите примеры в существующих компонентах

## ❓ FAQ

**Q: Почему мигрировать на Next.js?**
A: Масштабируемость, типизация, современный стек, легче поддерживать

**Q: Можно ли использовать старую версию?**
A: Да, старая версия продолжит работать, но новая версия удобнее для развития

**Q: Сложно ли изучить Next.js?**
A: Если знаете React - легко. Если нет - начните с React, потом Next.js

**Q: Что делать со старым кодом?**
A: Сохраните как legacy, используйте новую версию для новых фич

## 🔗 Полезные ссылки

- [Next.js Learn](https://nextjs.org/learn) - интерактивное обучение
- [React Documentation](https://react.dev) - документация React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - изучение TypeScript
