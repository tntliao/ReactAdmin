import { INCERMENT, DELCERMENT } from './action-types';

// 加
export const increment = number => ({ type: INCERMENT, data: number });
// 减
export const delcrement = number => ({ type: DELCERMENT, data: number });