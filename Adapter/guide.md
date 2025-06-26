## Описание

Адаптер — это структурный паттерн проектирования, который позволяет объектам с несовместимыми интерфейсами работать вместе. Он выступает посредником между двумя объектами, преобразуя интерфейс одного объекта в интерфейс, понятный другому.

## Основная логика

1. **Цель**: Преобразовать интерфейс одного класса в интерфейс, ожидаемый клиентом
2. **Когда использовать**:
   - Когда нужно использовать существующий класс, но его интерфейс не соответствует вашим потребностям
   - Когда нужно создать повторно используемый класс, который должен взаимодействовать с классами, имеющими несовместимые интерфейсы
3. **Основные компоненты**:
   - **Target (Цель)**: Интерфейс, который ожидает клиент
   - **Adaptee (Адаптируемый)**: Существующий интерфейс, который нужно адаптировать
   - **Adapter (Адаптер)**: Класс, который адаптирует интерфейс Adaptee к интерфейсу Target

## Примеры на JavaScript

### Пример 1: Адаптер для работы с разными API

```javascript
// Target - интерфейс, который ожидает клиент
class ModernAPI {
  request(data) {
    // Ожидается вызов метода request с данными
  }
}

// Adaptee - старый API, который нужно адаптировать
class LegacyAPI {
  specificRequest(specialData) {
    // Старый метод с другим именем и форматом данных
    return `Legacy data: ${specialData}`;
  }
}

// Adapter
class LegacyAPIAdapter extends ModernAPI {
  constructor(legacyAPI) {
    super();
    this.legacyAPI = legacyAPI;
  }

  request(data) {
    // Преобразуем данные и вызываем старый метод
    const convertedData = data.toString();
    return this.legacyAPI.specificRequest(convertedData);
  }
}

// Использование
const legacyAPI = new LegacyAPI();
const adapter = new LegacyAPIAdapter(legacyAPI);

console.log(adapter.request(123)); // "Legacy data: 123"
```

### Пример 2: Адаптер для работы с разными геометрическими библиотеками

```javascript
// Target - интерфейс, который ожидает наше приложение
class Shape {
  draw(x1, y1, x2, y2) {}
}

// Adaptee - сторонняя библиотека для работы с прямоугольниками
class Rectangle {
  display(x, y, w, h) {
    console.log(`Rectangle at (${x},${y}) with width ${w} and height ${h}`);
  }
}

// Adapter
class RectangleAdapter extends Shape {
  constructor(rectangle) {
    super();
    this.rectangle = rectangle;
  }

  draw(x1, y1, x2, y2) {
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    this.rectangle.display(x, y, width, height);
  }
}

// Использование
const rectangle = new Rectangle();
const rectangleAdapter = new RectangleAdapter(rectangle);

rectangleAdapter.draw(10, 20, 30, 40);
// Выведет: "Rectangle at (10,20) with width 20 and height 20"
```

### Пример 3: Адаптер для работы с разными форматами данных

```javascript
// Target - интерфейс для работы с JSON
class JsonProcessor {
  processJson(data) {
    console.log("Processing JSON:", data);
  }
}

// Adaptee - класс для работы с XML
class XmlParser {
  parseXml(xmlString) {
    console.log("Parsing XML:", xmlString);
    // В реальности здесь было бы преобразование XML в объект
    return { converted: "JSON-like data from XML" };
  }
}

// Adapter
class XmlToJsonAdapter extends JsonProcessor {
  constructor(xmlParser) {
    super();
    this.xmlParser = xmlParser;
  }

  processJson(data) {
    // Предположим, что data на самом деле XML
    const jsonData = this.xmlParser.parseXml(data);
    super.processJson(jsonData);
  }
}

// Использование
const xmlParser = new XmlParser();
const adapter = new XmlToJsonAdapter(xmlParser);

adapter.processJson("<message>Hello</message>");
// Parsing XML: <message>Hello</message>
// Processing JSON: { converted: 'JSON-like data from XML' }
```

## Преимущества и недостатки

**Преимущества**:
- Отделяет и скрывает от клиента подробности преобразования различных интерфейсов
- Позволяет повторно использовать существующий код
- Реализует принцип открытости/закрытости (можно вводить новые адаптеры без изменения клиентского кода)

**Недостатки**:
- Усложняет код из-за введения дополнительных классов
- В некоторых случаях может снижать производительность из-за дополнительного уровня абстракции

Адаптер особенно полезен при интеграции старого кода с новым или при работе со сторонними библиотеками, интерфейсы которых не соответствуют вашим ожиданиям.