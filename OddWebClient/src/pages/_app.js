import { Modal } from '@redq/reuse-modal';
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import 'common/assets/css/icon-example-page.css';
// swiper bundle styles
import 'swiper/css/bundle';
import 'common/assets/css/react-slick.css';
import 'common/assets/css/rc-collapse.css';
import 'rc-collapse/assets/index.css';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';

export default function CustomApp({ Component, pageProps }) {
  let manager = false;
  let store = createStore(reducer);

  function reducer(state = manager, action){
    console.log(action);
    if(action.type === "success"){
      manager = true;
    } else {
      manager = false;
    }
    return manager;
  }

  return (
    <Provider store={store}>
      <Modal>
        <Component {...pageProps} />
      </Modal>
    </Provider>

  );
}
