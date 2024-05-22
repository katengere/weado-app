export interface Report {
  _id: string;
  title: string;
  author: string;
  summary: string;
  projectId: string;
  rFile: any;
  createdOn: Date;
  modifiedOn: Date;
}
