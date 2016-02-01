import io from 'socketio/socket.io-client';

class Socket {
  constructor() {
    this.connected = false;
    this.eventQueue = [];
    this.init();
  }

  init() {
    let self = this;
    let host = window.location.origin;
    console.log('WEBSOCKET connecting to', host);

    this.socket = io.connect(host);

    this.socket.on('connect', () => {
      self.connected = true;
      console.log('WEBSOCKET connected');
      self.cleanQueue();
    });
  }

  cleanQueue() {
    for (let eventHandler of this.eventQueue) {
      this.socket.on(eventHandler.event, eventHandler.callback);
    }

    this.eventQueue = [];
  }

  on(key, callback) {
    this.eventQueue.push({
      event: key,
      callback: callback
    });

    if (this.connected) {
      this.cleanQueue();
    }
  }
}

Socket.$inject = [];

export default Socket;
