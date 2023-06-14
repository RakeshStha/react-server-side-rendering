export const reduxStore = () => {
    let initState = {}
    return initState
}

export const updateReduxStore = (store) => {
    localStorage.setItem('ReduxState', JSON.stringify(store.getState()))
}
