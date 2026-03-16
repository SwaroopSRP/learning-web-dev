type Sortable = number | string;

function merge<T extends Sortable>(
    arr: T[],
    left: number,
    mid: number,
    right: number
) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i]! <= rightArr[j]!) {
            arr[k++] = leftArr[i++]!;
        } else {
            arr[k++] = rightArr[j++]!;
        }
    }

    while (i < leftArr.length) {
        arr[k++] = leftArr[i++]!;
    }

    while (j < rightArr.length) {
        arr[k++] = rightArr[j++]!;
    }
}

function mergeSort<T extends Sortable>(arr: T[], left = 0, right = arr.length - 1, reverse = false) {
    if (left >= right) {
        return;
    }

    const mid = Math.floor((left + right) / 2);

    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    merge(arr, left, mid, right);

    if (reverse) {
        arr.reverse();
    }
}


let arr1: (number | string)[] = [5, 2, 9, 1, 5, 6];
mergeSort(arr1, undefined, undefined, true);
console.log(arr1);

arr1 = ["Abhishek", "Amit", "Zara", "Shivam", "Karthik", "Shweta"];
mergeSort(arr1);
console.log(arr1);
