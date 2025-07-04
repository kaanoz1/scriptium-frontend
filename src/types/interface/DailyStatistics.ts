export class DailyStatistics<T> {
  data: T;
  dayDictionary: Record<string, number>;

  constructor(data: T, dayDictionary: Record<string, number>) {
    this.data = data;
    this.dayDictionary = dayDictionary;
  }
}
