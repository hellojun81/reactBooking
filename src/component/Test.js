import React, { useState } from "react";

const LowComponent = (props) => {
  const [text, setText] = useState("");

  const textChangeHandler=(e) => {
    setText(e.currentTarget.value);
  }

  const submitText = () => {
    props.propFunction(text)
  }

  return (
    <>
      <input value={text} onChange={textChangeHandler} />
      <button onClick={submitText}>submit</button>
    </>

  )
}

export default LowComponent