import React, { useState } from 'react';
import { connect } from 'react-redux';


function Home ({ toDos }) {
    const [text, setText] = useState("");
    const onChange = (e) => {
        setText(e.target.value);
        // console.log(text);
    };

    const onSubmit= (e) => {
        e.preventDefault();
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
// mapStateToProps : 여기에서는 getCurrentState임(state와 props를 건네받는다).
// state는 redux store로부터 props는 react-router로부터 받는다
// 이 함수에 Home에 건네줄 props를 새로 생성할 수 있다
// 이를 이용해서 redux의 state를 props에 넣어서 받아올 수 있다 => return {toDos:state};
function mapStateToProps(state,props) {
    console.log(state, props);
    return {toDos:state};
}


// connect를 이용해서 store의 state를 Home에 갖다준다
export default connect(mapStateToProps)(Home);