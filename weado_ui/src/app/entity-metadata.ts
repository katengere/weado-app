import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { getRouterSelectors } from '@ngrx/router-store';
import { Activity } from './Classes-Interfaces/activity';
import { Image } from './Classes-Interfaces/image';
import { Message } from './Classes-Interfaces/message';
import { Project } from './Classes-Interfaces/project';
import { Report } from './Classes-Interfaces/report';
import { User } from './Classes-Interfaces/user';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (users: User) => users.phoneNo
  },
  Activity: {
    selectId: (activity: Activity) => activity._id
  },
  Report: {
    selectId: (report: Report) => report._id
  },
  Image: {
    selectId: (image: Image) => image._id
  },
  Message: {
    selectId: (message: Message) => message._id
  },
  Project: {
    selectId: (projects: Project) => projects._id,
    filterFn: function (projects: Project[], search: string) {
      console.log('houses from filter function ', projects);
      return projects.filter(p => -1 < p._id.indexOf(search));
    }
  }
};

const pluralNames = {};

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
