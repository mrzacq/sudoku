import axios from 'axios'
const url = "https://sugoku.herokuapp.com/board"

export function getBoard(){
    return (dispatch) => {
        axios({
            method: "get",
            url: url
        })
        .then(({data}) => {
           dispatch({
                type: "LOCK_BOARD",
                payload: data.board
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}