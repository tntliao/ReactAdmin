import { INCERMENT, DELCERMENT } from './action-types';

// 加
export const increment = number => ({ type: INCERMENT, data: number });
// 减
export const delcrement = number => ({ type: DELCERMENT, data: number });
// 异步加
export const incrementAsync = number => {
    return dispacth => {
        setTimeout(() => {
            dispacth(increment(number))
        }, 1000)
    }
}