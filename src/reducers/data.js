import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  countries: [],
  confirmedData: [],
  recoveredData: [],
  deathsData: [],
  tableData: [],
  isFetching: false, // Индикация загрузки данных
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData: (state, action) => ({ ...state, isFetching: true }),
    getDataSuccess: (state, action) => ({ ...state, data: { ...action.payload }, isFetching: false }),
    getDataFailed: (state, action) => ({ ...initialState, isFetching: false }),
    // getCountries: (state, action) => ({ ...state, isFetching: true }),
    setCountries: (state, action) => ({ ...state, countries: action.payload }),
    // getCountry: (state, action) => ({ ...state, isFetching: true }),
    // setCountry: (state, action) => ({
    //   ...state,
    //   tableData: state.tableData.concat([action.payload]),
    //   // tableData: { ...state.tableData, [action.payload.iso2]: action.payload },
    //   isFetching: false,
    // }),
    // getConfirmed: (state, action) => ({ ...state, isFetching: true }),
    getConfirmedSuccess: (state, action) => ({ ...state, confirmedData: action.payload }),
    // getRecovered: (state, action) => ({ ...state, isFetching: true }),
    getRecoveredSuccess: (state, action) => ({ ...state, recoveredData: action.payload }),
    getDeathsSuccess: (state, action) => ({ ...state, deathsData: action.payload }),
    getDailySuccess: (state, action) => ({ ...state, dailyData: action.payload }),
    // getConfirmedFailed: (state, action) => ({ ...initialState, isFetching: false }),
    setTableData: (state, action) => ({ ...state, tableData: action.payload }),
  },
});

export const {
  getData,
  getDataSuccess,
  getDataFailed,
  // getCountries,
  setCountries,
  // getCountry,
  // setCountry,
  // getConfirmed,
  getConfirmedSuccess,
  // getRecovered,
  getRecoveredSuccess,
  getDeathsSuccess,
  getDailySuccess,
  setTableData,
} = dataSlice.actions;

export default dataSlice.reducer;
