import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createLocalStore } from 'krestianstvo';

export default function App(props) {
  mapboxgl.accessToken = 'MAPBOX_API_KEY';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [-87.661557, 41.893748],
    zoom: 10.7,
  });

  /**
mapbox://styles/mapbox/streets-v12
mapbox://styles/mapbox/outdoors-v12
mapbox://styles/mapbox/light-v11
mapbox://styles/mapbox/dark-v11
mapbox://styles/mapbox/satellite-v9
mapbox://styles/mapbox/satellite-streets-v12
mapbox://styles/mapbox/navigation-day-v1
mapbox://styles/mapbox/navigation-night-v1
 */

  const color = Math.floor(Math.random() * 16777215).toString(16);
  map.on('click', (event) => {
    props.selo.sendExtMsg({
      msg: 'setMarker',
      id: props.nodeID,
      params: [`${props.selo.clientSeloID}`, color, event.lngLat],
    });
  });

  const [local, setLocal] = createLocalStore(
    {
      data: {
        type: 'Node',
        nodeID: props.nodeID,
        properties: {
          ticking: false,
        },
        dynamic: [],
      },
    },
    props
  );

  const setMarker = (marker) => {
    const loc_mark = marker;
    marker = new mapboxgl.Marker({
      color: `#${marker[1]}`,
    });

    marker.setLngLat([loc_mark[2].lng, loc_mark[2].lat]);
    marker.addTo(map);
  };
  props.selo.createAction(props.nodeID, 'setMarker', setMarker);

  return <></>;
}
