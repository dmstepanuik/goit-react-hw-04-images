import React from 'react';
import { Audio } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div>
      <Audio
        className="true"
        height="40"
        width="40"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}



