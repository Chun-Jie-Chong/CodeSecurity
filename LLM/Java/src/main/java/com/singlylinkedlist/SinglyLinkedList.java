package com.singlylinkedlist;

public class SinglyLinkedList<T> {
    private Node<T> head;
    private int size;

    private static class Node<T> {
        private T data;
        private Node<T> next;

        public Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    public SinglyLinkedList() {
        this.head = null;
        this.size = 0;
    }

    public void add(T data) {
        Node<T> newNode = new Node<>(data);

        if (head == null) {
            head = newNode;
        } else {
            Node<T> current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }

        size++;
    }

    public void remove(T data) {
        if (head == null) {
            return;
        }

        if (head.data.equals(data)) {
            head = head.next;
            size--;
            return;
        }

        Node<T> current = head;
        Node<T> previous = null;

        while (current != null && !current.data.equals(data)) {
            previous = current;
            current = current.next;
        }

        if (current != null) {
            previous.next = current.next;
            size--;
        }
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void insertAt(int index, T data) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Invalid index");
        }
        Node<T> newNode = new Node<>(data);
        if (index == 0) {
            newNode.next = head;
            head = newNode;
        } else {
            Node<T> current = head;
            for (int i = 0; i < index - 1; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        size++;
    }
}