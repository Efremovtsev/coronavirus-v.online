import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export const getAllData = () => axios.get(`${API_URL}`);
export const getCountries = () => axios.get(`${API_URL}/countries`);
export const getConfirmed = () => axios.get(`${API_URL}/confirmed`);
export const getRecovered = () => axios.get(`${API_URL}/recovered`);
export const getDeaths = () => axios.get(`${API_URL}/deaths`);

export const getCountry = (iso3) => axios.get(`${API_URL}/countries/${iso3}`);

// const getReport = (testId) => axios.get(`${API_URL}/v2/customer/orderReport`, { params: { id: testId } });
