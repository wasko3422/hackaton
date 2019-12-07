import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Spin } from 'antd';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import './DealersMap.css';

export const ACCESS_TOKEN =
  'pk.eyJ1IjoiZ2VvcmdlZ3VzMjciLCJhIjoiY2szdWU5eDhnMDNuczNtcWVlNDRtcTV4ciJ9.yBl68gguil7L7_WhcmcrEw';

function getDealers() {
  return (dispatch) => {
    axios.get('/get-dealers').then((res) =>
      dispatch({
        type: 'FETCH_DEALERS',
        payload: res.data || [],
      })
    );
  };
}

const Map = ReactMapboxGl({
  accessToken: ACCESS_TOKEN,
});

class DealersMap extends Component {
  static defaultProps = {
    dealers: [],
  };

  state = {
    map: null,
    loading: true,
    activeFeatureId: null,
  };

  componentDidMount() {
    this.props.dispatch(getDealers());
  }

  onMapLoad = (map) => {
    this.setState({ map, loading: false }, () => {
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      map.addControl(new mapboxgl.FullscreenControl());
    });
  };

  onTitleClick = (id, geometry) => {
    if (this.state.map) {
      this.setState({ activeFeatureId: id }, () => {
        this.state.map.flyTo({
          center: geometry.coordinates,
          zoom: 15,
        });
      });
    }
  };

  onMapClick = () => {
    if (this.state.activeFeatureId) {
      this.setState({ activeFeatureId: null });
    }
  };

  render() {
    const { loading, activeFeatureId } = this.state;
    const { dealers, cityCoords } = this.props;
    const mapCenter =
      cityCoords && cityCoords.features && cityCoords.features[0].center;
    return (
      <Row
        style={{
          height: '50vh',
          width: '100%',
        }}
      >
        <Col span={8} style={{ height: '100%', overflow: 'hidden' }}>
          <div className="list">
            <Spin
              spinning={loading}
              size="large"
              wrapperClassName="spin-wrapper"
              indicator={<Icon type="loading" spin style={{ color: 'red' }} />}
            >
              {dealers &&
                dealers.map(({ id, geometry, props }) => {
                  const isActive = this.state.activeFeatureId === id;
                  return (
                    <div key={id} className={cn('item', { active: isActive })}>
                      <Button
                        type="link"
                        onClick={() => this.onTitleClick(id, geometry)}
                        className="title"
                      >
                        {props.address}
                      </Button>
                    </div>
                  );
                })}
            </Spin>
          </div>
        </Col>
        <Col span={16} id="map" style={{ height: '100%' }}>
          <Map
            style="mapbox://styles/mapbox/light-v10"
            onStyleLoad={this.onMapLoad}
            center={mapCenter}
            zoom={[9]}
            containerStyle={{ height: '100%' }}
            onClick={this.onMapClick}
          >
            {dealers &&
              dealers.map(({ id, geometry, props }) => (
                <div key={id}>
                  {activeFeatureId === id && (
                    <Popup
                      coordinates={geometry.coordinates}
                      offset={{
                        'bottom-left': [12, -38],
                        bottom: [0, -38],
                        'bottom-right': [-12, -38],
                      }}
                    >
                      {props.city}, {props.address}
                    </Popup>
                  )}
                  <Marker coordinates={geometry.coordinates}>
                    <Button
                      type="link"
                      onClick={() => this.onTitleClick(id, geometry)}
                    >
                      <Icon
                        type="car"
                        theme="filled"
                        style={{ color: '#e4002d', fontSize: '30px' }}
                      />
                    </Button>
                  </Marker>
                </div>
              ))}
          </Map>
        </Col>
      </Row>
      //
    );
  }
}

export default connect((state) => ({
  cityCoords: state.cityCoords,
  dealers: state.dealers,
  clientId: state.client.id,
}))(DealersMap);
