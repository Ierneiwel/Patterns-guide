class Vehicle {
  travelTime() {
    return this.timeTaken
  }
}

class Bus extends Vehicle {
  constructor() {
    super()
    this.timeTaken = 10
  }
}

class Taxi extends Vehicle {
  constructor() {
    super()
    this.timeTaken = 5
  }
}

class Car extends Vehicle {
  constructor() {
    super()
    this.timeTaken = 3
  }
}

class Commute {
  travel(transport) {
    return transport.travelTime()
  }
}

const commute = new Commute()

print(commute.travel(new Taxi()))
print(commute.travel(new Bus()))
print(commute.travel(new Car()))