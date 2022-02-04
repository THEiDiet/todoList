 const theme = {
    light: {
        color: '#2E2727',
        bgColor: '#E6E7E9',
        bgElems: '#EAEAEB',
        bgElemsDark:'#E4E5E7',
        activeColor: '#C5C0E0',
        formColor:'#EAEAEB',
        // colors:['#CDBBE4','#BEC2E3','#DAB2D6','#B0D5C8','#B6D9DE',],
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
        bgElemsDark:'#18181A',
        activeColor: '#4A5B68',
        formColor:'#6A7995',
        // colors: ['#574171', '#3E4474', '#71416C','#3B5F52', '#416372',]
        colors: {
            violet: '#574171',
            blue: '#3E4474',
            red: '#71416C',
            green: '#3B5F52',
            aqua: '#416372',
        }as const
    }
}

 export default theme
// type themeType = {
//         color: string
//         bgColor: string
//         bgElems: string
//         activeColor: string
//         formColor:string
//         colors: {
//             violet: '#CDBBE4',
//             blue: '#BEC2E3',
//             red: '#DAB2D6',
//             green: '#B0D5C8',
//             aqua: '#B6D9DE',
//         }
//     }


// const colors= {
//     violet: '#CDBBE4',
//     blue: '#BEC2E3',
//     red: '#DAB2D6',
//     green: '#B0D5C8',
//     aqua: '#B6D9DE',
// } as const

//const KeyToVal = {
//     MyKey1: 'myValue1',
//     MyKey2: 'myValue2',
// } as const;
//
// type Keys = keyof typeof KeyToVal;
// type Values = typeof KeyToVal[Keys]; //  "myValue1" | "myValue2"
// type colorsKeyType = 'violet' | 'blue'| 'red'| 'green' | 'aqua'
// type colorsType = {[key:colorsKeyType]:string}
//$bg-color:#E6E7E9;
// $color:#2E2727;
// $bg-elem-color:#EAEAEB;
// $b-rad:0.25rem;
//
// $active-color:#C5C0E0;
//
// $violet:#CDBBE4;
// $red:#DAB2D6;
// $blue:#BEC2E3;
// $green:#B0D5C8;
// $aqua:#B6D9DE;
// $shadow:0 0 10px rgba(0, 0, 0, 0.15);
// @mixin shadow($percent){
//     box-shadow: 0 0 10px rgba(0, 0, 0, $percent);
// }