class TaskApproval {
    constructor(taskId) {
        this.taskId = taskId
    }

    createApproval() {
        const approval = new SimpleRecord('approval')
        /// ...
        /// ...
        /// ...
        return approval.insert()
    }
}

class TaskIndication {
    constructor(taskId) {
        this.taskId = taskId
    }

    createIndication() {
        const indication = new SimpleRecord('indication')
        /// ...
        /// ...
        /// ...
        return indication.insert()
    }

}

class TaskNotification {
    constructor(taskId) {
        this.taskId = taskId
    }

    sendNotification() {
        const notification = new SimpleRecord('notification')
        /// ...
        /// ...
        /// ...
        return !!notification.insert()
    }
}

class TaskFacade {
    constructor() {
        this.taskApproval = new TaskApproval()
        this.taskIndication = new TaskIndication()
        this.taskNotification = new TaskNotification()
    }

    startBusinessProcess() {
        const approval = TaskApproval.createApproval()
        const indication = TaskIndication.createIndication()
        const notificationIsSend = TaskNotification.sendNotification()

        return [approval, indication, notificationIsSend]
    }
}

const taskProcess = new TaskFacade()
taskProcess.startBusinessProcess()


