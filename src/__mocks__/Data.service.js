import db from './db.json';

class DataService {
  static getSlides() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(db);
      }, 0);
    })
      .then(result => {
        return result.slides;
      })
      .catch(err => {});
  }
}

export default DataService;
