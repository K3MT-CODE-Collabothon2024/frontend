import { createSlice } from '@reduxjs/toolkit';

const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState: {
    isTutorialOn: false,
  },
  reducers: {
    setTutorialOn: (state) => {
      state.isTutorialOn = true;
    },
    setTutorialOff: (state) => {
      state.isTutorialOn = false;
    },
  },
});

export const { setTutorialOn, setTutorialOff } = tutorialSlice.actions;
export default tutorialSlice.reducer;