function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}

// Example usage:
const numbers = [5, 3, 8, 4, 2];
console.log(bubbleSort(numbers)); // Output: [2, 3, 4, 5, 8]