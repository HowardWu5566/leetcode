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

const bstToGst = function (root) {
  let sum = 0

  function newKey(node) {
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
// const bstToGst = function (root) {
//   const maxIndex = root.length - 1
//   // function newKey(index) {
//   //   if (index >= length) return root[index]
//   //   return (root[index] += newKey[index * 2 + 2])
//   // }
//   for (let i = maxIndex - 1; i >= 0; i--) {
//     if(root[i]===null)return
//     // root[i] += root[i * 2 + 2]
//     // if (i * 2 + 2 >= maxIndex) {
//     //   root[i] += root[i * 2 + 2]
//     // } else if ((i - 1) % 2 === 0) {
//     //   root[i] += root[(i - 1) / 2]
//     // }

//     if (i % 2) {
//     }
//   }
//   // newKey(0)
//   console.log(null + 1)
// }

// bstToGst([4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8])
