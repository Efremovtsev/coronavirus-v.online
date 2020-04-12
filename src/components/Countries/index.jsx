import React, { useEffect } from 'react';
import Loader from '@src/components/Loader';
import Map from './Map';

// const activePercent = [0, 0.01, 0.1, 1, 5, 10, 25, 50, 75, 100, 200]; // deaths
// const activePercent = [0, 5, 10, 20, 40, 60, 80, 100, 500, 900];
// const recoveredPercent = [55, 70, 85];

function Countries({
  allData: { confirmed: confirmedAll, recovered: recoveredAll, deaths: deathsAll, active: activeAll },
  data,
  handleClick,
  selected,
  isFetching,
}) {
  useEffect(() => {
    const tooltip = document.querySelector('#tooltip');
    const mapSvgCountries = document.querySelectorAll('.map svg path');
    mapSvgCountries.forEach((el) => {
      const countryData = data?.find((d) => d.iso2 === el.getAttribute('id'));
      if (countryData?.population) {
        const { activeDescription, countryColor } = countryData;

        selected === countryData.iso2 ? el.setAttribute('data-active', 'active') : el.setAttribute('data-active', '');
        el.setAttribute('data-color', countryColor);
        el.innerHTML = activeDescription;
      } else {
        el.innerHTML = `<span>${el.getAttribute('title')}</span>`;
      }

      el.addEventListener('mouseover', (e) => {
        tooltip.innerHTML = el.querySelector('span').innerHTML;
        tooltip.classList.add('active');
        // tooltip.style.left = `${e.clientX}px`;
        // tooltip.style.top = `${e.clientY}px`;
      });
      el.addEventListener('mousemove', (e) => {
        if (!tooltip.classList.contains('fixed')) {
          tooltip.style.left = `${e.clientX}px`;
          tooltip.style.top = `${e.clientY}px`;
        }
      });
      el.addEventListener('mouseout', (e) => {
        if (!tooltip.classList.contains('fixed')) {
          tooltip.innerHTML = '';
          tooltip.classList.remove('active');
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, selected]);

  useEffect(() => {
    const mapSvgCountries = document.querySelectorAll('.map svg path');
    mapSvgCountries.forEach((el) => {
      el.addEventListener('click', (e) => {
        const countryData = data?.find((d) => d.iso2 === el.getAttribute('id'));
        countryData?.iso2 && handleClick(e, countryData.iso2);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <section className="map" id="map">
      <div id="tooltip"></div>
      {isFetching ? <Loader /> : <Map />}
    </section>
  );
}

export default Countries;
