import { BaseSyntheticEvent } from "react";

export interface NavProps {
  onKyuChange(e: BaseSyntheticEvent): Promise<void>;
  onLevelChange(e: BaseSyntheticEvent): Promise<void>;
}
