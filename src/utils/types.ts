import React from 'react';

export const isPOSCommandArray = (param: any): param is Uint8Array => {
  return (
    'BYTES_PER_ELEMENT' in param || 'buffer' in param || 'byteLength' in param
  );
};

export const isJSXArray = (param: any): param is JSX.Element[] => {
  if (!Array.isArray(param)) {
    return false;
  }

  return param.some((value) => React.isValidElement(value));
};
