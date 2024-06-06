package com.hashmap;

import java.util.LinkedList;
import java.util.List;
import java.util.ArrayList;

public class HashMap<K, V> {
    private static final int DEFAULT_CAPACITY = 16;
    private LinkedList<Entry<K, V>>[] buckets;
    private int size;

    public HashMap() {
        this(DEFAULT_CAPACITY);
    }

    public HashMap(int capacity) {
        buckets = new LinkedList[capacity];
        size = 0;
    }

    public void put(K key, V value) {
        int index = getIndex(key);
        if (buckets[index] == null) {
            buckets[index] = new LinkedList<>();
        }

        LinkedList<Entry<K, V>> bucket = buckets[index];
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
        LinkedList<Entry<K, V>> bucket = buckets[index];
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
        LinkedList<Entry<K, V>> bucket = buckets[index];
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

    public List<Entry<K, V>> entries() {
        List<Entry<K, V>> entryList = new ArrayList<>();
        for (LinkedList<Entry<K, V>> bucket : buckets) {
            if (bucket != null) {
                entryList.addAll(bucket);
            }
        }
        return entryList;
    }

    private int getIndex(K key) {
        return Math.abs(key.hashCode()) % buckets.length;
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