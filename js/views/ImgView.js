let view = (() => {
	const DOMstrings = {
		imgsDiv: document.getElementById("Images"),
		ctrlPanel: document.getElementById("CtrlPanel"),
		
		imgContainer: document.querySelector("img-container"),

		imgAttr: document.getElementById("ImgAttr"),
		imgSrc: document.getElementById("ImageSrc"),
		imgPreview: document.getElementById("ImagePreview"),
		imgTitle: document.getElementById("ImageTitle"),
		imgDesc: document.getElementById("ImageDescription"),
		addImgBtn: document.getElementById("AddImgBtn"),

		imgList: document.getElementById("ImgsList"),

		paginations: document.querySelectorAll('div.pagination')
	}

	class ImgView {
		constructor() {
			this.imageSrc = "";
			this.imageItemName = "";
			this.imageItemSize = "";
			this.imageItemType = "";

			this.editValues = {
				imgItemName: "",
				imgItemSize: "",
				imgItemType: "",
				imgSrc: "",
				imgTitle: "",
				imgDesc: ""
			};
			
			DOMstrings.imgSrc.addEventListener("change", $event => this.preview($event));
		}

		addImage(img) {
			let html = `
				<div id="img-${img.id}" class="card">
					<div class="card__img">
						<img id="img-main-${img.id}" src="${img.src}">
					</div>

					<div class="card__body">
						<div class="card_attributes-desc">
							<input id="img-src-${img.id}" type="file" accept=".png, .jpg, .jpeg" hidden="">

							<div class="card-body__title">
								<span id="img-span-title-${img.id}">${img.title}</span>
								<input id="img-input-title-${img.id}" type="text" value="${img.title}" hidden="">
							</div>

							<div class="card-body__description">
								<span id="img-span-desc-${img.id}">${img.description}</span>
								<textarea id="img-input-desc-${img.id}" hidden="">${img.description}</textarea>
							</div>
						</div>

						<div class="body-btns-group">
							<div id="btns-edit-${img.id}" hidden="" class="card-body__edit-btn-group">
								<button id="btnGuardar-${img.id}" class="btn-guardar">Guardar</button>
								<button id="btnCancelar-${img.id}" class="btn-cancelar">Cancelar</button>
							</div>

							<div id="btns-edit-delete-${img.id}" class="card-body__option-btn-group">
								<button id="btnEditImg-${img.id}" class="btn-editar">Edit</button>
								<button id="btnDelImg-${img.id}" class="btn-eliminar">Delete</button>					
							</div>
						</div>

					</div>
					
				</div>
			`;
			DOMstrings.imgsDiv.insertAdjacentHTML("beforeend", html);

			this.addImgSrcFileListener(img.id);
		}

		addImgSrcFileListener(idNro) {
			let imgSrcEdit = document.getElementById(`img-src-${idNro}`);
			imgSrcEdit.addEventListener("change", $event => {

				let self = this;

				function readURL(file) {
					return new Promise((res, rej) => {
					    const reader = new FileReader();
					    reader.onload = e => res(e.target.result);
					    reader.onerror = e => rej(e);
					    self.editValues.imgItemName = file.name;
						self.editValues.imgItemSize = file.size;
						self.editValues.imgItemType = file.type;
					    reader.readAsDataURL(file);
					});
				};

				(async (event) => {
					const file = event.target.files[0];
					const url = await readURL(file);
					self.editValues.imgSrc = url;
				})($event);
			});
		}

		addImageItem(imgItem) {
			let html = `
				<li id="imgLsItem-${imgItem.id}">
					<div class="img-name">
						<span id="img-item-title-${imgItem.id}">
						img-${imgItem.id}: ${imgItem.title}
						</span>
						<span id="img-item-attrs-${imgItem.id}">
							${imgItem.name} ${imgItem.size} ${imgItem.type}
						</span>
					</div>

					<div class="list-item-btn-group">
						<div id="img-item-btns-${imgItem.id}" class="list-btn-group">
							<button id="btnEditImgItem-${imgItem.id}" class="btn btn-editar">Edit</button>
							<button id="btnDelImgItem-${imgItem.id}" class="btn btn-eliminar">Delete</button>
						</div>

						<div id="img-item-save-del-${imgItem.id}" hidden="" class="list-btn-group">
							<button id="btnImgItemGuardar-${imgItem.id}" class="btn btn-guardar">Guardar</button>
							<button id="btnImgItemCancelar-${imgItem.id}" class="btn btn-cancelar">Cancelar</button>
						</div>
					</div>

				</li>
			`;
			DOMstrings.imgList.insertAdjacentHTML("beforeend", html);
		}

		getDeleteBtns(idNro) {
			let delBtnImg = document.getElementById(`btnDelImg-${idNro}`);
			let delBtnImgItem = document.getElementById(`btnDelImgItem-${idNro}`);
			return [delBtnImg, delBtnImgItem];
		}

		deleteImage(idNro) {
			let img = document.getElementById(`img-${idNro}`);
			img.parentNode.removeChild(img);
		}

		deleteImgItem(idNro) {
			let imgItem = document.getElementById(`imgLsItem-${idNro}`);
			imgItem.parentNode.removeChild(imgItem);
		}

		updateImage(idNro, newVals) {
			let imgSrc = document.getElementById(`img-main-${idNro}`);
			let imgSpanTitle = document.getElementById(`img-span-title-${idNro}`);
			let imgSpanDesc = document.getElementById(`img-span-desc-${idNro}`);

			imgSrc.src = newVals.imgSrc? newVals.imgSrc: imgSrc.src;
			imgSpanTitle.innerText = newVals.imgTitle;
			imgSpanDesc.innerText = newVals.imgDesc;

			this.showHideEditFields(idNro, false, false);
		}

		updateImageItem(idNro, newVals) {			
			let imgItemTitle = document.getElementById(`img-item-title-${idNro}`);
			let imgItemAtrrs = document.getElementById(`img-item-attrs-${idNro}`);

			imgItemTitle.innerText = `img-${idNro}: ${newVals.imgTitle}`;

			if(newVals.imgItemName && newVals.imgItemSize && newVals.imgItemType) {
				imgItemAtrrs.innerText = `${newVals.imgItemName} ${newVals.imgItemSize} ${newVals.imgItemType}`;
			}
		}

		editImage(idNro) {
			this.showHideEditFields(idNro, true, false);
		}

		saveEdit(idNro) {
			this.showHideEditFields(idNro, true, true);
			
			let editVals = this.getEditValues();

			this.clearEditValues();

			return editVals;
		}

		cancelEdit(idNro) {
			this.showHideEditFields(idNro, false, false);
			this.clearEditValues();
		}

		showHideEditFields(idNro, show, save) {
			let imgSpanTitle = document.getElementById(`img-span-title-${idNro}`);
			let imgSpanDesc = document.getElementById(`img-span-desc-${idNro}`);
			let btnsEditDelete = document.getElementById(`btns-edit-delete-${idNro}`);

			let imgSrcFile = document.getElementById(`img-src-${idNro}`);
			let imgInputTitle = document.getElementById(`img-input-title-${idNro}`);
			let imgInputDesc = document.getElementById(`img-input-desc-${idNro}`);
			let btnsEdit = document.getElementById(`btns-edit-${idNro}`);

			let btnsEditItem = document.getElementById(`img-item-btns-${idNro}`);
			let btnsEditItemSaveCancel = document.getElementById(`img-item-save-del-${idNro}`);

			let cardBody = document.querySelector(`#img-${idNro} .card__body`);
			let itemBody = document.querySelector(`#imgLsItem-${idNro} .list-item-btn-group`);

			imgSrcFile.value = "";

			if(save) {
				this.editValues.imgTitle = imgInputTitle.value;
				this.editValues.imgDesc = imgInputDesc.value;

				imgSpanTitle.innerText = imgInputTitle.value;
				imgSpanDesc.innerText = imgInputDesc.innerHTML;
			} else {
				imgInputTitle.value = imgSpanTitle.innerText;
				imgInputDesc.innerHTML = imgSpanDesc.innerText;
				imgInputDesc.value = imgSpanDesc.innerText;
			}
			
			imgSpanTitle.hidden = show;
			imgSpanDesc.hidden = show;
			btnsEditDelete.hidden = show;
			btnsEditItem.hidden = show;
			
			btnsEditItem.style.display = show? 'none' :'flex';
			btnsEditDelete.style.display = show? 'none' :'flex';

			imgSrcFile.hidden = !show;
			imgInputTitle.hidden = !show;
			imgInputDesc.hidden = !show;
			btnsEdit.hidden = !show;
			btnsEditItemSaveCancel.hidden = !show;

			btnsEdit.style.display = !show? 'none' :'flex';
			btnsEditItemSaveCancel.style.display = !show? 'none' :'flex';

			cardBody.style.transform = show? 'scale(1)': '';
			itemBody.style.top = show? '0': '';
		}

		renderImages(imgs) {
			DOMstrings.imgsDiv.innerHTML = "";
			for(let img of imgs) {
				this.addImage(img);
			}
		}

		renderImgItems(imgItems) {
			DOMstrings.imgList.innerHTML = "";
			for(let imgItem of imgItems) {
				this.addImageItem(imgItem);
			}
		}

		renderPaginations(numPages) {
			let paginations = DOMstrings.paginations;

			paginations.forEach((pagination, index) => {
				pagination.innerHTML = "";
				for(let pageNum = 1; pageNum <= numPages; pageNum++) {
					let html = `<button id="page-${index}-${pageNum}">${pageNum}</button>`;
					pagination.insertAdjacentHTML('beforeend', html);
				}
			});
		}

		addPaginationBtnsListeners(callback) {
			DOMstrings.paginations.forEach(pagination => {
				let children = Array.from(pagination.children);
				children.forEach(
					child => child.addEventListener('click', () => callback(child.id.split('-')[2]))
				);
			});
		}

		addActiveClassToLink(pageNum) {
			DOMstrings.paginations.forEach(pagination => {
				let children = Array.from(pagination.children);
				children.forEach(child => {
					let childPageNum = Number(child.id.split('-')[2]);
					pageNum = Number(pageNum);

					child.classList.remove('active');

					if(childPageNum === pageNum) {
						child.classList.add('active');
					}					
				});
			});
		}
		
		clearValues() {
			this.imageSrc = "";
			DOMstrings.imgSrc.value = "";
			DOMstrings.imgPreview.src = "";
			DOMstrings.imgTitle.value = "";
			DOMstrings.imgDesc.value = "";
		}

		addAgregarBtnListener(callback) {
			DOMstrings.addImgBtn.addEventListener("click", () => callback());
		}

		addDeleteBtnsListeners(idNro, callback) {
			let delBtnImg = document.getElementById(`btnDelImg-${idNro}`);
			let delBtnImgItem = document.getElementById(`btnDelImgItem-${idNro}`);

			delBtnImg.addEventListener("click", () => callback(idNro));
			delBtnImgItem.addEventListener("click", () => callback(idNro));
		}

		addEditBtnsListeners(idNro, callback) {
			let editBtnImg = document.getElementById(`btnEditImg-${idNro}`);
			let editBtnImgItem = document.getElementById(`btnEditImgItem-${idNro}`);

			editBtnImg.addEventListener("click", () => callback(idNro));
			editBtnImgItem.addEventListener("click", () => callback(idNro));
		}

		addGuardarBtnListener(idNro, callback) {
			let guardarBtn = document.getElementById(`btnGuardar-${idNro}`);
			let guardarBtnItem = document.getElementById(`btnImgItemGuardar-${idNro}`);

			guardarBtn.addEventListener("click", () => callback(idNro));
			guardarBtnItem.addEventListener("click", () => callback(idNro));
		}

		addCancelarBtnListener(idNro, callback) {
			let cancelBtn = document.getElementById(`btnCancelar-${idNro}`);
			let cancelBtnItem = document.getElementById(`btnImgItemCancelar-${idNro}`);

			cancelBtn.addEventListener("click", () => callback(idNro));
			cancelBtnItem.addEventListener("click", () => callback(idNro));
		}

		getEditValues() {
			return this.editValues;
		}

		clearEditValues() {
			this.editValues = {
				imgItemName: "",
				imgItemSize: "",
				imgItemType: "",
				imgSrc: "",
				imgTitle: "",
				imgDesc: ""
			};
		}

		getInput() {
			return {
				src: this.imageSrc,
				title: DOMstrings.imgTitle.value,
				desc: DOMstrings.imgDesc.value,
				name: this.imageItemName,
				size: this.imageItemSize,
				type: this.imageItemType
			};
		}

		readURL(file) {
			return new Promise((res, rej) => {
			    const reader = new FileReader();
			    reader.onload = e => res(e.target.result);
			    reader.onerror = e => rej(e);
			    this.imageItemName = file.name;
				this.imageItemSize = file.size;
				this.imageItemType = file.type;
			    reader.readAsDataURL(file);
			});
		};

		async preview(event) {
			const file = event.target.files[0];
			const url = await this.readURL(file);
			DOMstrings.imgPreview.src = url;
			this.imageSrc = url;
		};
	}

	return new ImgView();
})();
