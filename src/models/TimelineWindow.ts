export interface TimelineObj {
  updateData: (
    newData: {
      name: string;
      value: number;
    }[]
  ) => void;
}

interface Chart {
  width: number;
  height: number;
  updateFunction: (barObj: TimelineObj) => void;
}

export type TimelineWindowProps = Chart;
