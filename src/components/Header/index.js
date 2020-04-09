import React from 'react';
import { formatNumber } from '@src/common/helpers';

function Header({ data: { confirmed: confirmedAll, recovered: recoveredAll, deaths: deathsAll, active: activeAll } }) {
  return (
    <header className="header">
      COVID-19 (2019-nCoV Wuhan coronavirus) outbreak map / Cases {formatNumber(confirmedAll)} / Deaths{' '}
      {formatNumber(deathsAll)} / Recovered {formatNumber(recoveredAll)}
    </header>
  );
}

export default Header;
