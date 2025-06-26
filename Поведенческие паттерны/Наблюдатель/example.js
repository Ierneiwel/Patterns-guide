class Subject {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  fire(action) {
    this.observers.forEach(observer => {
      observer.update(action)
    })
  }
}

class Observer {
  constructor(state = 1) {
    this.state = state
    this.initialState = state
  }

  update(action) {
    switch (action.type) {
      case 'PLUS':
        this.state = ++this.state
        break
      case 'MINUS':
        this.state = --this.state
        break
      case 'MULTI_PLUS':
        this.state += action.value
        break
      default:
        this.state = this.initialState
    }
  }
}

const stream = new Subject()

const obs1 = new Observer()
const obs2 = new Observer(10)

stream.subscribe(obs1)
stream.subscribe(obs2)

stream.fire({type: 'PLUS'})
stream.fire({type: 'PLUS'})
stream.fire({type: 'MINUS'})
stream.fire({type: 'MULTI_PLUS', value: 10})

print(obs1.state)
print(obs2.state)