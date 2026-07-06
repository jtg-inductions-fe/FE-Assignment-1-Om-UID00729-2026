import { MS_IN_DAY, MS_IN_HRS, MS_IN_MIN, MS_IN_S } from './constants.js';

export default function returnExpiryTime(expiryDate) {
    const currDate = Date.now();
    const timeRemaining = expiryDate - currDate;

    switch (true) {
        case timeRemaining <= 0:
            return 'Deal Expired';
        case timeRemaining < MS_IN_MIN:
            return `Expires in ${Math.round(timeRemaining / MS_IN_S)}s`;
        case timeRemaining < MS_IN_HRS:
            return `Expires in ${Math.round(timeRemaining / MS_IN_MIN)}min`;
        case timeRemaining < MS_IN_DAY:
            return `Expires in ${Math.round(timeRemaining / MS_IN_HRS)}hrs`;
        default:
            return `Expires in ${Math.round(timeRemaining / MS_IN_DAY)}d`;
    }
}
