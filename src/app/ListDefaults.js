const { Operation } = require('@amberjs/core');
class ListKeypoints extends Operation {
  constructor({ Utils }) {
    super();
    this.Utils = Utils;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;
    console.log('PARAMS : ', params);

    try {
      let data = {names: Object.keys(this.Utils.defaults)};
      if(params.name){
        data = {data: this.Utils.defaults[params.name]};
      }
      
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

ListKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListKeypoints;
