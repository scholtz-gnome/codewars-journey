import { Kyu } from "../types/kyu.enum";
import { Level } from "../types/level.enum";

export interface CreateChallengeDto {
  name: string;
  url: string;
  kyu: Kyu;
  level: Level;
}
