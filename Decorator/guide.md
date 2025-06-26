## Описание

Декоратор — это структурный паттерн проектирования, который позволяет **динамически добавлять объектам новую функциональность**, оборачивая их в полезные "обёртки". Это гибкая альтернатива наследованию для расширения функциональности.

## Основная логика

1. **Цель**: Добавлять новые обязанности объектам динамически, без изменения их класса
2. **Когда использовать**:
   - Когда нужно добавлять обязанности объектам на лету, незаметно для кода, который их использует
   - Когда расширение с помощью наследования невозможно или неудобно
3. **Основные компоненты**:
   - **Component (Компонент)**: Определяет интерфейс для объектов, которые могут иметь добавленные обязанности
   - **ConcreteComponent (Конкретный компонент)**: Определяет объект, в который добавляются новые обязанности
   - **Decorator (Декоратор)**: Хранит ссылку на Component и определяет интерфейс, соответствующий интерфейсу Component
   - **ConcreteDecorator (Конкретный декоратор)**: Добавляет новые обязанности к компоненту

## Примеры на JavaScript

### Пример 1: Декоратор для текстовых сообщений

```javascript
// Component
class Text {
  constructor(content) {
    this.content = content;
  }
  
  getContent() {
    return this.content;
  }
}

// Decorator
class TextDecorator {
  constructor(text) {
    this.text = text;
  }
  
  getContent() {
    return this.text.getContent();
  }
}

// ConcreteDecorator 1
class BoldDecorator extends TextDecorator {
  getContent() {
    return `<b>${super.getContent()}</b>`;
  }
}

// ConcreteDecorator 2
class ItalicDecorator extends TextDecorator {
  getContent() {
    return `<i>${super.getContent()}</i>`;
  }
}

// ConcreteDecorator 3
class UnderlineDecorator extends TextDecorator {
  getContent() {
    return `<u>${super.getContent()}</u>`;
  }
}

// Использование
const simpleText = new Text('Hello World');
console.log(simpleText.getContent()); // 'Hello World'

const boldText = new BoldDecorator(simpleText);
console.log(boldText.getContent()); // '<b>Hello World</b>'

const italicBoldText = new ItalicDecorator(boldText);
console.log(italicBoldText.getContent()); // '<i><b>Hello World</b></i>'

const formattedText = new UnderlineDecorator(
  new ItalicDecorator(
    new BoldDecorator(
      new Text('Decorator Pattern')
    )
  )
);
console.log(formattedText.getContent()); // '<u><i><b>Decorator Pattern</b></i></u>'
```

### Пример 2: Декоратор для кофе

```javascript
// Component
class Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Simple coffee';
  }
}

// Decorator
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost();
  }
  
  description() {
    return this.coffee.description();
  }
}

// ConcreteDecorator 1
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 2;
  }
  
  description() {
    return super.description() + ', milk';
  }
}

// ConcreteDecorator 2
class SugarDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 1;
  }
  
  description() {
    return super.description() + ', sugar';
  }
}

// ConcreteDecorator 3
class WhipDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 3;
  }
  
  description() {
    return super.description() + ', whip';
  }
}

// Использование
const coffee = new Coffee();
console.log(`${coffee.description()}: $${coffee.cost()}`); 
// 'Simple coffee: $5'

const coffeeWithMilk = new MilkDecorator(coffee);
console.log(`${coffeeWithMilk.description()}: $${coffeeWithMilk.cost()}`); 
// 'Simple coffee, milk: $7'

const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
console.log(`${coffeeWithMilkAndSugar.description()}: $${coffeeWithMilkAndSugar.cost()}`); 
// 'Simple coffee, milk, sugar: $8'

const fancyCoffee = new WhipDecorator(
  new SugarDecorator(
    new MilkDecorator(
      new Coffee()
    )
  )
);
console.log(`${fancyCoffee.description()}: $${fancyCoffee.cost()}`); 
// 'Simple coffee, milk, sugar, whip: $11'
```

### Пример 3: Декоратор для кэширования функций

```javascript
// Декоратор для кэширования результатов функции
function cacheDecorator(func) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Из кэша:', key);
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    console.log('Вычислено:', key);
    return result;
  };
}

// Функция, которую будем декорировать
function heavyCalculation(a, b) {
  // Имитация тяжелых вычислений
  for (let i = 0; i < 1000000000; i++) {}
  return a + b;
}

// Применяем декоратор
const cachedCalculation = cacheDecorator(heavyCalculation);

// Использование
console.log(cachedCalculation(2, 3)); // Вычислено: [2,3] → 5
console.log(cachedCalculation(2, 3)); // Из кэша: [2,3] → 5
console.log(cachedCalculation(5, 7)); // Вычислено: [5,7] → 12
console.log(cachedCalculation(5, 7)); // Из кэша: [5,7] → 12
```

## Преимущества и недостатки

**Преимущества**:
- Большая гибкость, чем у наследования (можно добавлять и удалять обязанности во время выполнения)
- Позволяет избежать перегруженных функциями классов на верхних уровнях иерархии
- Можно добавлять несколько новых обязанностей одновременно
- Реализует принцип единственной ответственности (разделяет функциональность между классами)

**Недостатки**:
- Трудно конфигурировать декораторы, особенно если их много
- Много мелких классов могут усложнить архитектуру
- Сложнее отслеживать цепочку декораторов при отладке

## Отличие от Адаптера

В то время как Адаптер изменяет интерфейс объекта, Декоратор расширяет его функциональность, сохраняя оригинальный интерфейс. Декоратор поддерживает рекурсивную композицию, что позволяет добавлять неограниченное количество обязанностей.


## Итоговая схема (для примера)

```text
Component (интерфейс)
│
└── ConcreteComponent (TaskIndication)
    │
    └── Decorator (TaskIndicationDecorator)
        │
        ├── ConcreteDecoratorA (IncidentIndicationDecorator)
        └── ConcreteDecoratorB (RequestIndicationDecorator)
```