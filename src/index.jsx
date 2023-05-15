import { render } from 'solid-js/web';
import { Selo } from 'krestianstvo';
import App from './Map.jsx';

render(
  () => (
    <Selo
      nodeID={'marker'}
      seloID={'1'}
      component={App}
      reflectorHost={'https://time.krestianstvo.org'}
    />
  ),
  document.getElementById('map')
);
