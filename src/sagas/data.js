import { takeEvery, call, put } from 'redux-saga/effects';
import {
  getData as getDataAction,
  // getDataFailed,
  getDataSuccess,
  setCountries as setCountriesAction,
  // getCountries as getCountriesAction,
  // setCountry as setCountryAction,
  // getCountry as getCountryAction,
  // getConfirmed as getConfirmedAction,
  getConfirmedSuccess,
  // getRecovered as getRecoveredAction,
  getRecoveredSuccess,
  getDeathsSuccess,
  getDailySuccess,
  setTableData,
} from '@src/reducers/data';
import { getAllData, getConfirmed, getRecovered, getCountries, getDeaths, getDaily } from '@src/api';
import { activeColors, recoveredColors } from '@src/common/helpers';
import { population } from '@src/common/population';

// const activePercent = [0, 0.01, 0.1, 1, 5, 10, 25, 50, 75, 100, 200]; // deaths
const activePercents = [0, 5, 10, 20, 40, 60, 80, 100, 500, 900];
const recoveredPercents = [55, 70, 85];

function* getDataHandler(action) {
  // try {
  const response = yield call(getAllData);

  // yield put(getCountriesAction());
  const responseCountries = yield call(getCountries);
  const cData = responseCountries.data.countries;
  yield put(setCountriesAction(cData));

  const responseConfirmed = yield call(getConfirmed);
  yield put(getConfirmedSuccess(responseConfirmed.data));

  const responseRecovered = yield call(getRecovered);
  yield put(getRecoveredSuccess(responseRecovered.data));

  const responseDeaths = yield call(getDeaths);
  yield put(getDeathsSuccess(responseDeaths.data));

  const responseDaily = yield call(getDaily);
  yield put(getDailySuccess(responseDaily.data));

  let countriesData = [];
  cData.forEach(({ name, iso2, iso3 }) => {
    const confirmedCountryData = responseConfirmed.data.filter((item) => item.iso2 === iso2);
    const recoveredCountryData = responseRecovered.data.filter((item) => item.iso2 === iso2);
    const deathsCountryData = responseDeaths.data.filter((item) => item.iso2 === iso2);

    const confirmed = confirmedCountryData.reduce((res, c) => res + c.confirmed, 0);
    const recovered = recoveredCountryData.reduce((res, c) => res + c.recovered, 0);
    const deaths = deathsCountryData.reduce((res, c) => res + c.deaths, 0);
    const active = confirmed - recovered - deaths;

    const activePerMillion = (active * 1000000) / population[iso2]?.population || null;
    const recoveredPercent = (recovered * 100) / (confirmed - deaths);
    const activeDescription = `<span>${name}<br />${active} active, ${activePerMillion?.toFixed(
      0
    )} per million / ${deaths} deaths / ${recovered} recovered / ${confirmed} confirmed</span>`;

    let countryColor = '0';
    for (let i = 1; i < activePercents.length; i++) {
      if (activePerMillion > activePercents[i - 1] && activePerMillion <= activePercents[i]) countryColor = i - 1;
    }
    if (activePerMillion >= activePercents[activePercents.length - 1]) countryColor = activeColors.length - 1;

    for (let i = 1; i < recoveredPercents.length; i++) {
      if (recoveredPercent > recoveredPercents[i - 1] && recoveredPercent <= recoveredPercents[i])
        countryColor = i - 1 + 10;
    }
    if (recoveredPercent >= recoveredPercents[recoveredPercents.length - 1])
      countryColor = recoveredColors.length - 1 + 10;

    iso2 &&
      countriesData.push({
        id: iso2,
        name,
        iso3: iso3,
        iso2: iso2,
        population: population[iso2]?.population,
        confirmed,
        recovered,
        deaths,
        active,
        activePerMillion,
        activeDescription,
        recoveredPercent,
        countryColor,
      });
  });

  yield put(setTableData(countriesData));

  // yield all(cData.slice(0, 10).map((c) => call(getCountryHandler, c)));
  // yield all(cData.map((c) => call(getCountryHandler, c)));

  const resultTableData = {
    ...response.data,
    active: response.data.confirmed.value - response.data.recovered.value - response.data.deaths.value,
    confirmed: response.data.confirmed.value,
    recovered: response.data.recovered.value,
    deaths: response.data.deaths.value,
  };

  yield put(getDataSuccess(resultTableData));
  // } catch (error) {
  //   yield put(getDataFailed());
  //   // eslint-disable-next-line no-console
  //   console.log(error);
  // }
}

// function* getCountryHandler(countryData) {
//   if (countryData.iso3) {
//     // yield put(getCountryAction());
//     const responseCountry = yield call(getCountry, countryData.iso3);
//     const { confirmed, recovered, deaths } = responseCountry.data;
//     yield put(
//       setCountryAction({
//         ...countryData,
//         confirmed: confirmed.value,
//         recovered: recovered.value,
//         deaths: deaths.value,
//         active: confirmed.value - recovered.value - deaths.value,
//       })
//     );
//   }
// }

// function* getConfirmedHandler(action) {
//   try {
//     const response = yield call(getConfirmed, action.payload);

//     yield put(getConfirmedSuccess(response.data));
//     yield put(setCountries(COUNTRIES));
//   } catch (error) {
//     yield put(getConfirmedFailed());
//     // eslint-disable-next-line no-console
//     console.log(error);
//   }
// }

// function* setCountriesHandler(action) {
//   try {
//     const countries = yield select((state) => state.countries.data);
//     const confirmedData = yield select((state) => state.data.confirmedData);

//     console.log('confirmedData', confirmedData);

//     let countriesData = [];
//     for (let countryId in countries) {
//       const countryData = confirmedData.filter((item) => item.iso2 === countryId);

//       countriesData.push({
//         id: countryId,
//         iso2: countryData[0]?.iso2,
//         combinedKey: countryData[0]?.combinedKey,
//         countryRegion: countryData[0]?.countryRegion,
//         confirmed: countryData.reduce((res, c) => res + c.confirmed, 0),
//         recovered: countryData.reduce((res, c) => res + c.recovered, 0),
//         deaths: countryData.reduce((res, c) => res + c.deaths, 0),
//         active: countryData.reduce((res, c) => res + c.active, 0),
//       });
//     }

//     yield put(setTableData(countriesData));
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error);
//   }
// }

function* getData() {
  yield takeEvery(getDataAction, getDataHandler);
  // yield takeEvery(getConfirmedAction, getConfirmedHandler);
  // yield takeEvery(setCountries, setCountriesHandler);
}

// ---------------------------------------------------------------------------------------------------- //

export default [getData];
