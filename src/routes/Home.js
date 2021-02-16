import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

// mapStateToProps, mapDispatchToProps의 return 값을 Home 함수의 input으로 넣어준다
function Home ({ toDos, addToDo }) {
    const [text, setText] = useState("");
    const onChange = (e) => {
        setText(e.target.value);
        // console.log(text);
    };

    const onSubmit= (e) => {
        e.preventDefault();
        addToDo(text);
        setText("");
        // console.log(text);
    };

    return(
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} value={text}/>
                <button>Add</button>
            </form>
            <ul>{JSON.stringify(toDos)}</ul>
        </>
    )
}

// https://react-redux.js.org/using-react-redux/connect-mapstate
// mapStateToProps : state와 props를 건네받는다
// state는 redux store로부터 props는 react-router로부터 받는다
// 이 함수에 Home에 건네줄 props를 새로 생성할 수 있다
// 이를 이용해서 redux의 state를 props에 넣어서 받아올 수 있다 => return {toDos:state};
function mapStateToProps(state,props) {
    // console.log(state, props);
    return {toDos:state};
}

// https://react-redux.js.org/using-react-redux/connect-mapdispatch
// mapDispatchToProps : dispatch와 props를 받는다
// store로부터 dispatch를 받아온다 그래서 여기서 dispatch를 이용해서 store의 state에게 원하는 값을 넘겨준다 props는 react-router로부터 받는다
// 
function mapDispatchToProps(dispatch,props) {
    // console.log(dispatch, props)
    return {
        // dispatch로 addToDo의 return 값을 store에 넘겨준다
        // 그럼 맨 앞 addToDo에는 return 값이 들어가게 된다
        addToDo: text => dispatch(actionCreators.addToDo(text))
    };
}


// connect를 이용해서 store의 state를 Home에 갖다준다
// connect를 이용해서 dispatch도 Home에서 작업이 가능하다
// 여기서 mapStateToProps, mapDispatchToProps의 return 값을 위에 Home 함수의 input으로 넣어준다
export default connect(mapStateToProps, mapDispatchToProps)(Home);