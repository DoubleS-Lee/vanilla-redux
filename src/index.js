import { createStore } from 'redux';

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;


// reducer에서 data를 수정하고
// 외부에서 reducer에게 데이터를 전달해줘야해서 action을 reducer로 보내야함
// 이때 dispatch를 이용해서 외부에서 reducer의 action으로 지령을 보낸다



// reducer
// 여기서 count는 state라고 생각해도 된다
const countModifier= (count = 0, action) => {
  if (action.type === "ADD") {
    count = count + 1;
  } else if (action.type === "MINUS") {
    count = count - 1;
  } else {
    console.log("입력값을 확인해주세요")
  }
  console.log(count, action);
  return count;
}

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
  countStore.dispatch({type:"ADD"});
};

const handleMinus = () => {
  countStore.dispatch({type:"MINUS"});
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);