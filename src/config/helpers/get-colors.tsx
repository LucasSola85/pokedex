

export const getColorsFromImage =  () => {
        // definir colores claros aleatorio
        const colors = [
            "#FF6633", "#FFB399", "#FF33FF", "#00B3E6",
            "#E6B333", "#3366E6", "#999966", "#B34D4D",
            "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
            "#FF99E6", "#FF1A66", "#E6331A",
            "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC",
            "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399",
            "#E666B3", "#33991A", "#CC9999", "#B3B31A"
        ]


        // seleccionar un color aleatorio
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;


}