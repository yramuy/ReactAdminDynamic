import { combineReducers } from "redux";

const initialState = {
    level1Id: "",
    level2Id: "",
    level3Id: "",
    itemDetails: "",
    message: ""
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

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    menuDetails: MenuReducer
});

export default rootReducer;