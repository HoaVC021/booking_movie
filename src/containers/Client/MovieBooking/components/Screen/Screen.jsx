import React from 'react';
import { style } from './style';
function Screen() {
  const { screen, container, screen_light } = style;
  return (
    <div style={{ ...container }}>
      <div style={{ ...screen }}></div>
      <div style={{ ...screen_light }}></div>
    </div>
  );
}

export default Screen;
