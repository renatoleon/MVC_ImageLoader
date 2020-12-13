let ctrl = (() => {
	class ImgController {
		constructor(imgModel, imgView) {
			this.imgModel = imgModel;
			this.imgView = imgView;
		}

		addImage() {
			let {src, title, desc, name, size, type} = this.imgView.getInput();

			if(src && title && desc) {
				let id = this.imgModel.nextId();
				let img = new Img(id, src, title, desc);
				let imgItem = new ImgItem(id, src, title, desc, name, size, type);

				this.imgModel.addImage(img);
				this.imgModel.addImageItem(imgItem);

				// this.imgView.addImage(img);
				// this.imgView.addImageItem(imgItem);
				this.imgView.clearValues();
				// .bind(this) is the function callback with "ImgController" as context for "this"
				// this.imgView.addDeleteBtnsListeners(id, this.deleteImage.bind(this));
				// this.imgView.addEditBtnsListeners(id, this.editImage.bind(this));
				// this.imgView.addGuardarBtnListener(id, this.saveEdit.bind(this));
				// this.imgView.addCancelarBtnListener(id, this.cancelEdit.bind(this));

				this.renderFirstPage();
			} else {
				alert("Ingrese todos los atributos de la imagen");
			}
		}

		deleteImage(idNro) {
			this.imgModel.deleteImage(idNro);
			this.imgModel.deleteImgItem(idNro);

			// this.imgView.deleteImage(idNro);
			// this.imgView.deleteImgItem(idNro);

			this.renderFirstPage();
		}

		editImage(idNro) {
			this.imgView.editImage(idNro);
		}

		saveEdit(idNro) {
			//{ imgItemName, imgItemSize, imgItemType, imgSrc, imgTitle, imgDesc }
			let newVals = this.imgView.saveEdit(idNro);

			if(newVals.imgTitle && newVals.imgDesc) {
				this.imgModel.updateImage(idNro, newVals);
				this.imgModel.updateImageItem(idNro, newVals);

				this.imgView.updateImage(idNro, newVals);
				this.imgView.updateImageItem(idNro, newVals);
			} else {
				alert("Debe ingresar un Título y Descriptción para la imagen");
			}
		}

		cancelEdit(idNro) {
			this.imgView.cancelEdit(idNro);
		}

		renderImages(pageNum) {
			let {imgs, imgItems} = this.imgModel.getImagesPage(pageNum);

			this.imgView.renderImages(imgs);
			this.imgView.renderImgItems(imgItems);

			imgs.forEach(img => {
				this.imgView.addDeleteBtnsListeners(img.id, this.deleteImage.bind(this));
				this.imgView.addEditBtnsListeners(img.id, this.editImage.bind(this));
				this.imgView.addGuardarBtnListener(img.id, this.saveEdit.bind(this));
				this.imgView.addCancelarBtnListener(img.id, this.cancelEdit.bind(this));				
			});

			this.imgView.addActiveClassToLink(pageNum);
		}

		renderPagination() {
			let totalPages = this.imgModel.getTotalPages();

			this.imgView.renderPaginations(totalPages);
			this.imgView.addPaginationBtnsListeners(this.renderImages.bind(this));
		}

		renderFirstPage() {
			this.renderImages(1);
			this.renderPagination();
			this.imgView.addActiveClassToLink(1);
		}

		loadInitialData(srcs) {
			for(let src of srcs) {
				// src, title, desc, name, size, type
				let {title, desc} = src;
				let [size, type] = ["1000", "image/jpeg"];

				let id = this.imgModel.nextId();
				let img = new Img(id, `./imgs/${title}.jpg`, title, desc);
				let imgItem = new ImgItem(id, `./imgs/${title}.jpg`, title, desc, title, size, type);

				this.imgModel.addImage(img);
				this.imgModel.addImageItem(imgItem);

				// this.imgView.addImage(img);
				// this.imgView.addImageItem(imgItem);
				// this.imgView.clearValues();
				
				// this.imgView.addDeleteBtnsListeners(id, this.deleteImage.bind(this));
				// this.imgView.addEditBtnsListeners(id, this.editImage.bind(this));
				// this.imgView.addGuardarBtnListener(id, this.saveEdit.bind(this));
				// this.imgView.addCancelarBtnListener(id, this.cancelEdit.bind(this));
			}
		}

		init() {
			// .bind(this) is the function callback with "ImgController" as context for "this"
			this.imgView.addAgregarBtnListener(this.addImage.bind(this)); 
			this.imgView.clearValues();
		}
	}

	return new ImgController(model, view);	
})();