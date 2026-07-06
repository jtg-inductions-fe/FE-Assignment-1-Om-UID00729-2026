import {
    MILLISECONDS_IN_DAY,
    MILLISECONDS_IN_HOURS,
    MILLISECONDS_IN_MINUTE,
    MILLISECONDS_IN_SECOND,
} from './constants.js';

export default function returnRemainingTime(expiryDate) {
    const currDate = Date.now();
    const timeRemaining = expiryDate - currDate;

    switch (true) {
        case timeRemaining <= 0:
            return null;
        case timeRemaining < MILLISECONDS_IN_MINUTE:
            return `${Math.round(timeRemaining / MILLISECONDS_IN_SECOND)}s`;
        case timeRemaining < MILLISECONDS_IN_HOURS:
            return `${Math.round(timeRemaining / MILLISECONDS_IN_MINUTE)}min`;
        case timeRemaining < MILLISECONDS_IN_DAY:
            return `${Math.round(timeRemaining / MILLISECONDS_IN_HOURS)}hrs`;
        default:
            return `${Math.round(timeRemaining / MILLISECONDS_IN_DAY)}d`;
    }
}
