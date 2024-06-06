package com.hashtable;

import java.util.LinkedList;

public class HashTable<K, V> {
    private static final int DEFAULT_CAPACITY = 10;
    private LinkedList<Entry<K, V>>[] table;
    private int size;

    public HashTable() {
        table = new LinkedList[DEFAULT_CAPACITY];
        size = 0;
    }

    public void put(K key, V value) {
        int index = getIndex(key);
        LinkedList<Entry<K, V>> bucket = table[index];

        if (bucket == null) {
            bucket = new LinkedList<>();
            table[index] = bucket;
        }

        for (Entry<K, V> entry : bucket) {
            if (entry.getKey().equals(key)) {
                entry.setValue(value);
                return;
            }
        }

        bucket.add(new Entry<>(key, value));
        size++;
    }

    public V get(K key) {
        int index = getIndex(key);
        LinkedList<Entry<K, V>> bucket = table[index];

        if (bucket != null) {
            for (Entry<K, V> entry : bucket) {
                if (entry.getKey().equals(key)) {
                    return entry.getValue();
                }
            }
        }

        return null;
    }

    public void remove(K key) {
        int index = getIndex(key);
        LinkedList<Entry<K, V>> bucket = table[index];

        if (bucket != null) {
            for (Entry<K, V> entry : bucket) {
                if (entry.getKey().equals(key)) {
                    bucket.remove(entry);
                    size--;
                    return;
                }
            }
        }
    }

    public int size() {
        return size;
    }

    private int getIndex(K key) {
        int hashCode = key.hashCode();
        return Math.abs(hashCode) % table.length;
    }

    private static class Entry<K, V> {
        private K key;
        private V value;

        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        public void setValue(V value) {
            this.value = value;
        }
    }
}