import { Activity } from "./activity";

export interface Project {
  author: string[];
  title: string;
  fileDoc: any;
  summary: string;
  reportsId: any;
  images: any;
  date: Date;
  activities: Activity[];
  _id: string
}
