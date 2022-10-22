import { MakerState } from "./stateConstructor"

export type SchedulerState = {
    state: MakerState;
    listeners: ((newState: SchedulerState) => void)[];
  }