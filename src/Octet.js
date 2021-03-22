const Octet = (props) => {

  return (
    <div>
      <input 
        type="text"
        value={props.value}
      onChange={e => props.changeFunction(e.target.value, props.index)}
      />
    </div>
  );
}

export default Octet;
