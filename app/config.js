import htmlParser from 'htm-to-json';
import defaultConfig from './configurations/config.default';
import configMerger from './util/configMerger';
import { boundWithMinimumAreaSimple } from './util/geo-utils';

const configs = {}; // cache merged configs for speed
const themeMap = {};

if (defaultConfig.themeMap) {
  Object.keys(defaultConfig.themeMap).forEach(theme => {
    themeMap[theme] = new RegExp(defaultConfig.themeMap[theme], 'i'); // str to regex
  });
}

function addMetaData(config) {
  let stats;

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    stats = require(`../_static/iconstats-${config.CONFIG}`);
  } catch (error) {
    return;
  }

  const html = stats.html.join(' ');
  const APP_PATH =
    config.APP_PATH && config.APP_PATH !== '' ? `${config.APP_PATH}'/'` : '/';
  const appPathPrefix = process.env.ASSET_URL || APP_PATH;

  htmlParser.convert_html_to_json(html, (err, data) => {
    if (!err) {
      data.meta.forEach(e => {
        // eslint-disable-next-line no-param-reassign
        delete e.innerHTML;
        if (
          e.name === 'msapplication-config' ||
          e.name === 'msapplication-TileImage'
        ) {
          // eslint-disable-next-line no-param-reassign
          e.content = `${appPathPrefix}${stats.outputFilePrefix}${e.content}`; // fix path bug
        } else if (e.name === 'theme-color') {
          // eslint-disable-next-line no-param-reassign
          e.content = '#fff';
        } else if (e.name === 'apple-mobile-web-app-status-bar-style') {
          // eslint-disable-next-line no-param-reassign
          e.content = 'white';
        }
      });
      data.link.forEach(e => {
        // eslint-disable-next-line no-param-reassign
        delete e.innerHTML;
        if (process.env.ASSET_URL && e.href.startsWith('/icons')) {
          e.href = appPathPrefix + e.href;
        }
      });

      // eslint-disable-next-line no-param-reassign
      config.metaData = data;
      // eslint-disable-next-line no-param-reassign
      config.iconPath = stats.outputFilePrefix;
    }
  });
}

export function getNamedConfiguration(configName) {
  if (!configs[configName]) {
    let additionalConfig;

    if (configName !== 'default') {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      additionalConfig = require(`./configurations/config.${configName}`)
        .default;
    }
    const config = configMerger(defaultConfig, additionalConfig);

    if (config.useSearchPolygon && config.areaPolygon) {
      // pass poly as 'lon lat, lon lat, lon lat ...' sequence
      const pointsParam = config.areaPolygon
        .map(p => `${p[0]} ${p[1]}`)
        .join(',');

      config.searchParams = config.searchParams || {};
      config.searchParams['boundary.polygon'] = pointsParam;
    }

    Object.keys(config.modePolygons).forEach(mode => {
      const boundingBoxes = [];
      config.modePolygons[mode].forEach(polygon => {
        boundingBoxes.push(boundWithMinimumAreaSimple(polygon));
      });
      config.modeBoundingBoxes = config.modeBoundingBoxes || {};
      config.modeBoundingBoxes[mode] = boundingBoxes;
    });

    addMetaData(config); // add dynamic metadata content

    configs[configName] = config;
  }
  return configs[configName];
}

export function getConfiguration(req) {
  let configName = process.env.CONFIG || 'default';
  let host;

  if (req) {
    host =
      (req.headers['x-forwarded-host'] &&
        req.headers['x-forwarded-host'].split(':')[0]) ||
      (req.headers.host && req.headers.host.split(':')[0]) ||
      'localhost';
  }

  if (
    host &&
    process.env.NODE_ENV !== 'development' &&
    (process.env.CONFIG === '' || !process.env.CONFIG)
  ) {
    // no forced CONFIG, map dynamically
    Object.keys(themeMap).forEach(theme => {
      if (themeMap[theme].test(host)) {
        configName = theme;
      }
    });
  }

  return getNamedConfiguration(configName);
}
