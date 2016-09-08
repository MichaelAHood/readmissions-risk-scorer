/**
 * Created by prokarma on 8/30/2016.
 */
export class AgeDistribution{
  private AgeGroupRange: number = 5;
  public AgeBucket: Array<number> = [];

  public NumberOfColumns(): number{
    let upper = Math.max.apply(Math, this.AgeBucket);
    let lower = Math.max.apply(Math, this.AgeBucket);
    return ((upper - lower) / this.AgeGroupRange);
  }
}
