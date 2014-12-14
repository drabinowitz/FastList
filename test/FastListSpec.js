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

    describe('add at methods', function () {

      describe('addBefore', function () {

        it('should add a node before the node referenced by the past in key', function () {

          var tailKey = fastList.addToTail(1);
          var headKey = fastList.addBefore(tailKey, 2);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(tailKey));

          var midKey = fastList.addBefore(tailKey, 3);
          expect(fastList.get(tailKey)).to.equal(1);
          expect(fastList.get(headKey)).to.equal(2);
          expect(fastList.get(midKey)).to.equal(3);
          expect(fastList.nodeAt(headKey).next).to.equal(fastList.nodeAt(midKey));
          expect(fastList.nodeAt(midKey).next).to.equal(fastList.nodeAt(tailKey));
          expect(fastList.nodeAt(midKey).parent).to.equal(fastList.nodeAt(headKey));

        });

        it('should update the head if the key references the current list head', function () {});

        it('should throw an error if the key does not refer to an existing node', function () {

          expect(fastList.addBefore.bind(fastList, 'asd', 10)).to.throw(/Create a node with this key first/);

        });

      });

    });

  });

});
