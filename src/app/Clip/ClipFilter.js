const { Operation } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class ClipFilter extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(data) {
    const { SUCCESS, NOT_FOUND } = this.events;
    console.log(data);
    let filters = {
      videoId : data.videoId
    };
    //filters = data;
    if(data.shotType){
      filters.shotType = {
        [Op.in] : JSON.parse(data.shotType)
      };
    }

    if(data.hitSpot){
      filters.hitSpot = {
        [Op.in] : JSON.parse(data.hitSpot)
      };
    }

    if(data.shotResult){
      filters.shotResult = {
        [Op.in] : JSON.parse(data.shotResult)
      };
    }

    if(data.shotDirection){
      filters.shotDirection = {
        [Op.in] : JSON.parse(data.shotDirection)
      };
    }

    console.log('FILTERS ', filters);

    try {
      const filtered = await this.ClipRepository.getAll({
        where: filters,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'clipType',
            'rallyLength'
          ]
        }
      });
      return this.emit(SUCCESS, {data:filtered});
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ClipFilter.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ClipFilter;
