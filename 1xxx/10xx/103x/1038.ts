/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function bstToGst(root: TreeNode | null): TreeNode | null {
  let sum: number = 0
  function newKey(node: TreeNode | null): TreeNode | null {
    if (node !== null) {
      newKey(node.right)
      sum += node.val
      node.val = sum
      newKey(node.left)
    }
    return node
  }

  return newKey(root)
}
