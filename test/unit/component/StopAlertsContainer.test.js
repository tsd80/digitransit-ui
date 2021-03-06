import { expect } from 'chai';
import { describe, it } from 'mocha';
import React from 'react';

import { shallowWithIntl } from '../helpers/mock-intl-enzyme';
import AlertList from '../../../app/component/AlertList';
import { Component as StopAlertsContainer } from '../../../app/component/StopAlertsContainer';

describe('<StopAlertsContainer />', () => {
  it("should indicate that there are no alerts if the stop's routes have no alerts and the stop has no canceled stoptimes", () => {
    const props = {
      stop: {
        stoptimesForServiceDate: [
          {
            pattern: {
              route: {
                alerts: [],
                mode: 'BUS',
                shortName: '63',
              },
              stops: [
                {
                  name: 'Saramäentie',
                },
              ],
            },
            stoptimes: [
              {
                headsign: 'Kamppi',
                realtimeState: 'SCHEDULED',
              },
            ],
          },
        ],
      },
    };
    const wrapper = shallowWithIntl(<StopAlertsContainer {...props} />);
    expect(wrapper.find(AlertList).props()).to.deep.equal({
      cancelations: [],
      serviceAlerts: [],
    });
  });

  it('should indicate that there is a service alert on a route', () => {
    const props = {
      stop: {
        stoptimesForServiceDate: [
          {
            pattern: {
              route: {
                alerts: [{}],
                mode: 'BUS',
                shortName: '63',
              },
              stops: [
                {
                  name: 'Saramäentie',
                },
              ],
            },
            stoptimes: [
              {
                headsign: 'Kamppi',
                realtimeState: 'SCHEDULED',
              },
            ],
          },
        ],
      },
    };
    const wrapper = shallowWithIntl(<StopAlertsContainer {...props} />);
    expect(wrapper.find(AlertList).prop('serviceAlerts')).to.have.lengthOf(1);
  });

  it('should indicate that there is a canceled stoptime on a route', () => {
    const props = {
      stop: {
        stoptimesForServiceDate: [
          {
            pattern: {
              route: {
                alerts: [],
                mode: 'BUS',
                shortName: '63',
              },
              stops: [
                {
                  name: 'Saramäentie',
                },
              ],
            },
            stoptimes: [
              {
                headsign: 'Kamppi',
                realtimeState: 'CANCELED',
              },
            ],
          },
        ],
      },
    };
    const wrapper = shallowWithIntl(<StopAlertsContainer {...props} />);
    expect(wrapper.find(AlertList).prop('cancelations')).to.have.lengthOf(1);
  });

  it('should use the stoptime as the startTime for validityPeriod', () => {
    const props = {
      stop: {
        stoptimesForServiceDate: [
          {
            pattern: {
              route: {
                alerts: [],
                mode: 'BUS',
                shortName: '63',
              },
              stops: [
                {
                  name: 'Saramäentie',
                },
              ],
            },
            stoptimes: [
              {
                headsign: 'Kamppi',
                realtimeState: 'CANCELED',
                serviceDay: 1,
                scheduledDeparture: 2,
              },
            ],
          },
        ],
      },
    };
    const wrapper = shallowWithIntl(<StopAlertsContainer {...props} />);
    expect(
      wrapper.find(AlertList).prop('cancelations')[0].validityPeriod.startTime,
    ).to.equal(3);
  });
});
