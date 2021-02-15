import { createStore } from 'redux';

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier= (count = 0) => {
  return count;
}

// countStore는 store의 역할을 하고 있음
// countModifier는 reducer 함수의 역할을 하고 있음
const countStore = createStore(countModifier);

// reducer에서 return으로 넘겨준 값을 보려면 .getState()를 사용해야 함
console.log(countStore.getState());