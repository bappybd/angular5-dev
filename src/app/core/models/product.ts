export class Product {

    // fields
    public id: number;
    public title: string;
    public desc: string;
    public sku: string;
    public price: string;
    public image: string;

    constructor(data){
        this.id = data._id ? data._id : null;
        this.title = data.title ? data.title : null;
        this.desc = data.desc ? data.desc : null;
        this.sku = data.sku ? data.sku : null;
        this.price = data.price ? data.price : null;
        this.image = data.image ? data.image : null;
    }
}