import AVL from '../AVL';

let consoleLogSpy;
beforeEach(async () => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

const testAvl = new AVL();

testAvl.insert(45);
testAvl.insert(40);
testAvl.insert(35);
testAvl.insert(32);
testAvl.insert(30);
testAvl.insert(36);

test('should add all values', async () => {

  const avl = new AVL();

  avl.insert(45);
  avl.insert(40);
  avl.insert(35);
  avl.insert(32);
  avl.insert(30);
  avl.insert(36);


  avl.printReverseInOrder();

  expect(consoleLogSpy).toBeCalledWith('45 40 36 35 32 30')
});

test('should find the node', async () => {
  expect(testAvl.findNode(30)).toEqual(expect.objectContaining({ value: 30 }));
});


test('should not find the node', async () => {
  expect(testAvl.findNode(31)).toBeNull();
});


/**
 *         c
 *        / \           _b_
 *       b   z         /   \
 *      / \     ->    a     c
 *     a   y         / \   / \
 *    / \           w   x y   z
 *   w   x
 */
test('should correctly balance the left left case', async ()  => {
  let avl = new AVL();
  avl.insert(3);
  avl.insert(2);
  avl.insert(1);
  expect(avl._root.value).toEqual(2);
});

/**
 *       c
 *      / \           _b_
 *     a   z         /   \
 *    / \     ->    a     c
 *   w   b         / \   / \
 *      / \       w   x y   z
 *     x   y
 */
test('should correctly balance the left right case', async () => {
  const avl = new AVL();
  avl.insert(3);
  avl.insert(1);
  avl.insert(2);
  expect(avl._root.value).toEqual(2);
});

/**
 *     a
 *    / \               _b_
 *   w   b             /   \
 *      / \     ->    a     c
 *     x   c         / \   / \
 *        / \       w   x y   z
 *       y   z
 */
test('should correctly balance the right right case', () => {
  const avl = new AVL();
  avl.insert(1);
  avl.insert(2);
  avl.insert(3);
  expect(avl._root.value).toEqual(2);
});

/**
 *     a
 *    / \             _b_
 *   w   c           /   \
 *      / \   ->    a     c
 *     b   z       / \   / \
 *    / \         w   x y   z
 *   x   y
 */
test('should correctly balance the right left case', () => {
  const avl = new AVL();
  avl.insert(1);
  avl.insert(3);
  avl.insert(2);
  expect(avl._root.value).toEqual(2);
});

