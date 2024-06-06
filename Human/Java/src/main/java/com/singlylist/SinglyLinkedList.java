package com.singlylist;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 * https://en.wikipedia.org/wiki/Linked_list
 */
public class SinglyLinkedList implements Iterable<Integer> {

    /**
     * Head refer to the front of the list
     */
    private Node head;

    /**
     * Size of SinglyLinkedList
     */
    private int size;

    /**
     * Init SinglyLinkedList
     */
    public SinglyLinkedList() {
        head = null;
        size = 0;
    }

    /**
     * Init SinglyLinkedList with specified head node and size
     *
     * @param head the head node of list
     * @param size the size of list
     */
    public SinglyLinkedList(Node head, int size) {
        this.head = head;
        this.size = size;
    }

    /**
     * Checks if the list is empty
     *
     * @return {@code true} if list is empty, otherwise {@code false}.
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns the size of the linked list.
     *
     * @return the size of the list.
     */
    public int size() {
        return size;
    }

    /**
     * Get head of the list.
     *
     * @return head of the list.
     */
    public Node getHead() {
        return head;
    }

    /**
     * Set head of the list.
     *
     */
    public void setHead(Node head) {
        this.head = head;
    }

    /**
     * Calculate the count of the list manually
     *
     * @return count of the list
     */
    public int count() {
        int count = 0;
        for (final var element : this) {
            ++count;
        }
        return count;
    }

    /**
     * Test if the value key is present in the list.
     *
     * @param key the value to be searched.
     * @return {@code true} if key is present in the list, otherwise
     * {@code false}.
     */
    public boolean search(final int key) {
        for (final var element : this) {
            if (element == key) {
                return true;
            }
        }
        return false;
    }

    public void deleteDuplicates() {
        Node pred = head;
        // predecessor = the node
        // having sublist of its duplicates
        Node newHead = head;
        while (newHead != null) {
            // if it's a beginning of duplicates sublist
            // skip all duplicates
            if (newHead.next != null && newHead.value == newHead.next.value) {
                // move till the end of duplicates sublist
                while (newHead.next != null && newHead.value == newHead.next.value) {
                    newHead = newHead.next;
                }
                // skip all duplicates
                pred.next = newHead.next;
                newHead = null;
                // otherwise, move predecessor
            }
            // move forward
            pred = pred.next;
            newHead = pred;
        }
    }

    /**
     * Inserts an element at the head of the list
     *
     * @param x element to be added
     */
    public void insertHead(int x) {
        insertNth(x, 0);
    }

    /**
     * Insert an element at the tail of the list
     *
     * @param data element to be added
     */
    public void insert(int data) {
        insertNth(data, size);
    }

    /**
     * Inserts a new node at a specified position of the list
     *
     * @param data data to be stored in a new node
     * @param position position at which a new node is to be inserted
     */
    public void insertNth(int data, int position) {
        checkBounds(position, 0, size);
        Node newNode = new Node(data);
        if (head == null) {
            /* the list is empty */
            head = newNode;
            size++;
            return;
        }
        if (position == 0) {
            /* insert at the head of the list */
            newNode.next = head;
            head = newNode;
            size++;
            return;
        }

        Node cur = head;
        for (int i = 0; i < position - 1; ++i) {
            cur = cur.next;
        }
        newNode.next = cur.next;
        cur.next = newNode;
        size++;
    }

    /**
     * Swaps nodes of two given values a and b.
     *
     */

    /**
     * Deletes a node at the head
     */
    public void deleteHead() {
        deleteNth(0);
    }

    /**
     * Deletes an element at the tail
     */
    public void delete() {
        deleteNth(size - 1);
    }

    /**
     * Deletes an element at Nth position
     */
    public void deleteNth(int position) {
        checkBounds(position, 0, size - 1);
        if (position == 0) {
            head = head.next;
            /* clear to let GC do its work */
            size--;
            return;
        }
        Node cur = head;
        for (int i = 0; i < position - 1; ++i) {
            cur = cur.next;
        }

        cur.next = cur.next.next;
        size--;
    }

    /**
     * Return element at special index.
     *
     * @param index given index of element
     * @return element at special index.
     */
    public int getNth(int index) {
        checkBounds(index, 0, size - 1);
        Node cur = head;
        for (int i = 0; i < index; ++i) {
            cur = cur.next;
        }
        return cur.value;
    }

    /**
     * @param position to check position
     * @param low low index
     * @param high high index
     * @throws IndexOutOfBoundsException if {@code position} not in range
     * {@code low} to {@code high}
     */
    public void checkBounds(int position, int low, int high) {
        if (position > high || position < low) {
            throw new IndexOutOfBoundsException(position + "");
        }
    }

    @Override
    public Iterator<Integer> iterator() {
        return new SinglyLinkedListIterator();
    }

    private class SinglyLinkedListIterator implements Iterator<Integer> {
        private Node current;

        SinglyLinkedListIterator() {
            current = head;
        }

        @Override
        public boolean hasNext() {
            return current != null;
        }

        @Override
        public Integer next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            final var value = current.value;
            current = current.next;
            return value;
        }
    }
}

/**
 * This class is the nodes of the SinglyLinked List. They consist of a value and
 * a pointer to the node after them.
 */
class Node {

    /**
     * The value of the node
     */
    int value;

    /**
     * Point to the next node
     */
    Node next;

    Node() {
    }

    /**
     * Constructor
     *
     * @param value Value to be put in the node
     */
    Node(int value) {
        this(value, null);
    }

    /**
     * Constructor
     *
     * @param value Value to be put in the node
     * @param next Reference to the next node
     */
    Node(int value, Node next) {
        this.value = value;
        this.next = next;
    }
}
