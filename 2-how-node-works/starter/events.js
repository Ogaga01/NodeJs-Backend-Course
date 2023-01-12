const EventEmitter = require('events')
const myEmitter = new EventEmitter()

myEmitter.on('newSale', () => { console.log('There is a newSale') })

myEmitter.on('newSale', () => { console.log('Customer: Ogaga') })

myEmitter.emit('newSale',)