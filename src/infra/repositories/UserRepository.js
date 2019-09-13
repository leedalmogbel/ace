
const { BaseRepository } = require('@brewery/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async getByEmail(email, callback) {
    const query = `SELECT * FROM users  WHERE "email" == '${email}'`;
    const getEmail = await this.model.query(query, (req, data) => {
      if (data && data.rowCount) {
        callback(data.rows[0]);
      } else {
        callback();
      }
    });

    return getEmail;
  }

  async createEmail (data) {
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise((resolve, reject) => {
      /*
      *Check first if email already exists
      */
      this.getByEmail(data.email, (user) => {
        if (user) {
          resolve(user);
        } else {
          const query = `INSERT INTO users ("email") VALUES ('${data.email}') RETURNING *`;
          this.model.query(query, (req, data) => {
            resolve(data.rows[0]);
          });
        }
      });
    });
    return promise;
  }
}

module.exports = UserRepository;

