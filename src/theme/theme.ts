const theme = {
    light: {
        color: '#2E2727',
        bgColor: '#E6E7E9',
        bgElems: '#EAEAEB',
        bgElemsDark: '#E4E5E7',
        activeColor: '#C5C0E0',
        formColor: '#EAEAEB',
        colors: {
            violet: '#CDBBE4',
            blue: '#BEC2E3',
            red: '#DAB2D6',
            green: '#B0D5C8',
            aqua: '#B6D9DE',
        }
    },
    dark: {
        color: '#e8e2e2',
        bgColor: '#1D1E22',
        bgElems: '#27262B',
        bgElemsDark: '#18181A',
        activeColor: '#4A5B68',
        formColor: '#6A7995',
        colors: {
            violet: '#574171',
            blue: '#3E4474',
            red: '#71416C',
            green: '#3B5F52',
            aqua: '#416372',
        } as const
    }
}

export default theme
