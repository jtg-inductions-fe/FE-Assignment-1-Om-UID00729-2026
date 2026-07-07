import {
    MILLISECONDS_PER_DAY,
    MILLISECONDS_PER_HOURS,
    MILLISECONDS_PER_MINUTE,
    MILLISECONDS_PER_SECOND,
} from './constants.js';

export default function getFormattedRelativeTime(
    targetTime,
    referenceTime = Date.now(),
) {
    const timeRemaining = targetTime - referenceTime;

    switch (true) {
        case timeRemaining <= 0:
            return null;
        case timeRemaining < MILLISECONDS_PER_MINUTE:
            return `${Math.round(timeRemaining / MILLISECONDS_PER_SECOND)}s`;
        case timeRemaining < MILLISECONDS_PER_HOURS:
            return `${Math.round(timeRemaining / MILLISECONDS_PER_MINUTE)}min`;
        case timeRemaining < MILLISECONDS_PER_DAY:
            return `${Math.round(timeRemaining / MILLISECONDS_PER_HOURS)}hrs`;
        default:
            return `${Math.round(timeRemaining / MILLISECONDS_PER_DAY)}d`;
    }
}
