let model = (() => {
	let imgs = [];
	let imgItems = [];
	let idCount = 1;

	class ImgModel {
		constructor() { this.imgsPerPage = 20; }

		nextId() { return idCount++; }

		getImages() { return imgs; }

		getImageItems() { return imgItems; }

		getImage(id) { return imgs.find(img => img.id === id); }

		addImage(img) { imgs.push(img); }

		addImageItem(imgItem) { imgItems.push(imgItem); }

		deleteImage(idNro) { imgs = imgs.filter(img => img.id !== idNro); }

		deleteImgItem(idNro) { imgItems = imgItems.filter(imgItem => imgItem.id !== idNro); }

		updateImage(idNro, newVals) {
			let image = imgs.find(img => img.id === idNro);
			
			image.src =  newVals.imgSrc? newVals.imgSrc: image.src;
			image.title = newVals.imgTitle;
			image.description = newVals.imgDesc;
		}

		updateImageItem(idNro, newVals) {
			let imageItem = imgItems.find(item => item.id === idNro);

			imageItem.src =  newVals.imgSrc? newVals.imgSrc: imageItem.src;
			imageItem.title = newVals.imgTitle;
			imageItem.description = newVals.imgDesc;
			imageItem.name = newVals.imgItemName? newVals.imgItemName: imageItem.name;
			imageItem.size = newVals.imgItemSize? newVals.imgItemSize: imageItem.size;
			imageItem.type = newVals.imgItemType? newVals.imgItemType: imageItem.type;
		}

		getImagesPage(pageNum) {
			let start = (pageNum - 1) * this.imgsPerPage;
			let end = start + this.imgsPerPage;

			let imgsCopy = imgs.slice().reverse();
			let imgItemsCopy = imgItems.slice().reverse();

			let subImgs = imgsCopy.slice(start, end);
			let subImgItems = imgItemsCopy.slice(start, end);

			return {
				imgs: subImgs,
				imgItems: subImgItems
			};
		}

		getTotalPages() {
			let total = Math.floor(imgs.length / this.imgsPerPage);
			let remainder = imgs.length % this.imgsPerPage;
			
			if(remainder > 0) total += 1;

			return total;
		}
	}

	return new ImgModel();
})();
