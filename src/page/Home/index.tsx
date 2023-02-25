import React, { useState } from 'react';

function Home() {

  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <span>GPS is disabled</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Current position</span>
              <span>Latitude: ?</span>
              <span>Longtitude: ?</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Please enable</span>
              <span>GPS</span>
            </div>
          </div>
        </div>
        <div>Clock</div>
        <div>
          <span>Recent clocking history</span>
        </div>
      </div>
      <button>Out Of Range</button>
    </div>
  );
};

export default Home;
