import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import RouteNumber from './RouteNumber';
import { isBrowser } from '../util/browser';

class ItineraryCircleLineWithIcon extends React.Component {
  static defaultProps = {
    isVia: false,
    color: null,
  };

  static propTypes = {
    index: PropTypes.number.isRequired,
    modeClassName: PropTypes.string.isRequired,
    isVia: PropTypes.bool,
    color: PropTypes.string,
  };

  state = {
    imageUrl: 'none',
  };

  isFirstChild = () => {
    return this.props.index === 0 && this.props.isVia === false;
  };

  componentDidMount() {
    import(
      /* webpackChunkName: "dotted-line" */ `../configurations/images/default/dotted-line.svg`
    ).then(imageUrl => {
      this.setState({ imageUrl: `url(${imageUrl.default})` });
    });
  }

  getMarker = top => {
    if (this.props.isVia === true) {
      return (
        <div className="itinerary-icon-container">
          <Icon
            img="icon-icon_mapMarker-via"
            className="itinerary-icon via via-it"
          />
        </div>
      );
    }
    if (this.isFirstChild()) {
      return (
        <div className="itinerary-icon-container start">
          <Icon
            img="icon-icon_mapMarker-from"
            className="itinerary-icon from from-it"
          />
        </div>
      );
    }
    if (this.props.modeClassName === 'walk') {
      return <></>;
    }
    return (
      <div
        className={`leg-before-circle circle ${this.props.modeClassName} ${
          top ? 'top' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          style={{ fill: this.props.color, stroke: this.props.color }}
        >
          <circle strokeWidth="4" width={28} cx={11} cy={10} r={6} />
        </svg>
      </div>
    );
  };

  render() {
    const topMarker = this.getMarker(true);
    const legBeforeLineStyle = { color: this.props.color };
    if (
      isBrowser &&
      (this.props.modeClassName === 'walk' ||
        this.props.modeClassName === 'bicycle' ||
        this.props.modeClassName === 'bicycle_walk')
    ) {
      // eslint-disable-next-line global-require
      legBeforeLineStyle.backgroundImage = this.state.imageUrl;
    }
    return (
      <div
        className={cx('leg-before', this.props.modeClassName, {
          via: this.props.isVia,
        })}
        aria-hidden="true"
      >
        {topMarker}

        <div
          style={legBeforeLineStyle}
          className={`leg-before-line ${this.props.modeClassName}`}
        />
        <RouteNumber mode={this.props.modeClassName} vertical />
        <div
          style={legBeforeLineStyle}
          className={`leg-before-line ${this.props.modeClassName} bottom`}
        />
      </div>
    );
  }
}

export default ItineraryCircleLineWithIcon;
