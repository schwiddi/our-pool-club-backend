import { schema } from 'normalizr';

export const organization = new schema.Entity('organizations', {
}, { idAttribute: 'name' });
export { organization as default };
