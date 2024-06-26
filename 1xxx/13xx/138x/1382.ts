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

function balanceBST(root: TreeNode | null): TreeNode | null {
  function toArray(node: TreeNode | null): number[] {
    if (!node) return []
    return [...toArray(node.left), node.val, ...toArray(node.right)]
  }

  function toBST(array: number[]): TreeNode | null {
    if (array.length === 0) return null
    if (array.length === 1) return new TreeNode(array[0])
    const mid = Math.floor(array.length / 2)
    const left = toBST(array.slice(0, mid))
    const right = toBST(array.slice(mid + 1))
    return new TreeNode(array[mid], left, right)
  }

  const arr = toArray(root)
  return toBST(arr)
}
