var quantizeImage = function(data, width, height) {
	//var data = ctx.getImageData(0,0, width, height).data;
	var attr = _liq_attr_create();
	var numBytes = data.length * data.BYTES_PER_ELEMENT;
	var ptr = Module._malloc(numBytes);
	var heapData = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
	heapData.set(new Uint8Array(data.buffer));

	var img = _liq_image_create_rgba(attr, ptr, width, height, 0);
	var result = _liq_quantize_image(attr, img);
	var resultPtr = Module._malloc(width*height);
	_liq_write_remapped_image(result, img, resultPtr, width*height);
	var palettePtr = _liq_get_palette(result);
	var paletteView = new DataView(Module.HEAPU8.buffer, palettePtr),
		resultView = new Uint8Array(Module.HEAPU8.buffer, resultPtr, width*height);

	var colorCount = paletteView.getUint32(0, true);

	var palette = new Uint8Array(colorCount * 3),
		alphaPalette = new Uint8Array(colorCount),
		pixelArray = new Uint8Array(resultView);

	for (var i = 0; i < colorCount; i++) {
		
		var newIdx = i * 3,
			oldIdx = 4 + (i * 4);

		palette[newIdx] = paletteView.getUint8(oldIdx);
		palette[newIdx + 1]  = paletteView.getUint8(oldIdx + 1);
		palette[newIdx + 2] = paletteView.getUint8(oldIdx + 2);
		alphaPalette[i] = paletteView.getUint8(oldIdx + 3);
	}

	var imageInfo = {
		PLTE: palette,
    	tRNS: alphaPalette,
    	IDAT: pixelArray
    }
    var options = {
    	width: width,
    	height: height,
    	colourType: CanvasTool.PngEncoder.ColourType.INDEXED_COLOR,

    };
    var encoder = new CanvasTool.PngEncoder(imageInfo, options);
    var data = encoder.convertToArray();
    //var data = new Uint8Array(array.length);
    //data.set(array);

    //var blob = new Blob([data.buffer]);

    _liq_attr_destroy(attr);
    _liq_image_destroy(img);
    _liq_result_destroy(result);
    Module._free(ptr);
    Module._free(resultPtr);

    return data;//blob;
}
