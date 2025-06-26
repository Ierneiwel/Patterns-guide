class TaskIndication {
    constructor(taskId) {
        this.taskId = taskId;
    }

    getTaskUrgency() {
        return this.getTask(this.taskId).urgency;
    }

    getTask(taskId) {
        return new SimpleRecord('task').get(taskId);
    }

    createIndication(eventName, tableId) {
        ss.eventQueue(eventName, tableId, this.taskId, this.getTaskUrgency());
    }
}

// Базовый декоратор (можно сделать абстрактным)
class TaskIndicationDecorator {
    constructor(taskIndication) {
        this.taskIndication = taskIndication;
    }

    getTaskUrgency() {
        return this.taskIndication.getTaskUrgency();
    }

    createIndication(eventName, tableId) {
        return this.taskIndication.createIndication(eventName, tableId);
    }
}

// Декоратор для инцидентов с дополнительной функциональностью
class IncidentIndicationDecorator extends TaskIndicationDecorator {
    constructor(taskIndication, config = {}) {
        super(taskIndication);
        this.eventName = config.eventName || 'itsm-incident-sla';
        this.tableId = config.tableId || '156950677111866258';
    }

    // Добавляем новую функциональность - валидацию перед созданием
    _validateIncident() {
        if (this.getTaskUrgency() === 'low') {
            throw new Error('Cannot create indication for low urgency');
        }
        ss.info('Incident validation passed');
    }

    // Добавляем новую функциональность - нотификацию после создания
    _notifyIncidentCreated() {
        ss.info(`Sending notification about incident for task ${this.taskIndication.taskId}`);
    }

    createIndication() {
        if (!this.validateIncident()) {
            ss.info('Indication not created: invalid incident urgency');
            return;
        }

        super.createIndication(this.eventName, this.tableId);

        this._notifyIncidentCreated();
    }
}

// Декоратор для запросов с дополнительной логикой
class RequestIndicationDecorator extends TaskIndicationDecorator {
    constructor(taskIndication, config = {}) {
        super(taskIndication);
        this.eventName = config.eventName || 'itsm-request-sla';
        this.tableId = config.tableId || '156950616617772294';
    }

    // Добавляем новую функциональность - валидацию перед созданием
    _validateRequest() {
        if (this.getTaskUrgency() === 'medium') {
            throw new Error('Cannot create indication for medium urgency');
        }
        ss.info('Request validation passed');
    }

    // Добавляем новую функциональность - нотификацию после создания
    _notifyRequestCreated() {
        ss.info(`Sending notification about request for task ${this.taskIndication.taskId}`);
    }

    createRequest() {
        if (!this.validateRequest()) {
            ss.info('Request not created: invalid request urgency');
            return;
        }

        super.createRequest(this.eventName, this.tableId);

        this._notifyRequestCreated();
    }
}

// Использование
const taskId = '174524763995818197';
const baseIndication = new TaskIndication(taskId);

// Декорируем для инцидента с кастомными параметрами
const incidentIndication = new IncidentIndicationDecorator(baseIndication, {
    eventName: 'custom-incident-event',
    tableId: 'custom_table_id'
});

// Декорируем для запроса с кастомными параметрами
const requestIndication = new RequestIndicationDecorator(baseIndication, {
    eventName: 'custom-request-event',
    tableId: 'custom_table_id'
});

// Создаем индикации
incidentIndication.createIndication();
requestIndication.createIndication();