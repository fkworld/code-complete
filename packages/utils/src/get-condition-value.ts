export function getConditionValue<T>(options: Array<{ condition: boolean; value: T }>): T | undefined {
  for (const option of options) {
    if (option.condition) {
      return option.value;
    }
  }
}
