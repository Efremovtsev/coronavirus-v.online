import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getData as getAllDataAction } from '@src/reducers/data';
import Countries from '@src/components/Countries';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import InfoTable from '@src/components/InfoTable';

function MainPage({ data: { isFetching, tableData, data }, getAllData, getConfirmed }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (event, iso2) => {
    if (event.target.getAttribute('data-active') === 'active') {
      event.target.setAttribute('data-active', '');
      setSelected(null);
    } else if (selected === iso2) {
      setSelected(null);
    } else {
      setSelected(iso2);

      document.getElementById(`row-${iso2}`).scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <>
      <Header data={data} />
      <div className="main">
        {!isFetching && (
          <div className="info">
            <InfoTable data={tableData} selected={selected} setSelected={setSelected} handleClick={handleClick} />
          </div>
        )}
        <Countries
          isFetching={isFetching}
          selected={selected}
          data={tableData}
          allData={data}
          handleClick={handleClick}
        />
      </div>
      <Footer />
    </>
  );
}

const mapDispatchToProps = {
  getAllData: getAllDataAction,
};

const mapStateToProps = (state, ownProps) => ({
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
