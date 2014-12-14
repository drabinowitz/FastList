(function (context) {

  'use strict';

  /****************************************/
  //
  //     FastList function
  //
  //relies on Node Constructor defined below
  //relies on getUUID defined below
  /****************************************/

  var FastList = function () {

    this.head = null;
    this.tail = null;
    this.length = 0;
    this.listIndex = {};
    this.Node = NodeConstructor(this);

  };

  FastList.prototype.addToTail = function (val, key) {

    if (this.head){

      this.tail.next = new this.Node({
        value: val,
        parent: this.tail,
        key: key
      });
      this.tail = this.tail.next;

    } else {

      this.head = new this.Node({
        value: val
      });
      this.tail = this.head;

    }

    return this.tail.__key__;

  };

  FastList.prototype.removeFromHead = function () {

    var result;

    if (this.head){

      result = this.head.value;

      if (this.head === this.tail){

        this.tail = null;

      }

      this.head = this.head.next;

      this.length--;

      return result;

    }

    return null;

  };

  FastList.prototype.removeFromTail = function () {

    var result;

    if (this.tail){

      result = this.tail.value;

      if (this.tail === this.head){

        this.head = null;

      }

      this.tail = this.tail.parent;

      if(this.tail) this.tail.next = null;

      this.length--;

      return result;

    }

    return null;

  };

  FastList.prototype.addToHead = function (val, key) {

    if (this.head){

      this.head.parent = new this.Node({
        value: val,
        next: this.head
      });
      this.head = this.head.parent;

    } else {

      this.head = new this.Node({
        value: val,
        key: key
      });
      this.tail = this.head;

    }

    return this.head.__key__;

  };

  FastList.prototype.get = function (key) {

    if (this.listIndex[key]){

      return this.listIndex[key].value;

    }

  };

  FastList.prototype.set = function (key, val) {

    if (this.listIndex[key]){

      this.listIndex[key].value = val;

    } else {

      throw new Error(key + ' does not reference an existing node.  Create a node with this key first using an add method');

    }

  };

  FastList.prototype.addBefore = function (keyAt, val, key) {

    var nodeAt = this.listIndex[keyAt];

    if (nodeAt){

      var newNode = new this.Node({
        value: val,
        key: key,
        parent: nodeAt.parent,
        next: nodeAt
      });

      if (nodeAt.parent) nodeAt.parent.next = newNode;

      nodeAt.parent = newNode;

      return newNode.__key__;

    } else {

      throw new Error(key + ' does not reference an existing node.  Create a node with this key first using an add method');

    }

  };

  /****************************************/
  //
  //     List Node Constructor Factory
  //
  /****************************************/

  function NodeConstructor (list) {
    var listIndex = list.listIndex;

    return function (node) {

      var key = node.key || getUUID();

      if (listIndex[key]) {

        throw new Error (key + ' is already assigned!');

      } else {

        list.length++;
        this.value = node.value;
        this.next = node.next || null;
        this.parent = node.parent || null;
        this.__key__ = key;
        listIndex[key] = this;

      }

    };

  }

  context.FastList = FastList;

  /****************************************/
  //
  //     getUUID
  //
  /****************************************/

  function getUUID(){

    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;

  }

})(window);
