import get from 'lodash/get';

export const convertToCamel = str => (
  str.replace(/-([a-z])/g, g => `${g[1].toUpperCase()}`)
);

export const changeBackgroundColor = (attrs, newColor) => {
  const tmp = attrs;
  tmp.fill = newColor;
  return tmp;
};

export const changeStrokeColor = (attrs, newColor) => {
  const tmp = attrs;
  tmp.stroke = newColor;
  return tmp;
};

export const getAttrs = (dom) => {
  const opts = {};
  if (dom) {
    const attr = dom.attributes || [];
    for (let i = 0; i < attr.length; i += 1) {
      if (attr[i].name !== 'xmlns:xlink') {
        if (attr[i].name === 'class') {
          opts.className = attr[i].value;
        } else {
          opts[convertToCamel(attr[i].name)] = attr[i].value;
        }
      }
    }
  }
  return opts;
};

export const getNodeType = domNode => (
  (domNode.getElementsByTagName('polygon').length > 0)
    ? 'instance'
    : 'cardinality'
);

export const convertDomNode = (domNode) => {
  const type = getNodeType(domNode);
  let polygonOpts = {};
  let ellipseOpts = {};
  if (type === 'instance') {
    polygonOpts = getAttrs(domNode.getElementsByTagName('polygon')[0]);
  } else {
    ellipseOpts = getAttrs(domNode.getElementsByTagName('ellipse')[0]);
  }
  const node = {
    attrs: getAttrs(domNode),
    class: domNode.attributes.class.value,
    type,
    id: domNode.attributes.id.value,
    title: get(domNode.getElementsByTagName('title'), '[0].textContent', ''),
    polygonOpts,
    ellipseOpts,
    discovery: get(domNode.getElementsByTagName('text'), '[0].textContent', ''),
    definition: get(domNode.getElementsByTagName('text'), '[1].textContent', ''),
    host: get(domNode.getElementsByTagName('text'), '[2].textContent', ''),
    discoveryOpts: getAttrs(get(domNode.getElementsByTagName('text'), '[0]', {})),
    definitionOpts: getAttrs(get(domNode.getElementsByTagName('text'), '[1]', {})),
    hostOpts: getAttrs(get(domNode.getElementsByTagName('text'), '[2]', {})),
    cardinalityOpts: getAttrs(get(domNode.getElementsByTagName('text'), '[0]', {})),
    cardinality: get(domNode.getElementsByTagName('text'), '[0].textContent', ''),
  };
  return node;
};

export const convertDomEdge = (domEdge) => {
  const edge = {
    id: domEdge.attributes.id.value,
    attrs: getAttrs(domEdge),
    polygonOpts: getAttrs(get(domEdge.getElementsByTagName('polygon'), '[0]', {})),
    pathOpts: getAttrs(get(domEdge.getElementsByTagName('path'), '[0]', {})),
  };
  return edge;
};

export default getAttrs;
