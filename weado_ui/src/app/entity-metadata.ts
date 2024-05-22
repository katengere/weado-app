import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { Project } from './Classes-Interfaces/project';
import { User } from './Classes-Interfaces/user';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (users: User) => users.phoneNo
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

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
