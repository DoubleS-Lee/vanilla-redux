import { createStore } from 'redux';

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;


// reducer에서 data를 수정하고
// 외부에서 reducer에게 데이터를 전달해줘야해서 action을 reducer로 보내야함
// 이때 dispatch를 이용해서 외부에서 reducer의 action으로 지령을 보낸다

const ADD = "ADD";
const MINUS = "MINUS";


// reducer
// 여기서 count는 state라고 생각해도 된다
const countModifier= (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// store
// countStore는 store의 역할을 하고 있음
// countModifier는 reducer 함수의 역할을 하고 있음
const countStore = createStore(countModifier);

// store를 console.log 해보면 4가지 함수가 나온다(dispatch, subscribe, getState, replaceReducer)
console.log(countStore);

// reducer에서 return으로 넘겨준 값을 보려면 .getState()를 사용해야 함
// console.log(countStore.getState());

// subscribe
// subscribe : store에게 변화가 있을때마다 실행하는 함수이다
// store의 count 값을 받아서 number.innerText에게 업데이트를 해준다 
const onChange = () => {
  number.innerText = countStore.getState();
};

// countStore에게 변화가 있을때마다 onChange 함수를 실행한다
countStore.subscribe(onChange);


// dispatch
// action으로 데이터를 보냄(object 형태로)
const handleAdd = () => {
  countStore.dispatch({type:ADD});
};

const handleMinus = () => {
  countStore.dispatch({type:MINUS});
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);


// -------------------------------------------------------------------------------------------

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};


const reducer = (state = [], action) => {
    // console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return [{text:action.text, id:Date.now()}, ...state];
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value="";
    dispatchAddToDo(toDo);
};

form.addEventListener('submit', onSubmit);