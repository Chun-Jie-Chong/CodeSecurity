package com.queue;

import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.StringJoiner;

public class LinkedQueue<T> implements Iterable<T> {

    static class Node<T> {

        T data;
        Node<T> next;

        public Node() {
            this(null);
        }

        public Node(T data) {
            this(data, null);
        }

        public Node(T data, Node<T> next) {
            this.data = data;
            this.next = next;
        }
    }

    /**
     * Front of Queue
     */
    private Node<T> front;

    /**
     * Rear of Queue
     */
    private Node<T> rear;

    /**
     * Size of Queue
     */
    private int size;

    /**
     * Init LinkedQueue
     */
    public LinkedQueue() {
        front = rear = new Node<>();
    }

    /**
     * Check if queue is empty
     *
     * @return true if queue is empty, otherwise false
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Add element to rear of queue
     *
     * @param data insert value
     */
    public void enqueue(T data) {
        Node<T> newNode = new Node<>(data);

        rear.next = newNode;
        rear = newNode;
        /* make rear point at last node */
        size++;
    }

    /**
     * Remove element at the front of queue
     *
     * @return element at the front of queue
     */
    public T dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("queue is empty");
        }
        Node<T> destroy = front.next;
        T retValue = destroy.data;
        front.next = front.next.next;
        /* clear let GC do it's work */
        size--;

        if (isEmpty()) {
            front = rear;
        }

        return retValue;
    }

    /**
     * Peeks the element at the index and
     *          returns the value
     * @param pos at which to peek
     */

    public T peek(int pos) {
        if (pos > size) throw new IndexOutOfBoundsException("Position %s out of range!".formatted(pos));
        Node<T> node = front;
        while (pos-- > 0) node = node.next;
        return node.data;
    }

    /**
     * Return size of queue
     *
     * @return size of queue
     */
    public int size() {
        return size;
    }
}
