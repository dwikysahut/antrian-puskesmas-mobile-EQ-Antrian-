import React from 'react';
import FabButton from '../../Components/FabButton';

const FabGoToTop = (showGoTopBtn, handler, ref) => {
  return <FabButton isShow={showGoTopBtn} onPressFabHandler={handler} />;
};
export default FabGoToTop;
