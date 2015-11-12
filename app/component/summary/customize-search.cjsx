React                 = require 'react'
Icon                  = require '../icon/icon'
Slider                = require '../util/slider'
ToggleButton          = require '../util/toggle-button'
Offcanvas             = require '../util/offcanvas'
ItinerarySearchAction = require '../../action/itinerary-search-action'
Select                = require '../util/select'

intl = require 'react-intl'

class CustomizeSearch extends React.Component
  @contextTypes:
    getStore: React.PropTypes.func.isRequired
    executeAction: React.PropTypes.func.isRequired
    intl: intl.intlShape.isRequired

  @propTypes:
    open: React.PropTypes.bool

  componentDidMount: ->
    @context.getStore('ItinerarySearchStore').addChangeListener @onChange

  componentWillUnmount: ->
    @context.getStore('ItinerarySearchStore').removeChangeListener @onChange

  onChange: =>
    @forceUpdate()

  getTicketOptions: ->
    options = @context.getStore('ItinerarySearchStore').getTicketOptions()
    options.map (option, index) ->
      <option key={index} value={option.value}>{option.displayName}</option>

  render: ->
    <Offcanvas open={@props.open} className="customize-search" position="right">
      <section className="offcanvas-section">
        <div className="row btn-bar">
          <ToggleButton
            icon="bus-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleBusState}
            state={@context.getStore('ItinerarySearchStore').getBusState()}
            checkedClass="bus"
            className="mode-icon first-btn"
          />
          <ToggleButton
            icon="tram-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleTramState}
            state={@context.getStore('ItinerarySearchStore').getTramState()}
            checkedClass="tram"
            className="mode-icon"
          />
          <ToggleButton
            icon="rail-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleRailState}
            state={@context.getStore('ItinerarySearchStore').getRailState()}
            checkedClass="rail"
            className="mode-icon"
          />
          <ToggleButton
            icon="subway-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleSubwayState}
            state={@context.getStore('ItinerarySearchStore').getSubwayState()}
            checkedClass="subway"
            className="mode-icon"
          />
          <ToggleButton
            icon="ferry-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleFerryState}
            state={@context.getStore('ItinerarySearchStore').getFerryState()}
            checkedClass="ferry"
            className="mode-icon"
          />
          <ToggleButton
            icon="citybike-withoutBox"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleCitybikeState}
            state={@context.getStore('ItinerarySearchStore').getCitybikeState()}
            checkedClass="bicycle_rent"
            className="mode-icon last-btn"
          />
        </div>
      </section>

      <section className="offcanvas-section">
        <div className="row btn-bar">
          <ToggleButton
            icon="walk"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleWalkState}
            state={@context.getStore('ItinerarySearchStore').getWalkState()}
            checkedClass="walk"
            className="first-btn small-4"
          />
          <ToggleButton
            icon="cycle"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleCycleState}
            state={@context.getStore('ItinerarySearchStore').getCycleState()}
            checkedClass="cycle"
            className=" small-4"
          />
          <ToggleButton
            icon="car"
            onBtnClick={() -> @context.executeAction ItinerarySearchAction.toggleCarState}
            state={@context.getStore('ItinerarySearchStore').getCarState()}
            checkedClass="car"
            className="last-btn small-4"
          />
        </div>
      </section>

      <section className="offcanvas-section">
        <Slider
          headerText={@context.intl.formatMessage(
            {id: 'walking', defaultMessage: "Walking"})}
          defaultValue={@context.getStore('ItinerarySearchStore').getWalkReluctance()}
          onSliderChange={(e) -> @context.executeAction(ItinerarySearchAction.setWalkReluctance, e.target.value)}
          min={0.8}
          max={10}
          step={0.2}
          minText={@context.intl.formatMessage(
            {id: 'prefer-walking', defaultMessage: "Prefer walking"})}
          maxText={@context.intl.formatMessage(
            {id: 'avoid-walking', defaultMessage: "Avoid walking"})}
        />
      </section>
      <section className="offcanvas-section">
        <Slider
          headerText={@context.intl.formatMessage(
            {id: 'transfers', defaultMessage: "Transfers"})}
          defaultValue={@context.getStore('ItinerarySearchStore').getWalkBoardCost()}
          onSliderChange={(e) -> @context.executeAction(ItinerarySearchAction.setWalkBoardCost, e.target.value)}
          min={1}
          max={1800}
          step={60}
          minText={@context.intl.formatMessage(
            {id: 'transfers-allowed', defaultMessage: "Transfers allowed"})}
          maxText={@context.intl.formatMessage(
            {id: 'avoid-transfers', defaultMessage: "Avoid transfers"})}
        />
      </section>
      <section className="offcanvas-section">
        <Slider
          headerText={@context.intl.formatMessage(
            {id: 'transfer-margin', defaultMessage: "Transfer margin"})}
          defaultValue={@context.getStore('ItinerarySearchStore').getMinTransferTime()}
          onSliderChange={(e) -> @context.executeAction(ItinerarySearchAction.setMinTransferTime, e.target.value)}
          min={60}
          max={660}
          step={30}
          minText={"1 min"}
          maxText={"12 min"}
        />
      </section>
      <section className="offcanvas-section">
        <Slider
          headerText={@context.intl.formatMessage(
            {id: 'walking-speed', defaultMessage: "Walking speed"})}
          defaultValue={@context.getStore('ItinerarySearchStore').getWalkSpeed()}
          onSliderChange={(e) -> @context.executeAction(ItinerarySearchAction.setWalkSpeed, e.target.value)}
          min={0.5}
          max={3}
          step={0.1}
          minText={@context.intl.formatMessage(
            {id: 'slow', defaultMessage: "Slow"})}
          maxText={@context.intl.formatMessage(
            {id: 'run', defaultMessage: "Run"})}
        />
      </section>

      <section className="offcanvas-section">
        <Select
          headerText={@context.intl.formatMessage(
            {id: 'zones', defaultMessage: "Zones"})}
          name="ticket"
          selected={@context.getStore('ItinerarySearchStore').getSelectedTicketOption()}
          options={@context.getStore('ItinerarySearchStore').getTicketOptions()}
          onSelectChange={(e) -> @context.executeAction(ItinerarySearchAction.setTicketOption, e.target.value)}
        />
      </section>
      <section className="offcanvas-section">
        <Select
          headerText={@context.intl.formatMessage(
            {id: 'accessibility', defaultMessage: "Accessibility"})}
          name="accessible"
          selected={@context.getStore('ItinerarySearchStore').getSelectedAccessibilityOption()}
          options={@context.getStore('ItinerarySearchStore').getAccessibilityOptions()}
          onSelectChange={(e) -> @context.executeAction(ItinerarySearchAction.setAccessibilityOption, e.target.value)}
        />
      </section>

    </Offcanvas>


module.exports = CustomizeSearch
