import React from 'react'
import CounterPanel from '../components/CounterPanel';
import './Counter.css';
import { connect } from 'react-redux';

import * as actionTypes from '../store/constants';
import {increaseCounter, decreaseCounter, addCounter, subtractCounter, resetCounter} from '../store/actions';
import * as actionCreators from '../store/actions';

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
        <CounterPanel value='Reset' changeCounter={() => props.onResetCtr(5)} />
      </div>
      <hr />
      <button onClick={() => props.onSaveResult(props.ctr)}>save result</button>
      <ul className='counter__results'>
        {props.results.map((result) => {
          // console.log(result)
          return <li onClick={() => props.onDeleteResult(result.id)}>{result.counter}</li>
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
    // store.reducerตัวไหน.state ถ้าไม่ combineReducer ก็ state.counter ได้เลย
    ctr: state.ctr.counter,
    results: state.res.results
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
    incrementCtr: () => dispatch(actionCreators.increaseCounter()),
    decrementCtr: () => dispatch(actionCreators.decreaseCounter()),
    addCtr: (number) => dispatch(actionCreators.addCounter(number)),
    subtractCtr: (number) => dispatch(actionCreators.subtractCounter(number)),
    onResetCtr: () => dispatch(actionCreators.resetCounter()),
    onSaveResult: (ctr) => dispatch(actionCreators.AsycnSaveResult(ctr)),
    onDeleteResult: (targetId) => dispatch(actionCreators.deleteResult(targetId))
  }
}

// Counter คือ component ที่เราจะเชื่อม แล้ว export Counter ไปให้ App
export default connect(mapStateToProps, mapDispatchToProps)(Counter);


// พอดึง store มาใส่ mapStateToProps ก็ connect เพื่อเอา state นั้นไปพาสเป็น props ให้ (Counter)