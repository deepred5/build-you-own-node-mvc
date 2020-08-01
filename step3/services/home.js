const { Service } = require('../my-node-mvc');

const sleep = async (time) => new Promise(resolve => setTimeout(resolve, time)); 

const posts = [{
  id: 1,
  title: 'this is test1',
}, {
  id: 2,
  title: 'this is test2',
}];



class Home extends Service {
  async getList() {
    await sleep(1200);
    return posts
  }
}

module.exports = Home
