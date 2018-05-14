# NasFloater: 星云漂流瓶交友平台


[![Build Status](https://travis-ci.org/kun368/NasFloater.svg?branch=master)](https://travis-ci.org/kun368/NasFloater)
[![Language](https://img.shields.io/badge/language-javascript-blue.svg)](https://github.com/kun368/NasFloater)

#### [系统地址](http://floater.zzkun.com)

#### [NAS-DAPP开发者注册](https://incentive.nebulas.io/cn/signup.html?invite=OILxo)

**基于NAS智能合约的去中心化交友平台, 构建有趣、浪漫、体验独特、安全、防骚扰、信息无法篡改的新一代交友平台**

## Snapshot



## 合约

```javascript
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

```

---

> 使用文档

使用:

* 启动调试服务: `npm start`
* 构建 dist: `npm run build`

目录结构:

* react-router @4.x 默认采用 hashHistory 的单页应用
* 入口文件: `src/index.js`
* 导航配置: `src/menuConfig.js`
* 路由配置: `src/routerConfig.js`
* 路由入口: `src/router.jsx`
* 布局文件: `src/layouts`
* 通用组件: `src/components`
* 页面文件: `src/pages`
