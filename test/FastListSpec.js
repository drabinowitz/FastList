'use strict';

describe('FastList', function() {

  var fastList;

  beforeEach(function() {

    fastList = new FastList();

    //add testing method for returning node at key
    fastList.nodeAt = function (key) {

      return this.listIndex[key];

    };

  });

  describe('Linkedlist functionality', function () {

    it('should have a head and a tail', function () {

      expect(fastList.hasOwnProperty('head')).to.equal(true);
      expect(fastList.hasOwnProperty('tail')).to.equal(true);

    });

    describe('_addFirst', function () {

      it('should add the first node in a list', function () {

        expect(fastList.head).to.equal(null);
        expect(fastList.tail).to.equal(null);

        var key = fastList._addFirst(1);

        expect(fastList.head.value).to.equal(1);
        expect(fastList.tail.value).to.equal(1);
        expect(fastList.get(key)).to.equal(1);

      });

      it('should throw an error if the list aleady has elements', function () {

        var key = fastList._addFirst(1);
        expect(fastList._addFirst.bind(fastList, 2)).to.throw(/List already has elements.  Use add before\/after instead/);

      });

    });

    it('should be able to add to the tail', function () {

      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

      fastList.addToTail(1);

      expect(fastList.head.value).to.equal(1);
      expect(fastList.tail).to.equal(fastList.head);

      fastList.addToTail(2);

      expect(fastList.head.value).to.equal(1);
      expect(fastList.tail.value).to.equal(2);
      expect(fastList.tail).to.equal(fastList.head.next);
      expect(fastList.tail.parent).to.equal(fastList.head);

      fastList.addToTail(3);

      expect(fastList.head.value).to.equal(1);
      expect(fastList.head.next).to.equal(fastList.tail.parent);
      expect(fastList.head.next.next).to.equal(fastList.tail);
      expect(fastList.tail.value).to.equal(3);
      expect(fastList.tail.parent).to.equal(fastList.head.next);
      expect(fastList.tail.parent.parent).to.equal(fastList.head);

    });

    it('should handle many types of inputs', function () {

      var str   = '   \'  ',
          func  = function () {},
          obj   = {},
          arr   = [],
          num   = 1,
          bool  = true;

      fastList.addToTail(str);
      expect(fastList.tail.value).to.equal(str);

      fastList.addToTail(func);
      expect(fastList.tail.value).to.equal(func);

      fastList.addToTail(obj);
      expect(fastList.tail.value).to.equal(obj);

      fastList.addToTail(arr);
      expect(fastList.tail.value).to.equal(arr);

      fastList.addToTail(num);
      expect(fastList.tail.value).to.equal(num);

      fastList.addToTail(bool);
      expect(fastList.tail.value).to.equal(bool);

    });

    it('should remove from the head', function () {

      fastList.addToTail(1);
      fastList.addToTail(2);
      fastList.addToTail(3);

      expect(fastList.removeFromHead()).to.equal(1);
      expect(fastList.head.value).to.equal(2);
      expect(fastList.tail.value).to.equal(3);

      expect(fastList.removeFromHead()).to.equal(2);
      expect(fastList.head.value).to.equal(3);
      expect(fastList.tail.value).to.equal(3);

      expect(fastList.removeFromHead()).to.equal(3);
      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

      expect(fastList.removeFromHead()).to.equal(null);
      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

    });

    it('should remove from the tail', function () {

      fastList.addToTail(1);
      fastList.addToTail(2);
      fastList.addToTail(3);

      expect(fastList.removeFromTail()).to.equal(3);
      expect(fastList.head.value).to.equal(1);
      expect(fastList.tail.value).to.equal(2);

      expect(fastList.removeFromTail()).to.equal(2);
      expect(fastList.head.value).to.equal(1);
      expect(fastList.tail.value).to.equal(1);

      expect(fastList.removeFromTail()).to.equal(1);
      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

      expect(fastList.removeFromTail()).to.equal(null);
      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

    });

    it('should be able to add to the head', function () {

      expect(fastList.head).to.equal(null);
      expect(fastList.tail).to.equal(null);

      fastList.addToHead(1);

      expect(fastList.head.value).to.equal(1);
      expect(fastList.tail).to.equal(fastList.head);

      fastList.addToHead(2);

      expect(fastList.head.value).to.equal(2);
      expect(fastList.tail.value).to.equal(1);
      expect(fastList.tail).to.equal(fastList.head.next);
      expect(fastList.tail.parent).to.equal(fastList.head);

      fastList.addToHead(3);

      expect(fastList.head.value).to.equal(3);
      expect(fastList.head.next).to.equal(fastList.tail.parent);
      expect(fastList.head.next.next).to.equal(fastList.tail);
      expect(fastList.tail.value).to.equal(1);
      expect(fastList.tail.parent).to.equal(fastList.head.next);
      expect(fastList.tail.parent.parent).to.equal(fastList.head);

    });

    it('should have a length', function () {

      expect(fastList.length).to.equal(0);
      fastList.addToHead(1);
      expect(fastList.length).to.equal(1);
      fastList.addToHead(1);
      expect(fastList.length).to.equal(2);
      fastList.addToTail(1);
      expect(fastList.length).to.equal(3);
      fastList.addToTail(1);
      expect(fastList.length).to.equal(4);
      fastList.removeFromTail();
      expect(fastList.length).to.equal(3);
      fastList.removeFromTail();
      expect(fastList.length).to.equal(2);
      fastList.removeFromHead();
      expect(fastList.length).to.equal(1);
      fastList.removeFromHead();
      expect(fastList.length).to.equal(0);

    });

  });

  describe('FastList lookup functionality', function () {

    describe('_mustFind', function () {

      it('should return the node corresponding the past in key', function () {

        var key = fastList.addToTail(1);
        expect(fastList._mustFind(key)).to.equal(fastList.head);

      });

      it('should throw an error if the lookup fails', function () {

        expect(fastList._mustFind.bind(fastList, 'asd')).to.throw(/Create a node with this key first/);

      });

    });

    describe('_mustNotFind', function () {

      it('should throw an error if and only if a key lookup returns an existing node', function () {

        expect(fastList._mustNotFind.bind(fastList, 'asd')).to.not.throw(Error);
        var key = fastList.addToTail(1);
        expect(fastList._mustNotFind.bind(fastList, key)).to.throw(/already refers to an existing node/);

      });

    });

    it('should return a key the list item owns when adding to the list', function () {

      var key = fastList.addToTail(1);
      expect(key).to.be.ok();
      expect(fastList.tail.__key__).to.equal(key);

      key = fastList.addToTail(2);
      expect(key).to.be.ok();
      expect(fastList.tail.parent.__key__).not.to.equal(key);
      expect(fastList.tail.__key__).to.equal(key);

      key = fastList.addToHead(2);
      expect(key).to.be.ok();
      expect(fastList.head.next.__key__).not.to.equal(key);
      expect(fastList.head.__key__).to.equal(key);

    });

    describe('get', function () {

      it('should be able to lookup a node by its key', function () {

        expect(fastList.get('')).to.equal(undefined);

        var key = fastList.addToTail(1);
        expect(fastList.get(key)).to.equal(fastList.head.value);
        expect(fastList.get(key)).to.equal(fastList.tail.value);

        var newKey = fastList.addToTail(2);
        expect(fastList.get(key)).to.equal(fastList.head.value);
        expect(fastList.get(newKey)).to.equal(fastList.tail.value);

        var newerKey = fastList.addToTail(3);
        expect(fastList.get(key)).to.equal(fastList.head.value);
        expect(fastList.get(newKey)).to.equal(fastList.head.next.value);
        expect(fastList.get(newerKey)).to.equal(fastList.tail.value);

        var newestKey = fastList.addToHead(4);
        expect(fastList.get(newestKey)).to.equal(fastList.head.value);
        expect(fastList.get(key)).to.equal(fastList.head.next.value);
        expect(fastList.get(newKey)).to.equal(fastList.tail.parent.value);
        expect(fastList.get(newerKey)).to.equal(fastList.tail.value);

      });

    });

    describe('set', function () {

      it('should be able to update the value of a listNode', function () {

        var key = fastList.addToTail(1);
        var newKey = fastList.addToTail(2);
        var newerKey = fastList.addToTail(3);
        var newestKey = fastList.addToHead(4);

        fastList.set(key, 10);
        expect(fastList.get(key)).to.equal(10);
        expect(fastList.get(newKey)).to.equal(2);
        expect(fastList.get(newerKey)).to.equal(3);
        expect(fastList.get(newestKey)).to.equal(4);

        fastList.set(newKey, 20);
        expect(fastList.get(key)).to.equal(10);
        expect(fastList.get(newKey)).to.equal(20);
        expect(fastList.get(newerKey)).to.equal(3);
        expect(fastList.get(newestKey)).to.equal(4);

        fastList.set(newerKey, 30);
        expect(fastList.get(key)).to.equal(10);
        expect(fastList.get(newKey)).to.equal(20);
        expect(fastList.get(newerKey)).to.equal(30);
        expect(fastList.get(newestKey)).to.equal(4);

        fastList.set(newestKey, 40);
        expect(fastList.get(key)).to.equal(10);
        expect(fastList.get(newKey)).to.equal(20);
        expect(fastList.get(newerKey)).to.equal(30);
        expect(fastList.get(newestKey)).to.equal(40);

      });

      it('should throw an error if the key does not refer to an existing node', function () {

        expect(fastList.set.bind(fastList, 'asd', 10)).to.throw(/Create a node with this key first/);

      });

    });

    describe('add/remove at methods', function () {

      describe('_add', function () {

        it('should create a node at the specified key and return the node', function () {

          var node = fastList._add(10, 'asd');
          var key = node.__key__;
          expect(key).to.equal('asd');
          expect(fastList.length).to.equal(1);
          expect(fastList.nodeAt(key)).to.equal(node);
          expect(fastList.get(key)).to.equal(10);

        });

        it('should generate a UUID if no key is passed in', function () {

          var node = fastList._add(10);
          var key = node.__key__;
          expect(fastList.length).to.equal(1);
          expect(fastList.nodeAt(key)).to.equal(node);
          expect(fastList.get(key)).to.equal(10);

          var newNode = fastList._add(20);
          var newKey = newNode.__key__;
          expect(fastList.length).to.equal(2);
          expect(fastList.get(key)).to.equal(10);
          expect(fastList.nodeAt(key)).to.equal(node);
          expect(fastList.get(newKey)).to.equal(20);
          expect(fastList.nodeAt(newKey)).to.equal(newNode);

        });

        it('should not update node list location specific properties', function () {

          var node = fastList._add(10);
          var newNode = fastList._add(20);
          expect(fastList.head).to.equal(null);
          expect(fastList.tail).to.equal(null);
          expect(node.parent).to.equal(null);
          expect(node.next).to.equal(null);
          expect(newNode.parent).to.equal(null);
          expect(newNode.next).to.equal(null);

        });

        it('should throw an error if the passed in key already exists', function () {

          fastList._add(20, 'asd');
          expect(fastList._add.bind(fastList, 10, 'asd')).to.throw(/already refers to an existing node/);

        });

      });

      describe('_placeIn', function () {

        it('should take a node and add it above or below the specified node', function () {

          var key = fastList.addToTail(1);
          var node = fastList._add(10);
          fastList._placeIn(node, fastList.head.__key__, true);
          expect(node.next).to.equal(fastList.nodeAt(key));
          expect(fastList.nodeAt(key).parent).to.equal(node);

          var newNode = fastList._add(10);
          fastList._placeIn(newNode, key, false);
          expect(newNode.parent).to.equal(fastList.nodeAt(key));
          expect(fastList.nodeAt(key).next).to.equal(newNode);

        });

        it('should update the head/tail if necessary', function () {

          var key = fastList.addToTail(1);
          var node = fastList._add(10);
          expect(fastList.head).to.equal(fastList.nodeAt(key));
          fastList._placeIn(node, fastList.head.__key__, true);
          expect(fastList.head).to.equal(node);

          var newNode = fastList._add(10);
          fastList._placeIn(newNode, key, false);
          expect(fastList.head).to.equal(node);
          expect(fastList.tail).to.equal(newNode);

        });

      });

      describe('addBefore', function () {

        it('should add a node before the node referenced by the past in key', function () {

          var tailKey = fastList.addToTail(1);
          var headKey = fastList.addBefore(tailKey, 2);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.length).to.equal(2);

          var midKey = fastList.addBefore(tailKey, 3);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.get(midKey)).to.equal(3);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(midKey));
          expect(fastList.nodeAt(midKey).next).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.nodeAt(midKey).parent).to.equal(fastList.nodeAt(headKey));
          expect(fastList.length).to.equal(3);

        });

        it('should update the head if the key references the current list head', function () {

          var tailKey = fastList.addToTail(1);
          expect(fastList.head).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.tail).to.equal(fastList.nodeAt(tailKey));

          var headKey = fastList.addBefore(tailKey, 2);
          expect(fastList.head).to.equal(fastList.nodeAt(headKey));
          expect(fastList.tail).to.equal(fastList.nodeAt(tailKey));

        });

        it('should throw an error if the key does not refer to an existing node', function () {

          expect(fastList.addBefore.bind(fastList, 'asd', 10)).to.throw(/Create a node with this key first/);

        });

      });

      describe('addAfter', function () {

        it('should add a node after the node referenced by the past in key', function () {

          var headKey = fastList.addToHead(2);
          var tailKey = fastList.addAfter(headKey, 1);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.length).to.equal(2);

          var midKey = fastList.addAfter(headKey, 3);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.get(midKey)).to.equal(3);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(midKey));
          expect(fastList.nodeAt(midKey).next).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.nodeAt(midKey).parent).to.equal(fastList.nodeAt(headKey));
          expect(fastList.length).to.equal(3);

        });

        it('should update the tail if the key references the current list tail', function () {

          var headKey = fastList.addToHead(1);
          expect(fastList.head).to.equal(fastList.nodeAt(headKey));
          expect(fastList.tail).to.equal(fastList.nodeAt(headKey));

          var tailKey = fastList.addAfter(headKey, 2);
          expect(fastList.head).to.equal(fastList.nodeAt(headKey));
          expect(fastList.tail).to.equal(fastList.nodeAt(tailKey));

        });

        it('should throw an error if the key does not refer to an existing node', function () {

          expect(fastList.addAfter.bind(fastList, 'asd', 10)).to.throw(/Create a node with this key first/);

        });

      });

      it('should throw an error when trying to create a node with a non-unqiue key', function () {

        var key = fastList.addToHead(1);
        expect(fastList.addAfter.bind(fastList, key, 10, key)).to.throw(/already refers to an existing node/);
        expect(fastList.addBefore.bind(fastList, key, 10, key)).to.throw(/already refers to an existing node/);

      });

      describe('removeAt', function () {

        it('should remove the node specified by the past in key', function () {

          var key1 = fastList.addToTail(1);
          var key2 = fastList.addToTail(2);
          var key3 = fastList.addToTail(3);

          expect(fastList.removeAt(key1)).to.equal(1);
          expect(fastList.length).to.equal(2);
          expect(fastList.get(key1)).to.be.undefined();
          expect(fastList.get(key2)).to.equal(2);
          expect(fastList.get(key3)).to.equal(3);

          expect(fastList.removeAt(key2)).to.equal(2);
          expect(fastList.length).to.equal(1);
          expect(fastList.get(key1)).to.be.undefined();
          expect(fastList.get(key2)).to.be.undefined();
          expect(fastList.get(key3)).to.equal(3);

          expect(fastList.removeAt(key3)).to.equal(3);
          expect(fastList.length).to.equal(0);
          expect(fastList.get(key1)).to.be.undefined();
          expect(fastList.get(key2)).to.be.undefined();
          expect(fastList.get(key3)).to.be.undefined();

        });

        it('should update the head/tail if the key references the current list head/tail', function () {

          var key1 = fastList.addToTail(1);
          var key2 = fastList.addToTail(2);
          var key3 = fastList.addToTail(3);

          fastList.removeAt(key1);
          expect(fastList.head).to.equal(fastList.nodeAt(key2));
          expect(fastList.tail.parent).to.equal(fastList.nodeAt(key2));
          expect(fastList.tail).to.equal(fastList.nodeAt(key3));
          expect(fastList.head.next).to.equal(fastList.nodeAt(key3));

          fastList.removeAt(key3);
          expect(fastList.head).to.equal(fastList.nodeAt(key2));
          expect(fastList.tail).to.equal(fastList.nodeAt(key2));

          fastList.removeAt(key2);
          expect(fastList.head).to.equal(null);
          expect(fastList.tail).to.equal(null);

        });

        it('should throw an error if the key does not refer to an existing node', function () {

          expect(fastList.addAfter.bind(fastList, 'asd', 10)).to.throw(/Create a node with this key first/);

        });

      });

    });

  });

  describe('FastList convenience methods', function () {

    describe('forEach', function () {

      it('should perform an operation for each node in the list', function () {

        var counter = 0;
        var increment = function () {counter++;};

        fastList.forEach(increment);
        expect(counter).to.equal(0);

        fastList.addToTail(1);
        fastList.addToTail(2);
        fastList.addToTail(3);

        fastList.forEach(increment);
        expect(counter).to.equal(3);

      });

      it('should give the callback access to the node.value node.__key__ and the list', function () {

        var keys = [];
        var counter = 0;
        keys.push(fastList.addToTail(1));
        keys.push(fastList.addToTail(2));
        keys.push(fastList.addToTail(3));

        fastList.forEach(function (value, key, list) {

          expect(value).to.equal(fastList.get(keys[counter]));
          expect(fastList.get(key)).to.equal(fastList.get(keys[counter]));
          expect(list).to.equal(fastList);
          counter++;

        });

      });

    });

    describe('sort', function () {

      it('should default to toString character comparison', function () {

        var arr = [1, 5, 2, 'asd', 'ladas', 90, {}, false, null];
        for (var i = 0; i <  arr.length; i++){
          fastList.addToTail(arr[i]);
        }

        fastList.sort();

        var result = [];
        fastList.forEach(function(value){
          result.push(value);
        });

        expect(result).to.eql(arr.sort());

      });

    });

  });

});
