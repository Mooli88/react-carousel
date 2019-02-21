import db from './db.json';

class DataService {
  static getSlides() {
    return new Promise(resolve => {
      resolve(db);
    })
      .then(result => {
        return result.slides;
      })
      .catch(err => {});
  }
}

export default DataService;
