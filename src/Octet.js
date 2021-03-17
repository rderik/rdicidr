import React, { useState } from 'react';

const Octet = (props) => {

  const [decValue, setDecValue] = useState(props.value);
  const [binValue, setBinValue] = useState(decValue.toString(2));
  return (
    <div>
      <input 
        type="text"
        value={decValue}
      />
        <span>{binValue.padStart(8,'0')}</span>
    </div>
  );
}

export default Octet;
