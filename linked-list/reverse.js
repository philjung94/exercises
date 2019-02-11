function DoublyLinkedListNode (value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

(function main () {
    /*
     * Initialize a dummy linked list
    */
    var head = new DoublyLinkedListNode(0);
    var curr = head;
    for (let i of [1, 2, 3, 4]) {
        curr.next = new DoublyLinkedListNode(i);
        curr.next.prev = curr;
        curr = curr.next;
    }
    console.log(head.next.next.next);

    /*
     * Reverse it
     */
    curr = head;
    var node = new DoublyLinkedListNode(curr.value);
    while (curr.next) {
        node.prev = new DoublyLinkedListNode(curr.next.value);
        node.prev.next = node;
        curr = curr.next;
        node = node.prev;
    }
    console.log(node);

})();
