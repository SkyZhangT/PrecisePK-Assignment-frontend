const initialState = {
  background_color: "white",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BKG_COLOR":
      return { ...state, background_color: action.payload };
    default:
      return { ...state };
  }
};

export default themeReducer;
