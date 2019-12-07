import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Row, Col, Button, Icon, Spin } from 'antd';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import cn from 'classnames';

import stores from './mockDilers.json'; // TODO: заменить на данные с сервера

import './DilersMap.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2VvcmdlZ3VzMjciLCJhIjoiY2szdWU5eDhnMDNuczNtcWVlNDRtcTV4ciJ9.yBl68gguil7L7_WhcmcrEw',
});

class DillersMap extends Component {
  state = {
    map: null,
    data: stores.features,
    loading: true,
    activeFeatureId: null,
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

  onMapLoad = (map) => {
    this.setState({ map, loading: false });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  };

  render() {
    const { data, loading, activeFeatureId } = this.state;
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
              indicator={<Icon type="loading" spin style={{ color: 'red' }} />}
            >
              {stores.features.map(({ id, geometry, props }) => {
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
            center={[-77.034084, 38.909671]}
            zoom={[9]}
            containerStyle={{ height: '100%' }}
            onClick={this.onMapClick}
          >
            {data.map(({ id, geometry, props }) => (
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

export default DillersMap;
