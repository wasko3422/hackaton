import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import cn from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Row, Col, Button, Icon, Spin, Typography } from 'antd';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import './DealersMap.css';

const { Text } = Typography;

export const ACCESS_TOKEN =
  'pk.eyJ1IjoiZ2VvcmdlZ3VzMjciLCJhIjoiY2szdWU5eDhnMDNuczNtcWVlNDRtcTV4ciJ9.yBl68gguil7L7_WhcmcrEw';

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
    isAllDealersShown: false,
  };

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

  onTitleClick = (id, coords) => {
    if (this.state.map) {
      this.setState({ activeFeatureId: id }, () => {
        this.props.onChange(id);
        this.state.map.jumpTo({
          center: coords,
          zoom: 15,
        });
      });
    }
  };

  onMapClick = () => {
    if (this.state.activeFeatureId) {
      this.setState({ activeFeatureId: null });
      this.props.onChange(null);
    }
  };

  showAllDealers = () => {
    this.setState({ isAllDealersShown: true });
  };

  render() {
    const { loading, activeFeatureId, isAllDealersShown } = this.state;
    const { dealers: allDealers, cityCoords } = this.props;
    const mapCenter =
      cityCoords && cityCoords.features && cityCoords.features[0].center;

    if (!allDealers) return null;

    const priorityDealers = allDealers.filter(({ is_priority }) => is_priority);
    const otherDealers = allDealers.filter(({ is_priority }) => !is_priority);
    const dealers = isAllDealersShown
      ? [...priorityDealers, ...otherDealers]
      : priorityDealers;
    return (
      <>
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
                indicator={
                  <Icon type="loading" spin style={{ color: 'red' }} />
                }
              >
                {dealers && dealers.length ? (
                  dealers.map(
                    ({
                      dealer_id: id,
                      dealer_name,
                      lattitude,
                      longtitude,
                      address,
                    }) => {
                      const isActive = this.state.activeFeatureId === id;
                      const coords = [longtitude, lattitude];
                      return (
                        <div
                          key={id}
                          className={cn('item', { active: isActive })}
                        >
                          <Button
                            type="link"
                            onClick={() => this.onTitleClick(id, coords)}
                            className="title"
                          >
                            {dealer_name}
                          </Button>
                          <Text>{address}</Text>
                        </div>
                      );
                    }
                  )
                ) : (
                  <Text>Дилеров нет</Text>
                )}
              </Spin>
            </div>
          </Col>
          <Col span={16} id="map" style={{ height: '100%' }}>
            <Map
              style="mapbox://styles/mapbox/light-v10"
              onStyleLoad={this.onMapLoad}
              center={mapCenter}
              zoom={[9]}
              movingMethod="jumpTo"
              containerStyle={{ height: '100%' }}
              onClick={this.onMapClick}
            >
              {dealers.map(
                ({ dealer_id: id, lattitude, longtitude, address }) => {
                  const coords = [longtitude, lattitude];
                  return (
                    <div key={id}>
                      {activeFeatureId === id && (
                        <Popup
                          coordinates={coords}
                          offset={{
                            'bottom-left': [12, -38],
                            bottom: [0, -38],
                            'bottom-right': [-12, -38],
                          }}
                        >
                          <Text>{address}</Text>
                        </Popup>
                      )}
                      <Marker coordinates={coords}>
                        <Button
                          type="link"
                          onClick={() => this.onTitleClick(id, coords)}
                        >
                          <Icon
                            type="tool"
                            theme="filled"
                            style={{ color: '#e4002d', fontSize: '30px' }}
                          />
                        </Button>
                      </Marker>
                    </div>
                  );
                }
              )}
            </Map>
          </Col>
        </Row>
        <Row>
          {!isAllDealersShown && (
            <Button type="primary" onClick={this.showAllDealers}>
              Показать всех доступных дилеров
            </Button>
          )}
        </Row>
      </>
    );
  }
}

export default withRouter(
  connect((state) => ({
    cityCoords: state.cityCoords,
    dealers: state.dealers,
    clientId: state.client.id,
  }))(DealersMap)
);
