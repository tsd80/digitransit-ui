import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intlShape } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';
import { itineraryShape } from '../../util/shapes';
import { legTime } from '../../util/legUtils';
import Icon from '../Icon';

function Navigator(props, context) {
  const [time, setTime] = useState(Date.now());
  const [currentLeg, setCurrentLeg] = useState(null);

  // update view after every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newLeg = props.itinerary.legs.find(leg => {
      return legTime(leg.start) <= time && time <= legTime(leg.end);
    });

    if (newLeg && newLeg !== currentLeg) {
      setCurrentLeg(newLeg);
      props.focusToLeg(newLeg);
    }
  }, [time]);

  return (
    <div>
      <div className="navigator-top-section">
        <button
          type="button"
          aria-label={context.intl.formatMessage({
            id: 'navigation-label-close',
            defaultMessage: 'Close the navigator view',
          })}
          onClick={e => props.buttonClickAction(e)}
          className="close-button cursor-pointer"
        >
          <Icon img="icon-icon_close" />
        </button>
      </div>
      Tracking {props.itinerary.legs.length} legs, current {currentLeg?.mode}
    </div>
  );
}

Navigator.propTypes = {
  itinerary: itineraryShape.isRequired,
  focusToLeg: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  buttonClickAction: PropTypes.func.isRequired,
  /*
  focusToPoint: PropTypes.func.isRequired,
  relayEnvironment: relayShape.isRequired,
  */
};

Navigator.contextTypes = {
  intl: intlShape.isRequired,
};

const withRelay = createFragmentContainer(Navigator, {
  itinerary: graphql`
    fragment Navigator_itinerary on Itinerary {
      start
      end
      legs {
        mode
        start {
          scheduledTime
          estimated {
            time
          }
        }
        end {
          scheduledTime
          estimated {
            time
          }
        }
        legGeometry {
          points
        }

        from {
          lat
          lon
        }
        to {
          lat
          lon
        }
      }
    }
  `,
});

export { Navigator as Component, withRelay as default };
