export default function app(state = {
    background: 'rgb(212, 212, 212);',
    logo: 'logo-light.png',
    menu: false
}, action) {

    switch(action.type) {

        case "SET_BACK_DARK":
            return{...state, background: action.dark}

        case "SET_BACK_LIGHT":
            return{...state, background: action.light}

        case "SET_LOGO_DARK":
            return{...state, logo: action.dark}

        case "SET_LOGO_LIGHT":
            return{...state, logo: action.light}

        case "SET_MENU_DARK":
            return{...state, menu: true}

        case "SET_MENU_LIGHT":
            return{...state, menu: false}
        default:
            return state
    }
}