import React, { useEffect } from 'react';
import Loader from '@src/components/Loader';
import { population } from '@src/common/population';
import Map from './Map';

const activeColor = [
  '#423D46',
  '#4D414B',
  '#52414B',
  '#59353f',
  '#633842',
  '#7a2d37',
  '#9c2630',
  '#bd1e28',
  '#de1621',
  '#ff0000',
];
const recoveredColor = ['#639178', '#6AAD7E', '#3FBF66'];
// const activePercent = [0, 0.01, 0.1, 1, 5, 10, 25, 50, 75, 100, 200]; // deaths
const activePercent = [0, 5, 10, 20, 40, 60, 80, 100, 500, 900];
const recoveredPercent = [55, 70, 85];

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
      if (countryData && population[countryData.iso2]?.population) {
        const countryPercent = (countryData.active * 1000000) / population[countryData.iso2]?.population;
        const countryRecPercent = (countryData.recovered * 100) / (countryData.confirmed - countryData.deaths);
        const description = `<span>${countryData.name}<br />${countryData.active} active, ${countryPercent.toFixed(
          0
        )} per million / ${countryData.deaths} deaths / ${countryData.recovered} recovered / ${
          countryData.confirmed
        } confirmed</span>`;
        let countryColor;
        for (let i = 1; i < activePercent.length; i++) {
          if (countryPercent > activePercent[i - 1] && countryPercent <= activePercent[i]) {
            countryColor = activeColor[i - 1];
          }
        }
        if (countryPercent >= activePercent[activePercent.length - 1])
          countryColor = activeColor[activeColor.length - 1];

        el.innerHTML = description;

        for (let i = 1; i < recoveredPercent.length; i++) {
          if (countryRecPercent > recoveredPercent[i - 1] && countryRecPercent <= recoveredPercent[i]) {
            countryColor = recoveredColor[i - 1];
          }
        }
        if (countryRecPercent >= recoveredPercent[recoveredPercent.length - 1]) {
          countryColor = recoveredColor[recoveredColor.length - 1];
        }
        if (selected === countryData.iso2) {
          countryColor = '#FF9966';
          el.setAttribute('data-active', 'active');
        } else {
          el.setAttribute('data-active', '');
        }
        // if (selected) {
        //   const tooltipXY = el.getBoundingClientRect();
        //   tooltip.innerHTML = description;
        //   tooltip.classList.add('active', 'fixed');
        //   tooltip.style.left = `${tooltipXY.left}px`;
        //   tooltip.style.top = `${tooltipXY.top}px`;
        // }
        countryColor ? el.setAttribute('fill', countryColor) : el.setAttribute('fill', '#383d46');
      } else {
        el.innerHTML = `<span>${el.getAttribute('title')}</span>`;
        el.setAttribute('fill', '#383d46');
      }
      el.setAttribute('stroke', '#21252b');
      el.setAttribute('stroke-opacity', '1');
      el.setAttribute('stroke-width', 0.5);
      el.setAttribute('transition', '0.5s');

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
