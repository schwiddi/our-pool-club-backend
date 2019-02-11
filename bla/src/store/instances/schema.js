import { schema } from 'normalizr';

// schema for active profiles
export const instance = new schema.Entity('instances');
export const activeProfile = new schema.Entity('profiles', {
  instances: [instance],
}, { idAttribute: 'id' });


// schema for dependencies
export const dependency = new schema.Entity('dependencies', {
}, { idAttribute: 'source' });
