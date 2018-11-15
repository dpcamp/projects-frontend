export class Invoice {
    constructor(
    public id?: string,
    public inv_num?: string,
    public inv_name?: string,
    public inv_date?: string,
    public net_amount?: number,
    public appr_amount?: number,
    public is_paid?: boolean,
    public is_change_order?: boolean,
    public inv_desc?: string,
    public line_num?: number,
    public line_name?: string,
    public amount?: number,
    public description?: string,
    public comment?: string,
    public proj_id?: string,
    public created_by?: string,
    public updated_by?: string
    ) {}
  }
