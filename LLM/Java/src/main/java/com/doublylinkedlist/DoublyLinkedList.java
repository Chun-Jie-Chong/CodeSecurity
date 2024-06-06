package com.doublylinkedlist;

public class DoublyLinkedList<T> {
    private Node<T> head;
    private Node<T> tail;
    private int size;

    private static class Node<T> {
        T data;
        Node<T> prev;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    public void add(T data) {
        Node<T> newNode = new Node<>(data);

        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }

        size++;
    }

    public void remove(T data) {
        Node<T> current = head;

        while (current != null) {
            if (current.data.equals(data)) {
                if (current == head) {
                    head = current.next;
                } else if (current == tail) {
                    tail = current.prev;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }

                size--;
                return;
            }

            current = current.next;
        }
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean find(T data) {
        Node<T> current = head;
        while (current != null) {
            if (current.data.equals(data)) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    public void reverse() {
        Node<T> current = head;
        Node<T> temp = null;

        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        if (temp != null) {
            head = temp.prev;
        }
    }
}