const colorInputOne = document.getElementById('color1');
const colorInputTwo = document.getElementById('color2');
const paletteCount = document.getElementById('count');
const paletteContainer = document.getElementById('palette');

[colorInputOne, colorInputTwo, paletteCount].forEach(input => {
	input.addEventListener('change', () => {
		generatePalette(
			colorInputOne.value,
			colorInputTwo.value,
			paletteCount.value
		);
	});
});

function generatePalette(color1, color2, count) {
	// remove child nodes
	paletteContainer.innerHTML = '';

	// get array of colors from chroma
	const colorPalette = chroma.scale([color1, color2]).mode('lch').colors(count);

	colorPalette.forEach(palette => {
        const paletteItem = document.createElement('div');
        const paletteName = document.createElement('span');

		paletteItem.classList.add('palette-item');
		paletteItem.style.background = palette;
        paletteContainer.appendChild(paletteItem);
        
        paletteName.innerHTML = palette;
        paletteName.classList.add('palette-name');
        paletteName.style.color = chroma.contrast(palette, chroma(palette).darken(3)) > 4.5 ? chroma(palette).darken(3) : chroma(palette).brighten(3);

        paletteItem.appendChild(paletteName);
	});
}

generatePalette(colorInputOne.value, colorInputTwo.value, paletteCount.value);
