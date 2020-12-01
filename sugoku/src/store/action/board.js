import axios from "axios";
const url = "https://sugoku.herokuapp.com/";

export function getBoard() {
  return (dispatch, getState) => {
    const level = getState().userReducer.level;
    dispatch({ type: "START_LOADING", payload: true });
    axios({
      method: "get",
      url: url + "board?difficulty=" + level,
    })
      .then(({ data }) => {
        return dispatch({
          type: "LOCK_BOARD",
          payload: data.board,
        });
      })
      .then(() => {
        dispatch({ type: "FINISH_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function changeBoard(value, x, y) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch({ type: "START_LOADING" }));
    })
      .then(() => {
        return dispatch({
          type: "CHANGE_BOARD",
          payload: {
            value,
            x,
            y,
          },
        });
      })
      .then(() => {
        dispatch({ type: "FINISH_LOADING" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

export function validateBoard() {
  return (dispatch, getState) => {
    const { boards } = getState().boardReducer;
    const data = { board: boards };
    return axios({
      method: "post",
      url: url + "validate",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: encodeParams(data),
    })
      .then(({ data }) => {
        if (data.status === "solved") {
          dispatch({
            type: "SOLVE_BOARD",
            payload: true
          });
        } else {
          dispatch({
            type: "SOLVE_BOARD",
            payload: false
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "SOLVE_BOARD",
          payload: false,
        });
        console.log(err);
      });
  };
}

export function autoSolve() {
  return (dispatch, getState) => {
    const boards = getState().boardReducer.boards;
    const data = { board: boards };
    axios({
      method: "post",
      url: url + "solve",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: encodeParams(data),
    })
      .then(({ data }) => {
        dispatch({
          type: "LOCK_BOARD",
          payload: data.solution,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function playAgain() {
  return {
    type: "PLAY_AGAIN",
  };
}
