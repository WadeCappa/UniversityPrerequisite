import { MakerState } from "./StateConstructor"

export type SchedulerState = {
    state: MakerState;
    listeners: ((newState: SchedulerState) => void)[];
  }