// import { useContext } from 'react';
// import ConfirmContext from '../store/ConfirmContext';
// import {HIDE_CONFIRM, SHOW_CONFIRM} from "../store/Reducer";

import { useSelector, useDispatch } from 'react-redux';
import { selectConfirm } from '../reduxToolkit/confirm/selectors';
import { setHideConfirm, setShowConfirm } from '../reduxToolkit/confirm/slice';

let resolveCallback: any;
function useConfirm() {
  const dispatch = useDispatch();
  const confirmState = useSelector(selectConfirm);

  const confirm = (text: string) => {
    dispatch(setShowConfirm(text))
    return new Promise((res) => {
      resolveCallback = res;
    });
  }

  const closeConfirm = () => {
    dispatch(setHideConfirm());
  }

  const handleConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  }

  const handleCancel = () => {
    closeConfirm();
    resolveCallback(false);
  }
  // const [confirmState, dispatch] = useContext(ConfirmContext);
  // const onConfirm = () => {
  //     closeConfirm();
  //     resolveCallback(true);
  // };

  // const onCancel = () => {
  //     closeConfirm();
  //     resolveCallback(false);
  // };
  // const confirm = text => {
  //     dispatch({
  //         type: SHOW_CONFIRM,
  //         payload: {
  //             text
  //         }
  //     });
  //     return new Promise((res, rej) => {
  //         resolveCallback = res;
  //     });
  // };

  // const closeConfirm = () => {
  //     dispatch({
  //         type: HIDE_CONFIRM
  //     });
  // };

  return { confirm, closeConfirm, handleConfirm, handleCancel, confirmState };
}

export default useConfirm;
