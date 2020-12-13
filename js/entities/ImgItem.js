class ImgItem extends Img{
	constructor(id, src, title, description, name, size, type) {
		super(id, src, title, description);
		this.name = name;
		this.size = size;
		this.type = type;
	}
}