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
  setTableData,
} from '@src/reducers/data';
import { getAllData, getConfirmed, getRecovered, getCountries, getDeaths } from '@src/api';
// import COUNTRIES from '@src/common/countries.json';

// ---------------------------------------------------------------------------------------------------- //

/**`
 * Получить все данные
 */
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

  let countriesData = [];
  cData.forEach(({ name, iso2, iso3 }) => {
    const confirmedCountryData = responseConfirmed.data.filter((item) => item.iso2 === iso2);
    const recoveredCountryData = responseRecovered.data.filter((item) => item.iso2 === iso2);
    const deathsCountryData = responseDeaths.data.filter((item) => item.iso2 === iso2);

    const confirmed = confirmedCountryData.reduce((res, c) => res + c.confirmed, 0);
    const recovered = recoveredCountryData.reduce((res, c) => res + c.recovered, 0);
    const deaths = deathsCountryData.reduce((res, c) => res + c.deaths, 0);

    countriesData.push({
      id: iso2,
      name,
      iso3: iso3,
      iso2: iso2,
      confirmed,
      recovered,
      deaths,
      active: confirmed - recovered - deaths,
    });
  });

  yield put(setTableData(countriesData));

  // yield all(cData.slice(0, 10).map((c) => call(getCountryHandler, c)));
  // yield all(cData.map((c) => call(getCountryHandler, c)));

  yield put(
    getDataSuccess({
      ...response.data,
      active: response.data.confirmed.value - response.data.recovered.value - response.data.deaths.value,
      confirmed: response.data.confirmed.value,
      recovered: response.data.recovered.value,
      deaths: response.data.deaths.value,
    })
  );
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
