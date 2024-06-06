package com.queue;

import java.util.LinkedList;


public class Queue<T> {
    private LinkedList<T> queue;

    public Queue() {
        queue = new LinkedList<>();
    }

    public void enqueue(T item) {
        queue.addLast(item);
    }

    public T dequeue() {
        return queue.pollFirst();
    }

    public T peek() {
        return queue.peekFirst();
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }

    public int size() {
        return queue.size();
    }
}