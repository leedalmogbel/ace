const { Operation } = require('@amberjs/core');

class Login extends Operation {
  constructor({UserRepository, WhitelistRepository }) {
    super();
    this.UserRepository = UserRepository;
    this.WhitelistRepository = WhitelistRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
    try {
      console.log('LOGIN DATA', data);
      data.userType = 'coach';
      let usersData = await this.UserRepository.getByEmail(data.email);
      //data.userType = 'player';
      if(!usersData){
        // let whitelistData = await this.WhitelistRepository.getByEmail(data.email);
        // if(whitelistData){
        //   data.userType = 'coach';
        // }
        console.log('CREATE USER : ', data);
        usersData = await this.UserRepository.add(data);
      }else{
        // must update data
        usersData = await this.UserRepository.update(usersData.id, data);
      }
      // check email if existing in users table
      // check if email is in whitelist for userType
      // create or login user
      return this.emit(SUCCESS, {message:'You are successfully logged in', data:usersData});
      
    } catch(error) {
      return this.emit(ERROR, {details: {errors:error.message}});
    }
     
  }
}

Login.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Login;
