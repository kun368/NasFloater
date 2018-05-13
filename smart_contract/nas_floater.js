'use strict';

var User = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.addr = o.addr;
    this.intro = o.intro;
    this.createTime = o.createTime;
    this.sended = o.sended;
    this.recved = o.recved;
  } else {
    this.addr = '';
    this.intro = '';
    this.createTime = '';
    this.sended = [];
    this.recved = [];
  }
};
User.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};


var Massage = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.from = o.from;
    this.to = o.to;
    this.content = o.content;
    this.txHash = o.txHash;
    this.createTime = o.createTime;
  } else {
    this.from = '';
    this.to = '';
    this.content = '';
    this.txHash = '';
    this.createTime = '';
  }
};
Massage.prototype = {
  toString: function () {
    return JSON.stringify(this);
  },
};


var NasFloater = function () {
  LocalContractStorage.defineMapProperty(this, 'arrayMap');
  LocalContractStorage.defineMapProperty(this, 'dataMap', {
    parse: function (text) {
      return new User(text);
    },
    stringify: function (o) {
      return o.toString();
    },
  });
  LocalContractStorage.defineProperty(this, 'size');
};

NasFloater.prototype = {
  init: function () {
    this.size = 0;
  },

  _set: function (key, value) {
    var index = this.size;
    this.arrayMap.set(index, key);
    this.dataMap.set(key, value);
    this.size += 1;
  },

  addUser: function (intro) {
    var item = this.dataMap.get(Blockchain.transaction.from);
    if (item) {
      item.intro = intro;
      item.createTime = Blockchain.transaction.timestamp * 1000;
      this.dataMap.set(Blockchain.transaction.from, item);
      return;
    }
    item = new User();
    item.intro = intro;
    item.addr = Blockchain.transaction.from;
    item.createTime = Blockchain.transaction.timestamp * 1000;
    this._set(item.addr, item);
  },

  allUsers: function (offset, limit) {
    limit = parseInt(limit);
    offset = parseInt(offset);
    var number = offset + limit;
    if (number > this.size) {
      number = this.size;
    }
    var result = [];
    for (var i = offset; i < number; i++) {
      var key = this.arrayMap.get(i);
      var object = this.dataMap.get(key);
      result.push({
        addr: object.addr,
        intro: object.intro,
        createTime: object.createTime,
      });
    }
    return {
      userSize: this.size,
      result: result,
    };
  },

  sendMsg: function (to, msg) {
    var from = Blockchain.transaction.from;
    var time = Blockchain.transaction.timestamp * 1000;
    if (!this.dataMap.get(from)) {
      throw new Error('您还未加入星云漂流！');
    }
    if (!this.dataMap.get(to)) {
      throw new Error('对方还未加入星云漂流！');
    }
    var item = new Massage();
    item.from = from;
    item.to = to;
    item.content = msg;
    item.createTime = time;

    var t1 = this.dataMap.get(from);
    t1.sended.push(item);
    this.dataMap.set(from, t1);

    var t2 = this.dataMap.get(to);
    t2.recved.push(item);
    this.dataMap.set(to, t2);
  },

  getUser: function () {
    var from = Blockchain.transaction.from;
    var item = this.dataMap.get(from);
    if (!item) {
      throw new Error('用户未加入星云漂流！');
    }
    return item;
  },
};
module.exports = NasFloater;
