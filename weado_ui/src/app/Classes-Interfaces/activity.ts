import { Report } from "./report";

export interface Budget {
  item: string;
  cost: number;
  quantity: number;
  total: string;
}

export interface Activity {
  title: string;
  description: string;
  budget: Budget[];
  activityReport: Report;
  projectId: string;
  images: any;
  createdOn: Date;
  modifiedOn: Date;
  _id: string
}