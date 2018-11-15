import {Invoice, Requisition} from './';
export class Job {
    constructor(
    public id?: string,
    public job_num?: string,
    public proj_id?: string,
    public job_title?: string,
    public job_desc?: string,
    public work_center?: number,
    public mutual?: string,
    public status?: string,
    public budget?: number,
    public fund?: string,
    public expenditure?: number,
    public bud_committed?: number,
    public bud_uncommitted?: number,
    public balance?: number,
    public has_budget?: boolean,
    public year?: number,
    public gl_num?: number,
    public gl_desc?: string,
    public uncommitted?: number,
    public expended?: number,
    public live_balance?: number,
    public created_by?: string,
    public updated_by?: string,
    public assigned_to?: string
    ) {}
  }
  export class Project {
    constructor(
    public budget: number,
    public live_committed: number,
    public live_uncommitted: number,
    public live_expended: number,
    public live_balance: number,
      public job: Job,
      public invoice: Invoice,
      public requisition: Requisition,
    ) {}
  }
