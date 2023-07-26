import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPikachus, nextPikachus, prevPikachus } from './actions';

const App = ({ pikachus, offset, fetchPikachus, nextPikachus, prevPikachus }) => {
  useEffect(() => {
    fetchPikachus();
  }, [fetchPikachus]);

  const handleNextClick = () => {
    nextPikachus();
    fetchPikachus();
  };

  const handlePrevClick = () => {
    prevPikachus();
    fetchPikachus();
  };

  return (
    <div>
      <h1>Pikachu Gallery</h1>
      <div className="gallery">
        {pikachus.slice(offset, offset + 3).map(pikachu => (
          <div key={pikachu.id} className="pikachu-card">
            <img src={pikachu.image} alt={pikachu.name} />
            <p>{pikachu.name}</p>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handlePrevClick}>PREV</button>
        <button onClick={handleNextClick}>NEXT</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  pikachus: state.pikachus,
  offset: state.offset,
});

export default connect(mapStateToProps, {
  fetchPikachus,
  nextPikachus,
  prevPikachus,
})(App);
