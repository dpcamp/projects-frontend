export class AuthUser {
    constructor(
    public guid: string,
    public user_name: string,
    public is_authenticated: string,
    public is_admin: boolean,
    public timestamp: string

    ) {}
  }
  export class User {
    constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public title: string,
    public department: string,
    public user_name: string,
    public display_name: string,
    public extension: string,
    public length: string,
    public is_admin?: boolean
    ) {}
  }
