# Дизайн-система проекта "Абакус"

## Обзор

Минималистичная и современная дизайн-система для приложения обучения счету на абакусе. Использует темную тему с яркими акцентами и градиентами.

---

## 🎨 Цветовая палитра

### Основные цвета

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--color-primary` | #667eea | Основной бренд-цвет |
| `--color-primary-dark` | #764ba2 | Темный оттенок основного цвета |
| `--color-secondary` | #f093fb | Вторичный цвет |
| `--color-secondary-dark` | #f5576c | Темный оттенок вторичного цвета |
| `--color-accent` | #4facfe | Акцентный цвет |
| `--color-accent-dark` | #00f2fe | Темный оттенок акцента |
| `--color-success` | #43e97b | Успешные действия |
| `--color-success-dark` | #38f9d7 | Темный оттенок успеха |
| `--color-error` | #f5576c | Ошибки |
| `--color-error-light` | #ff6b88 | Светлый оттенок ошибки |

### Градиенты

```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
--gradient-background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
```

### Нейтральные цвета

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--color-dark-bg` | #0f0c29 | Основной фон |
| `--color-dark-surface` | #1a1a2e | Поверхности |
| `--color-dark-elevated` | #252538 | Приподнятые элементы |

### Цвета текста

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--color-text-primary` | #ffffff | Основной текст |
| `--color-text-secondary` | rgba(255, 255, 255, 0.7) | Вторичный текст |
| `--color-text-tertiary` | rgba(255, 255, 255, 0.5) | Третичный текст |

### Прозрачные слои

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--color-overlay-light` | rgba(255, 255, 255, 0.05) | Легкий оверлей |
| `--color-overlay-medium` | rgba(255, 255, 255, 0.1) | Средний оверлей |
| `--color-overlay-heavy` | rgba(0, 0, 0, 0.3) | Тяжелый оверлей |
| `--color-overlay-darker` | rgba(0, 0, 0, 0.4) | Очень темный оверлей |

---

## 📝 Типографика

### Семейства шрифтов

```css
--font-family-base: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
--font-family-heading: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Размеры шрифтов

| Переменная | Размер | Пиксели | Использование |
|------------|--------|---------|---------------|
| `--font-size-xs` | 0.75rem | 12px | Очень мелкий текст |
| `--font-size-sm` | 0.875rem | 14px | Мелкий текст |
| `--font-size-base` | 1rem | 16px | Базовый текст |
| `--font-size-md` | 1.125rem | 18px | Средний текст |
| `--font-size-lg` | 1.25rem | 20px | Крупный текст |
| `--font-size-xl` | 1.5rem | 24px | Очень крупный |
| `--font-size-2xl` | 2rem | 32px | Заголовки |
| `--font-size-3xl` | 2.5rem | 40px | Крупные заголовки |
| `--font-size-4xl` | 3.5rem | 56px | Hero заголовки |
| `--font-size-5xl` | 4rem | 64px | Огромные числа |
| `--font-size-6xl` | 6rem | 96px | Flash Anzan |

### Веса шрифтов

| Переменная | Значение |
|------------|----------|
| `--font-weight-light` | 300 |
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-extrabold` | 800 |

### Высота строк

| Переменная | Значение |
|------------|----------|
| `--line-height-tight` | 1.2 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.6 |
| `--line-height-loose` | 1.8 |

---

## 📐 Размеры и отступы

### Spacing Scale (8px базовая сетка)

| Переменная | Размер | Пиксели |
|------------|--------|---------|
| `--spacing-xs` | 0.25rem | 4px |
| `--spacing-sm` | 0.5rem | 8px |
| `--spacing-md` | 1rem | 16px |
| `--spacing-lg` | 1.5rem | 24px |
| `--spacing-xl` | 2rem | 32px |
| `--spacing-2xl` | 2.5rem | 40px |
| `--spacing-3xl` | 3rem | 48px |
| `--spacing-4xl` | 4rem | 64px |

### Радиусы скругления

| Переменная | Размер | Пиксели |
|------------|--------|---------|
| `--radius-sm` | 0.5rem | 8px |
| `--radius-md` | 0.625rem | 10px |
| `--radius-lg` | 0.9375rem | 15px |
| `--radius-xl` | 1.25rem | 20px |
| `--radius-round` | 50% | Круглый |

---

## 🎭 Тени

| Переменная | Значение |
|------------|----------|
| `--shadow-sm` | 0 2px 8px rgba(0, 0, 0, 0.1) |
| `--shadow-md` | 0 10px 30px rgba(0, 0, 0, 0.2) |
| `--shadow-lg` | 0 20px 60px rgba(0, 0, 0, 0.3) |
| `--shadow-xl` | 0 30px 80px rgba(0, 0, 0, 0.4) |
| `--shadow-primary` | 0 10px 30px rgba(102, 126, 234, 0.4) |
| `--shadow-primary-hover` | 0 15px 40px rgba(102, 126, 234, 0.6) |
| `--shadow-success` | 0 5px 25px rgba(67, 233, 123, 0.6) |
| `--shadow-error` | 0 5px 25px rgba(245, 87, 108, 0.6) |
| `--shadow-inset` | inset 0 5px 20px rgba(0, 0, 0, 0.5) |
| `--shadow-glow-primary` | 0 0 20px rgba(102, 126, 234, 0.3) |
| `--shadow-glow-success` | 0 0 30px rgba(102, 126, 234, 0.4) |

---

## ⚡ Transitions

| Переменная | Значение |
|------------|----------|
| `--transition-fast` | 0.15s ease |
| `--transition-base` | 0.3s ease |
| `--transition-slow` | 0.5s ease |
| `--transition-bounce` | 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) |

---

## 🔘 Компоненты

### Кнопки

#### Размеры padding
- `--button-padding-sm`: 0.625rem 1.25rem (10px 20px)
- `--button-padding-md`: 0.9375rem 1.875rem (15px 30px)
- `--button-padding-lg`: 1.25rem 2.5rem (20px 40px)

#### Варианты кнопок
- `.btn-primary` - Основная кнопка (primary gradient)
- `.btn-secondary` - Вторичная кнопка (secondary gradient)
- `.btn-accent` - Акцентная кнопка (accent gradient)

### Карточки

- Padding: `--card-padding` (1.875rem / 30px)
- Border radius: `--radius-xl`
- Background: `--color-overlay-light` с backdrop-filter
- Border: 1px solid `--color-border-light`

### Инпуты

- Padding: `--input-padding` (0.9375rem / 15px)
- Border: 2px solid `--color-border-light`
- Border radius: `--radius-md`
- Focus border: `--color-primary`
- Focus shadow: `--shadow-glow-primary`

### Абакус

- Размер бусины (desktop): `--bead-size` (35px)
- Размер бусины (mobile): `--bead-size-mobile` (30px)
- Ширина стержня: `--rod-width` (6px)
- Высота стержня (desktop): `--rod-height` (300px)
- Высота стержня (mobile): `--rod-height-mobile` (250px)

---

## 📱 Breakpoints

```css
/* Планшеты и малые десктопы */
@media (max-width: 768px) { ... }

/* Мобильные устройства */
@media (max-width: 480px) { ... }
```

---

## 🎬 Анимации

### Доступные анимации

1. **fadeInDown** - Появление сверху
2. **fadeInUp** - Появление снизу
3. **shimmer** - Мерцание/сияние
4. **pulse** - Пульсация
5. **successPulse** - Пульсация при успехе
6. **shake** - Тряска при ошибке
7. **slideInRight** - Выезд справа
8. **slideOutRight** - Уезжает вправо

### Использование

```css
.element {
    animation: fadeInUp 0.8s ease-out;
}
```

---

## 🎯 Z-Index Scale

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--z-base` | 0 | Базовый слой |
| `--z-dropdown` | 100 | Выпадающие списки |
| `--z-overlay` | 200 | Оверлеи |
| `--z-modal` | 300 | Модальные окна |
| `--z-tooltip` | 400 | Подсказки |

---

## 💡 Примеры использования

### Создание новой карточки

```css
.my-card {
    background: var(--color-overlay-light);
    backdrop-filter: blur(10px);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--card-padding);
    box-shadow: var(--shadow-lg);
    transition: transform var(--transition-base);
}

.my-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}
```

### Создание кнопки с градиентом

```css
.custom-button {
    padding: var(--button-padding-md);
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-primary);
    transition: all var(--transition-base);
}

.custom-button:hover {
    box-shadow: var(--shadow-primary-hover);
}
```

### Градиентный текст

```css
.gradient-heading {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-extrabold);
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

---

## 🔄 Обновление дизайн-системы

При добавлении новых компонентов или изменении существующих:

1. Обновите CSS переменные в `:root`
2. Добавьте комментарии с описанием секции
3. Обновите этот файл DESIGN-SYSTEM.md
4. Придерживайтесь naming convention: `--{category}-{property}-{variant}`

---

## 📚 Структура файла style.css

1. **RESET & BASE** - Сброс стилей и базовые настройки
2. **CSS ПЕРЕМЕННЫЕ** - Design tokens
3. **БАЗОВЫЕ СТИЛИ** - Body, container
4. **ТИПОГРАФИКА** - Заголовки, текст
5. **КОМПОНЕНТЫ: КАРТОЧКИ** - Card styles
6. **КОМПОНЕНТЫ: ВЫБОР ТРЕНАЖЕРА** - Trainer selection
7. **КОМПОНЕНТЫ: ФОРМЫ И ИНПУТЫ** - Inputs, forms
8. **КОМПОНЕНТЫ: КНОПКИ** - Button styles
9. **КОМПОНЕНТЫ: АБАКУС** - Abacus specific
10. **КОМПОНЕНТЫ: ОБУЧЕНИЕ** - Tutorial section
11. **КОМПОНЕНТЫ: ПРАКТИКА** - Practice section
12. **КОМПОНЕНТЫ: FLASH ANZAN** - Flash anzan trainer
13. **ФУТЕР** - Footer
14. **АНИМАЦИИ** - Keyframes
15. **АДАПТИВНЫЙ ДИЗАЙН** - Media queries

---

Создано: 2025
Версия: 1.0
