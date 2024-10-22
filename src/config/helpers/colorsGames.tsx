


export const colorsGames = (color: string)=> {

    switch (color) {
        // llevamos el color a hexadecimal parecido al color del juego
        case 'red':
            return '#FF0000';
        case 'blue':
            return '#0000FF';
        case 'yellow':
            return '#FFFF00';
        case 'gold':
            return '#FFD700';
        case 'silver':
            return '#C0C0C0';
        case 'crystal':
            return '#00FFFF';
        case 'ruby':
            return '#FF0000';
        case 'sapphire':
            return '#0000FF';
        case 'emerald':
            return '#008000';
        case 'firered':
            return '#FF4500';
        case 'leafgreen':
            return '#228B22';
        case 'diamond':
            return '#B9F2FF';
        case 'pearl':
            return '#F0E68C';
        case 'platinum':
            return '#C0C0C0';
        case 'heartgold':
            return '#FFD700';
        case 'soulsilver':
            return '#C0C0C0';
        case 'black':
            return '#000000';
        case 'white':
            return '#FFFFFF';
        case 'black-2':
            return '#000000';
        case 'white-2':
            return '#FFFFFF';
        default:
            return '#FFFFFF';

    }


}