export const formatNumber = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const activeColors = [
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
export const recoveredColors = ['#639178', '#6AAD7E', '#3FBF66'];
