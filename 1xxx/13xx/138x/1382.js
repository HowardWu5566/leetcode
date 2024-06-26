/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const balanceBST = function (root) {
  function toArray(node) {
    if (!node) return []
    return [...toArray(node.left), node.val, ...toArray(node.right)]
  }

  function toBST(array) {
    if (array.length === 0) return null
    if (array.length === 1) return new TreeNode(array[0])
    const mid = Math.floor(array.length / 2)
    const left = toBST(array.slice(0, mid - 1))
    const right = toBST(array.slice(mid + 1))
    return new TreeNode(array[mid], array[left], array[right])
  }

  const arr = toArray(root)
  return toBST(arr)
}
