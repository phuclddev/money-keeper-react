export function FETCH_USER_REQUEST(state, action) {
  return {
    ...state,
  }
}

export function FETCH_USER_SUCCESS(state, action) {
  const payload = action.payload;
  return {
    ...state,
    user: payload?.user,
  }
}

export function FETCH_USER_ERROR(state, action) {
  const payload = action.payload;
  return {
    ...state,
    error: payload?.error,
  }
}

export function GET_ACCOUNT_SUCCESS(state, action) {
  const payload = action.payload;
  return {
    ...state,
    account_info: payload?.accounts_read,
  }
}

export function DELETE_ACCOUNT_SUCCESS(state, action) {
  const payload = action.payload;
  return {
    ...state,
    account_delete_status: payload?.status,
  }
}
