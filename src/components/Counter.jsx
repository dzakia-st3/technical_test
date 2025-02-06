import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAsync } from '../store/slice/counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const loading = useSelector((state) => state.counter.loading)
  const dispatch = useDispatch()

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Vite + Redux + Saga</h1>
      <div style={{ fontSize: '24px', margin: '20px' }}>
        Count: {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button 
          onClick={() => dispatch(incrementAsync())}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Increment Async'}
        </button>
      </div>
    </div>
  )
}

export default Counter
