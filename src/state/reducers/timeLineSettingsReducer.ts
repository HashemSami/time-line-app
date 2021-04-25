interface TimeLineSettingsState {
  weekEnds: number[];
}

const initialState: TimeLineSettingsState = { weekEnds: [0, 1] };

const timeLineSettingsReducer = (state: TimeLineSettingsState = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default timeLineSettingsReducer;
