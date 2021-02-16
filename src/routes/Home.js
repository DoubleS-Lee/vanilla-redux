import React, { useState } from 'react';


export default function Home () {
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
            <ul></ul>
        </>
    )
}