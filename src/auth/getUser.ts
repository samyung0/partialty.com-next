import { getSession } from './getSession';

export const getUser = () => getSession().then(({ user }) => user);
