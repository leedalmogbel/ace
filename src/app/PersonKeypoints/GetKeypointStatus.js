const { Operation } = require('@amberjs/core');
const {KeypointStatus} = require('src/domain/Keypoint');
const Utils = require('src/infra/services/utils.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;


class GetKeypointStatus extends Operation {
  constructor({ PersonKeypointRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
  }

  async execute(clipPersonId, params) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR} = this.events;

    const parameters = {
      clipPersonId : clipPersonId,
      ...params,
      status : {
        [Op.in] : ['successKeypoint', 'successSkeleton']
      }
    };

    const keypoint = new KeypointStatus(parameters);

    const { valid, errors } = keypoint.validate(parameters);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      const keyPointStatus = await this.PersonKeypointRepository.getAll({
        where: parameters
      });

      const result = (keyPointStatus.length > 0) ? {withKeypoint : true} : {withKeypoint : false};
      const data = Utils().resSuccess(result);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetKeypointStatus.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetKeypointStatus;
    
