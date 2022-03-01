// Angular CDK Drag Utils source: https://github.com/angular/components/blob/master/src/cdk/drag-drop/drag-utils.ts

/**
 * Moves an item one index in an array to another.
 * @param arraySource Array in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which the item should be moved.
 */
export function moveItemInArray<T = any>(arraySource: T[], fromIndex: number, toIndex: number): T[] {
  const array = JSON.parse(JSON.stringify(arraySource));
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return [];
  }

  const target = array[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }

  array[to] = target;
  return array;
}

/**
 * Moves an item from one array to another.
 * @param currentArraySource Array from which to transfer the item.
 * @param targetArraySource Array into which to put the item.
 * @param currentIndex Index of the item in its current array.
 * @param targetIndex Index at which to insert the item.
 */
export function transferArrayItem<T = any>(
  currentArraySource: T[],
  targetArraySource: T[],
  currentIndex: number,
  targetIndex: number
): { currentArray: T[]; targetArray: T[] } {
  const currentArray = JSON.parse(JSON.stringify(currentArraySource));
  const targetArray = JSON.parse(JSON.stringify(targetArraySource));

  const from = clamp(currentIndex, currentArray.length - 1);
  const to = clamp(targetIndex, targetArray.length);

  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
  }

  return {
    currentArray,
    targetArray,
  };
}

/**
 * Copies an item from one array to another, leaving it in its
 * original position in current array.
 * @param currentArraySource Array from which to copy the item.
 * @param targetArraySource Array into which is copy the item.
 * @param currentIndex Index of the item in its current array.
 * @param targetIndex Index at which to insert the item.
 *
 */
export function copyArrayItem<T = any>(
  currentArraySource: T[],
  targetArraySource: T[],
  currentIndex: number,
  targetIndex: number
): { currentArray: T[]; targetArray: T[] } {
  const currentArray = JSON.parse(JSON.stringify(currentArraySource));
  const targetArray = JSON.parse(JSON.stringify(targetArraySource));

  const to = clamp(targetIndex, targetArray.length);

  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray[currentIndex]);
  }

  return {
    currentArray,
    targetArray,
  };
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}
