const initialState = {
  boards: [],
  isSolved: false,
  isLoading: false,
};

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "LOCK_BOARD":
      return { ...state, boards: action.payload };
      case "FINISH_LOADING":
        return { ...state, isLoading: false };
    case "SOLVE_BOARD":
      return { ...state, isSolved: action.payload };
    case "CHANGE_BOARD":
      const { value, x, y } = action.payload;
      const setBoards = (boards) => {
        let allBoard = [...boards];
        allBoard[x][y] = Number(value);
        return allBoard;
      };
      return { ...state, boards: setBoards(state.boards) };
    case "PLAY_AGAIN":
      return { ...state, isSolved: false };
    default:
      return state;
  }
}
