

export class User {
  id: number;
  username: string;
  password: string;
  custId: number;
  email: string;
  name: string;
  title: string;
  gender: string;
  phone: string;
  addressline: string;
  city: string;
  userType: number;
  access_token: string;
  customer: any;

  constructor(id, data) {
    this.id = id;
    this.custId = data.custId ? data.custId : null;
    this.username = data.username ? data.username : '';
    this.email = data.email ? data.email : '';
    this.name = data.name ? data.name : '';
    this.gender = data.gender ? data.gender : '';
    this.phone = data.phone ? data.phone : '';
    
  }

  public getId(): number {
    return this.id;
  }

  public getCustId(): number {
    return this.custId;
  }

  public getUsername(): string {
    return this.username;
  }

}

