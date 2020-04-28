const { Operation } = require('@amberjs/core');
const {UserId} = require('src/domain/User');

class DeleteUserKeypoints extends Operation {
  constructor({ PersonKeypointRepository, ScoreRepository, StandardModelRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ScoreRepository = ScoreRepository;
    this.StandardModelRepository = StandardModelRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = this.events;
    const video = new UserId({
      userId : id
    });
    const { valid, errors } = video.validate({
      userId : id
    });
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      let promises = [];
      // DELETE ALL scores by getting unique clipPersonId
      promises.push(this.PersonKeypointRepository.getAll({
        where : {userId : id},
        attributes: ['clipPersonId'],
        group: ['clipPersonId']
      }).then( personKeypoints => {
        return personKeypoints.map( keypoints => {
          return this.ScoreRepository.getAll({
            where : {clipPersonId : keypoints.clipPersonId}
          }).then( scores => {
            return Promise.all(scores.map( score => {return score.destroy();}));
          });
        });
      }));

      // Delete ALL KEYPOINTS
      promises.push(this.PersonKeypointRepository.getAll({
        where : {userId : id}
      }).then( keypointsArr => {
        return Promise.all(keypointsArr.map( keypoint => {return keypoint.destroy();}));
      }));

      // Delete all models
      promises.push(this.StandardModelRepository.getAll({
        where : {userId : id}
      }).then( standardModels =>{
        return Promise.all(standardModels.map( standardModel => {return standardModel.destroy();}));
      }));

      
      await Promise.all(promises);

      // query all models
      const message = {
        message: 'Successfully deleted!'
      };
      return this.emit(SUCCESS, message);

    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

DeleteUserKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DeleteUserKeypoints;
    
