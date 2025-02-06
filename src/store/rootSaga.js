import { all, call, put, takeLatest } from 'redux-saga/effects';

export const fetchUsersRequest = () => ({ type: 'FETCH_USERS_REQUEST' });
export const fetchUsersSuccess = (users) => ({ type: 'FETCH_USERS_SUCCESS', payload: users });
export const fetchUsersFailure = (error) => ({ type: 'FETCH_USERS_FAILURE', payload: error });

// Fungsi untuk mengambil data dari API
function fetchUsersApi() {
  return fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json()
  );
}

// Worker Saga: Meng-handle request data
function* fetchUsersSaga() {
  try {
    const users = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users)); // Dispatch success action
  } catch (error) {
    yield put(fetchUsersFailure(error.message)); // Dispatch failure action
  }
}

// Watcher Saga: Mendeteksi action `fetchUsersRequest`
function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([watchFetchUsers()]);
}
