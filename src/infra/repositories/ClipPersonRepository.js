
const { BaseRepository } = require('@amberjs/core');

class ClipPersonRepository extends BaseRepository {
  constructor({ ClipPersonModel }) {
    super(ClipPersonModel);
  }

  async addMultiple(clipId, data) {
    let promises = [];
    promises.push(
      Promise.all(
        data.personImages.map(person => {
          return this.model.create(person);
        })
      )
    );

    await Promise.all(promises);

    let clipPersons = await this.getAllWithParams({'clipId':clipId});

    return clipPersons;
  }

  async getAllWithParams(params){

    if(params){
      return await this.model.findAll({
        where: params
      });
    }
    
    return await this.model.findAll();
  }

}

module.exports = ClipPersonRepository;

