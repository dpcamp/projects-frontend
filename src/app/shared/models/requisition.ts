export class Requisition {
    constructor(
    public id?: string,
    public req_num?: string,
    public req_desc?: string,
    public po_num?: string,
    public proj_id?: string,
    public change_order?: string,
    public co?: string,
    public line_num?: number,
    public gl_code?: number,
    public line_name?: string,
    public name?: string,
    public amount?: number,
    public budget_year?: number,
    public description?: string,
    public location?: string
    ) {}
  }
