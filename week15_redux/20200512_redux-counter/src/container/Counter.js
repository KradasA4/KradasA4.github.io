import React from 'react'
import CounterPanel from '../components/CounterPanel';
import './Counter.css';
import { connect } from 'react-redux';

import {increaseCounter, decreaseCounter, addCounter, subtractCounter} from '../store/actions';

function Counter(props) {
  return (
    <div className='counter'>
      {/* {console.log(props.ctr) ส่งมาจาก mapStateToProps  */}
      <div className='counter__display'>Counter: {props.ctr}</div>
      <div className='counter__button'>
        <CounterPanel value='Increase' changeCounter={props.incrementCtr} />
        <CounterPanel value='Decrease' changeCounter={props.decrementCtr} />
        <CounterPanel value='Add 5' changeCounter={() => props.addCtr(5)} />
        <CounterPanel value='Subtract 5' changeCounter={() => props.subtractCtr(5)} />
      </div>
      <hr />
      <button onClick={props.onSaveResult}>save result</button>
      <ul className='counter__results'>
        {props.results.map((result) => {
          return <li key={result.id} onClick={() => props.onDeleteResult(result.id)}>{result.value}</li>
        })}
      </ul>
    </div>
  );
}

// pass state มาจาก store ซึ่งมาจาก reducers
// state ตรงนี้คือ store.getState()
const mapStateToProps = state => {
  // console.log(state);
  return {
    ctr: state.counter,
    results: state.results
  }
}


// ย้ายไปไฟล์ actions
// // ส่งไปให้ reducers แล้วเอากลับมาเป็น props
// const mapDispatchToProps = dispatch => {
//   return {
//     IncrementCtr: () => dispatch({type: 'INC_COUNTER'}),
//     DecrementCtr: () => dispatch({type: 'DEC_COUNTER'}),
//     AddCtr: (number) => dispatch({type: 'ADD_COUNTER', value: number}),
//     SubtractCtr: (number) => dispatch({type: 'SUB_COUNTER', value: number})
//   }
// }

// ส่งไปให้ reducers แล้วเอากลับมาเป็น props
const mapDispatchToProps = dispatch => {
  return {
    incrementCtr: (number) => dispatch(increaseCounter(number)),
    decrementCtr: (number) => dispatch(decreaseCounter(number)),
    addCtr: (number) => dispatch(addCounter(number)),
    subtractCtr: (number) => dispatch(subtractCounter(number)),
    onSaveResult: (number) => dispatch({type: 'STORE_RESULT', value: number}),
    onDeleteResult: (targetId) => dispatch({type: 'DELETE_RESULT', id: targetId})
  }
}

// Counter คือ component ที่เราจะเชื่อม แล้ว export Counter ไปให้ App
export default connect(mapStateToProps, mapDispatchToProps)(Counter);


// พอดึง store มาใส่ mapStateToProps ก็ connect เพื่อเอา state นั้นไปพาสเป็น props ให้ (Counter)