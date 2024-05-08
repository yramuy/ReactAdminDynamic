import { combineReducers } from "redux";

const initialState = {
    level1Id: "",
    level2Id: "",
    level3Id: "",
    itemDetails: "",
    message: "",
    snackbar: "",
    flag: false,
    badge: 0,
    checklist: {clauseNo: '', id: '', clauseId: ''}
};

function MenuReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "LEVEL1":
            return { ...state, level1Id: payload }

        case "LEVEL2":
            return { ...state, level2Id: payload }

        case "LEVEL3":
            return { ...state, level3Id: payload }

        case "ITEM":
            return { ...state, itemDetails: payload }

        case "DISPLAYMSG":
            return { ...state, message: payload }

        case "SNACKBAR":
            return { ...state, snackbar: payload }

        case "FLAG":
            return { ...state, flag: payload }

        case "BADGE":
            return { ...state, badge: payload }

        case "CHECKLIST":
            return { ...state, checklist: payload}

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    menuDetails: MenuReducer
});

export default rootReducer;