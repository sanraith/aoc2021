import React from 'react';

const clocks = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];

export function Timer({ valueMs }: { valueMs: number | null; }): JSX.Element {
    const hasValue = valueMs !== null;
    const icon = hasValue ? clocks[Math.floor((valueMs % 1000) / 1000 * 12)] : clocks[0];
    return (<React.Fragment>{hasValue ? `${valueMs} ms ${icon}` : ''}</React.Fragment>);
}