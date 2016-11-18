QUnit.test('image quantization', function(assert){
	var testImg = document.getElementById('test-img');
	var c = document.getElementById('c');

	c.width = testImg.naturalWidth;
	c.height = testImg.naturalHeight;

	var ctx = c.getContext('2d');

	ctx.drawImage(testImg, 0,0);
	var data = ctx.getImageData(0,0, c.width, c.height).data;

	var blob = new Blob([quantizeImage(data, c.width, c.height).buffer]);
	var url = window.URL.createObjectURL(blob);
    
    document.getElementById('ti').src = url;
});

// QUnit.test('image quantization1', function(assert){
// 	var testImg = document.getElementById('test-img');
// 	var c = document.getElementById('c');

// 	c.width = testImg.naturalWidth;
// 	c.height = testImg.naturalHeight;

// 	var ctx = c.getContext('2d');

// 	ctx.drawImage(testImg, 0,0);
// 	var data = ctx.getImageData(0,0, c.width, c.height).data;

// 	var start = Date.now();
// 	quantizeImage(data, c.width, c.height);
// 	console.log(Date.now() - start);
// });