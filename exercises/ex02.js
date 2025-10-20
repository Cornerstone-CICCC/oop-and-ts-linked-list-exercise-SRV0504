const DLL = require('../lib/DLL');

function deleteAllNodesWithValue(list, value) {
  // Start at the head of the list
  let current = list.head;

  // Traverse the entire list
  while (current) {
    // Save the next node now because current may be removed
    const nextNode = current.next;

    if (current.value === value) {
      // If current is the head, move head forward
      if (current === list.head) {
        list.head = current.next;
        if (list.head) {
          list.head.prev = null;
        } else {
          // List became empty
          list.tail = null;
        }
      } else if (current === list.tail) {
        // If current is the tail, move tail backward
        list.tail = current.prev;
        if (list.tail) {
          list.tail.next = null;
        } else {
          // List became empty
          list.head = null;
        }
      } else {
        // Middle node: stitch prev and next together
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }

      // Decrement list size when a node is removed
      if (typeof list.size === 'number') {
        list.size--;
      }
    }

    // Move to the saved next node
    current = nextNode;
  }
}

// Test
const list = new DLL();
list.insertAtBack(1);
list.insertAtBack(2);
list.insertAtBack(3);
list.insertAtBack(2);
list.insertAtBack(5);

deleteAllNodesWithValue(list, 2);
console.log(list.print()); // Expected output: 1 <-> 3 <-> 5
