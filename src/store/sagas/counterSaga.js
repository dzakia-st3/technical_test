import { put, takeEvery, delay } from 'redux-saga/effects';
import { 
  incrementAsync, 
  incrementAsyncSuccess, 
  incrementAsyncFailure 
} from '../slices/counterSlice';

function* handleIncrementAsync() {
  try {
    yield delay(1000);
    yield put(incrementAsyncSuccess());
  } catch (error) {
    yield put(incrementAsyncFailure(error.message));
  }
}
export function* counterSaga() {
  yield takeEvery(incrementAsync.type, handleIncrementAsync);
}
