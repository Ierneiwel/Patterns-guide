class Employee {
    constructor(name, salary){
        this.name = name
        this.salary = salary
    }

    responsibilities() {

    }

    work(){
        return `${this.name} выполняет ${this.responsibilities()}`
    }

    haveSalary(){
        return `${this.name} получает ЗП = ${this.salary}`
    }
}

class Developer extends Employee{
    constructor(name, salary){
        super(name, salary)
    }

    responsibilities(){
        return `работу по созданию кода`
    }
}

class Tester extends Employee{
    constructor(name, salary){
        super(name, salary)
    }

    responsibilities(){
        return `работу по тестированию кода`
    }
}

const dev = new Developer('Игорь', '300000')
print(dev.haveSalary())
print(dev.work())

const tester = new Tester('Не Игорь', '1000000')
print(tester.haveSalary())
print(tester.work())