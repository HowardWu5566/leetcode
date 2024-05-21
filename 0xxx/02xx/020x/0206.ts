/**
 * Definition for singly-linked list.
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head
  let curr: ListNode | null = head
  let prev: ListNode | null = null
  while (curr) {
    ;[curr.next, prev, curr] = [prev, curr, curr.next]
  }
  return prev
}
