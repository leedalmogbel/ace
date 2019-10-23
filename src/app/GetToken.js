const { Operation } = require('@amberjs/core');

class GetToken extends Operation {
  constructor({ }) {
    super();
  }

  async execute(data) {
    try {
      const request = new XMLHttpRequest()
      // Open a new connection, using the GET request on the URL endpoint
      request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
      const requestToken = request.send();
      return this.emit(SUCCESS, requestToken);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetToken.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetToken;
