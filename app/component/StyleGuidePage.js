import React from 'react';
import sortBy from 'lodash/sortBy';
import { matchShape } from 'found';
import { createMockEnvironment } from 'relay-test-utils';
import { QueryRenderer } from 'react-relay';

import Icon from './Icon';
import IconWithTail from './IconWithTail';
import IconWithBigCaution from './IconWithBigCaution';
import IconWithIcon from './IconWithIcon';
import ComponentDocumentation from './ComponentDocumentation';
import RouteNumber from './RouteNumber';
import DepartureTime from './DepartureTime';
import PlatformNumber from './PlatformNumber';
import CardHeader from './CardHeader';
import Card from './Card';
import CityBikeCard from './CityBikeCard';
import CityBikeContent from './CityBikeContent';
import CityBikeAvailability from './CityBikeAvailability';
import CityBikeUse from './CityBikeUse';
import CityBikePopupContainer from './map/popups/CityBikePopupContainer';
import RightOffcanvasToggle from './RightOffcanvasToggle';
import TripRouteStop from './TripRouteStop';
import MarkerSelectPopup from './map/tile-layer/MarkerSelectPopup';
import SelectCityBikeRow from './map/tile-layer/SelectCityBikeRow';
import SelectParkAndRideRow from './map/tile-layer/SelectParkAndRideRow';
import SelectStopRow from './map/tile-layer/SelectStopRow';
import SelectTerminalRow from './map/tile-layer/SelectTerminalRow';
import TicketInformation from './TicketInformation';
import DateSelect from './DateSelect';
import { Component as RoutePatternSelect } from './RoutePatternSelect';
import RouteScheduleHeader from './RouteScheduleHeader';
import RouteScheduleStopSelect from './RouteScheduleStopSelect';
import RouteScheduleTripRow from './RouteScheduleTripRow';
import RouteStop from './RouteStop';
import RouteAlertsRow from './RouteAlertsRow';
import ModeFilter from './ModeFilter';
import Availability from './Availability';
import ParkAndRideAvailability from './map/popups/ParkAndRideAvailability';
import AppBarSmall from './AppBarSmall';
import AppBarLarge from './AppBarLarge';
import StopPageHeader from './StopPageHeader';
import StopCardHeader from './StopCardHeader';
import SplitBars from './SplitBars';
import InfoIcon from './InfoIcon';
import Favourite from './Favourite';
import SelectedStopPopupContent from './SelectedStopPopupContent';
import { Component as LangSelect } from './LangSelect';
import ExternalLink from './ExternalLink';
import { component as SummaryRow } from './SummaryRow';
import PageFooter from './PageFooter';
import FooterItem from './FooterItem';
import DateWarning from './DateWarning';
import WalkLeg from './WalkLeg';
import WaitLeg from './WaitLeg';
import BicycleLeg from './BicycleLeg';
import EndLeg from './EndLeg';
import AirportCheckInLeg from './AirportCheckInLeg';
import AirportCollectLuggageLeg from './AirportCollectLuggageLeg';
import { Component as ItineraryLegs } from './ItineraryLegs';
import { component as CanceledLegsBar } from './CanceledLegsBar';
import BusLeg from './BusLeg';
import AirplaneLeg from './AirplaneLeg';
import SubwayLeg from './SubwayLeg';
import TramLeg from './TramLeg';
import RailLeg from './RailLeg';
import FerryLeg from './FerryLeg';
import CarLeg from './CarLeg';
import ViaLeg from './ViaLeg';
import CallAgencyLeg from './CallAgencyLeg';
import CallAgencyWarning from './CallAgencyWarning';
import Timetable from './Timetable';
import Error404 from './404';
import SelectMapLayersDialog from './SelectMapLayersDialog';
import MainMenuContainer from './MainMenuContainer';
import OriginDestinationBar from './OriginDestinationBar';
import { Component as IndexPage } from './IndexPage';
import { Component as AlertList } from './AlertList';
import { Component as SummaryPage } from './SummaryPage';
import { Component as ItineraryTab } from './ItineraryTab';

const components = {
  Icon,
  IconWithTail,
  IconWithBigCaution,
  IconWithIcon,
  ComponentDocumentation,
  RouteNumber,
  DepartureTime,
  PlatformNumber,
  CardHeader,
  Card,
  CityBikeCard,
  CityBikeContent,
  CityBikeAvailability,
  CityBikeUse,
  CityBikePopupContainer,
  Availability,
  ParkAndRideAvailability,
  RightOffcanvasToggle,
  TripRouteStop,
  MarkerSelectPopup,
  SelectCityBikeRow,
  SelectParkAndRideRow,
  SelectStopRow,
  SelectTerminalRow,
  TicketInformation,
  DateSelect,
  RoutePatternSelect,
  RouteScheduleHeader,
  RouteScheduleStopSelect,
  RouteScheduleTripRow,
  RouteAlertsRow,
  ModeFilter,
  RouteStop,
  AppBarSmall,
  AppBarLarge,
  CanceledLegsBar,
  StopPageHeader,
  StopCardHeader,
  SplitBars,
  InfoIcon,
  Favourite,
  SelectedStopPopupContent,
  SummaryRow,
  ExternalLink,
  LangSelect,
  PageFooter,
  FooterItem,
  DateWarning,
  ItineraryLegs,
  WalkLeg,
  WaitLeg,
  BicycleLeg,
  EndLeg,
  AirportCheckInLeg,
  AirportCollectLuggageLeg,
  BusLeg,
  AirplaneLeg,
  SubwayLeg,
  TramLeg,
  RailLeg,
  FerryLeg,
  CarLeg,
  ViaLeg,
  CallAgencyLeg,
  CallAgencyWarning,
  Timetable,
  Error404,
  AlertList,
  ItineraryTab,
};

const fullscreenComponents = {
  SelectMapLayersDialog,
  MainMenuContainer,
  OriginDestinationBar,
  IndexPage,
  SummaryPage,
};

function getColors() {
  return (
    <section>
      <div className="medium-6 column">
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#007ac9' }} />
        </svg>
        <span className="code color-code">$primary-color</span>#007ac9
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#ffffff' }} />
        </svg>
        <span className="code color-code">$primary-font-color</span>#ffffff
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#0062a1' }} />
        </svg>
        <span className="code color-code">$secondary-color</span>#0062a1
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#ffffff' }} />
        </svg>
        <span className="code color-code">$secondary-font-color</span>#ffffff
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#ffffff' }} />
        </svg>
        <span className="code color-code">$title-color</span>#ffffff
        <br />
      </div>

      <div className="medium-6 column">
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#f092cd' }} />
        </svg>
        <span className="code color-code">$favourite-color</span>#f092cd
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#f092cd' }} />
        </svg>
        <span className="code color-code">$hilight-color</span>#f092cd
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#007ac9' }} />
        </svg>
        <span className="code color-code">$action-color</span>#007ac9
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#fed100' }} />
        </svg>
        <span className="code color-code">$disruption-color</span>#fed100
        <br />
        <svg className="color-palette" width="50" height="50">
          <rect width="50" height="50" style={{ fill: '#4DA2D9' }} />
        </svg>
        <span className="code color-code">$disruption-passive-color</span>
        #4DA2D9
      </div>

      <p>TODO: dynamically get these colors, now only for HSL</p>

      <img
        src="/img/hsl_reittiopas_map-strokes_02.png"
        alt="Reittiviivat kartalla"
      />
    </section>
  );
}

function getFonts() {
  return (
    <section>
      <p>
        Theme typeface Gotham doesn&apos;t have all symbols in one file, so both
        A and B variants must be specified. Also the weight must be specified
        every time the family is, and vice versa, because the weights of one
        font can be unsuitable for the other and therefore shouldn&apos;t be
        cross inherited when the parent element&apos;s font-family is not the
        same.
      </p>
      <p>
        Easiest way to get all the relevant CSS properties correctly is to
        include an SCSS helper mixin.
      </p>
      <span className="code">$font-family</span>
      <p style={{ fontWeight: '400' }}>
        Primary font: &quot;Gotham Rounded A &quot;,&quot; Gotham Rounded
        B&quot; Arial, Georgia, Serif
        <span className="code">@include font-book</span>
      </p>
      <p style={{ fontWeight: '500' }}>
        Primary font: &quot;Gotham Rounded A&quot;,&quot; Gotham Rounded
        B&quot;, Arial, Georgia, Serif
        <span className="code">@include font-medium</span>
      </p>
      <p style={{ fontWeight: '700' }}>
        Primary font: &quot;Gotham Rounded A&quot;,&quot; Gotham Rounded
        B&quot;, Arial, Georgia, Serif
        <span className="code">@include font-bold</span>
      </p>
      <span className="code">$font-family-narrow</span>
      <p
        style={{
          fontFamily:
            '"Gotham XNarrow SSm A", "Gotham Rounded A", "Gotham Rounded B"',
          fontWeight: '400',
        }}
      >
        Secondary font: &quot;Gotham XNarrow SSm A&quot;, &quot;Gotham Rounded
        A&quot;, &quot;Gotham Rounded B&quot;, Arial, Georgia, Serif
        <span className="code">@include font-narrow-book</span>
      </p>
      <p
        style={{
          fontFamily:
            '"Gotham XNarrow SSm A", "Gotham Rounded A", "Gotham Rounded B"',
          fontWeight: '500',
        }}
      >
        Secondary font: &quot;Gotham XNarrow SSm A&quot;, &quot;Gotham Rounded
        A&quot;, &quot;Gotham Rounded B&quot;, Arial, Georgia, Serif
        <span className="code">@include font-narrow-medium</span>
      </p>
    </section>
  );
}

function getHeadings() {
  return (
    <section>
      <h1>
        Heading 1<span className="code">{'<h1 />'}</span>
      </h1>
      <h2>
        Heading 2<span className="code">{'<h2 />'}</span>
      </h2>
      <h3>
        Heading 3<span className="code">{'<h3 />'}</span>
      </h3>
      <h4>
        Heading 4<span className="code">{'<h4 />'}</span>
      </h4>
      <h5>
        Heading 5<span className="code">{'<h5 />'}</span>
      </h5>
      <h6>
        Heading 6<span className="code">{'<h6 />'}</span>
      </h6>
    </section>
  );
}

function getSubHeaders() {
  return (
    <section>
      <p className="sub-header-h4">
        This is a sub header
        <span className="code">.sub-header-h4</span>
      </p>
    </section>
  );
}

function getTextStyles() {
  return (
    <section>
      <p>
        <a href="#a">This is a link</a>
        <span className="code">{'<a />'}</span>
      </p>
      <p>
        <span className="dotted-link cursor-pointer">
          This is a clickable span
        </span>
        <span className="code">
          {'<span className="dotted-link pointer-cursor" />'}
        </span>
      </p>
      <p>
        Paragraph: normal text looks like this
        <span className="code">{'<p />'}</span>
      </p>
      <span>span style</span>
      <span className="code">
        <span />
      </span>
      <p className="bold">
        this text is bold (should be avoided, set the complete font with mixins
        instead)
        <span className="code">
          .bold or <b />
        </span>
      </p>
    </section>
  );
}

function getIcon(id) {
  return (
    <div key={id}>
      <Icon img={id} />
      <span className="code">{id}</span>
      <br />
    </div>
  );
}

function getIcons() {
  if (typeof document === 'undefined') {
    return null;
  }
  return (
    <section>
      Import:
      <p className="code">Icon = require &lsquo;../icon/Icon&rsquo;</p>
      <br />
      <div
        style={{
          columnWidth: '20em',
          columnGap: '2em',
          columnCount: 4,
        }}
      >
        {sortBy(
          [].slice.call(document.getElementsByTagName('symbol')),
          symbol => symbol.id,
        ).map(symbol => getIcon(symbol.id))}
      </div>
      <div>
        <Icon className="large-icon" img="icon-icon_user" />
        <span className="code">.large-icon</span>
        <br />
      </div>
    </section>
  );
}

function getHelpers() {
  return (
    <section>
      <div className="bus">
        some div<span className="code">.bus</span>
      </div>
      <div className="tram">
        some div<span className="code">.tram</span>
      </div>
      <div className="rail">
        some div<span className="code">.rail</span>
      </div>
      <div className="subway">
        some div<span className="code">.subway</span>
      </div>
      <div className="ferry">
        some div<span className="code">.ferry</span>
      </div>
      <div className="citybike">
        some div<span className="code">.citybike</span>
      </div>
      <div className="walk">
        some div<span className="code">.walk</span>
      </div>
      <div className="bicycle">
        some div<span className="code">.bicycle</span>
      </div>
      <div className="wait">
        some div<span className="code">.wait</span>
      </div>
      <div className="from">
        some div<span className="code">.from</span>
      </div>
      <div className="to">
        some div<span className="code">.to</span>
      </div>
      <br />
      <div className="cursor-pointer">
        some div<span className="code">.cursor-pointer</span>
      </div>
      <div className="bold">
        some div<span className="code">.bold</span>
      </div>
      <div className="uppercase">
        some div<span className="code">.uppercase</span>
      </div>
      <br />
      <div className="padding-small border-dashed">
        the border is not part of the style
        <span className="code">.padding-small</span>
      </div>
      <div className="padding-normal border-dashed">
        some div
        <span className="code">.padding-normal</span>
      </div>
      <div className="padding-vertical-small border-dashed">
        some div
        <span className="code">.padding-vertical-small</span>
      </div>
      <div className="padding-vertical-normal border-dashed">
        some div
        <span className="code">.padding-vertical-normal</span>
      </div>
      <div className="padding-horizontal border-dashed">
        some div
        <span className="code">.padding-horizontal</span>
      </div>
      <div className="no-padding">
        some div<span className="code">.no-padding</span>
      </div>
      <div className="no-margin">
        some div<span className="code">.no-margin</span>
      </div>
      <br />
      <div className="left">
        float left<span className="code">.left</span>
      </div>
      <div className="right">
        float right<span className="code">.right</span>
      </div>
      <div className="clear">
        flot is cleared<span className="code">.clear</span>
      </div>
      <div className="text-left">
        text aligned to left<span className="code">.text-left</span>
      </div>
      <div className="text-right">
        text aligned to right<span className="code">.text-right</span>
      </div>
      <div className="text-center">
        text centered aligned<span className="code">.text-center</span>
      </div>
      <div className="inline-block">
        this div is inlied<span className="code">.inline-block</span>
      </div>
      <div className="inline-block">
        this also<span className="code">.inline-block</span>
      </div>
    </section>
  );
}

function getComponents(environment) {
  return (
    <QueryRenderer
      environment={environment}
      render={({ props }) => {
        return (
          props &&
          Object.keys(components).map(component => (
            <div key={component}>
              <ComponentDocumentation
                {...props}
                component={components[component]}
              />
            </div>
          ))
        );
      }}
    />
  );
}

function StyleGuidePage(props) {
  const environment = createMockEnvironment();
  if (props.match.params.componentName) {
    return (
      <QueryRenderer
        environment={environment}
        render={({ props: innerProps }) =>
          innerProps && (
            <ComponentDocumentation
              {...innerProps}
              mode="examples-only"
              component={
                components[props.match.params.componentName] ||
                fullscreenComponents[props.match.params.componentName]
              }
            />
          )
        }
      />
    );
  }

  return (
    <div className="container column">
      <h1>UI Elements</h1>
      <hr />

      <div className="sub-header">Colors</div>
      {getColors()}
      <hr />

      <div className="sub-header">Fonts</div>
      {getFonts()}
      <hr />

      <div className="sub-header">Text Styles</div>
      {getTextStyles()}
      <hr />

      <div className="sub-header">Headings</div>
      {getHeadings()}
      <hr />

      <div className="sub-header">Sub Headings</div>
      {getSubHeaders()}
      <hr />

      <div className="sub-header">Icons</div>
      {getIcons()}
      <hr />

      <div className="sub-header">Helper Classes</div>
      {getHelpers()}
      <hr />

      <h1>Components</h1>
      <hr />

      {getComponents(environment)}
    </div>
  );
}

StyleGuidePage.propTypes = {
  match: matchShape.isRequired,
};

export default StyleGuidePage;
