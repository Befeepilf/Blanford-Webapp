import React from 'react';
import classNames from 'classnames';
import TweetEmbed from 'react-tweet-embed';
import MathJax from 'react-mathjax2';
import Image from './components/Image.jsx';

const objectType = function(obj) {
  const protoString = Object.prototype.toString.call(obj);
  if(protoString === '[object Object]') {
    return 'object';
  }
  if(protoString === '[object Array]') {
    return 'array';
  }
  return undefined;
};

// if returnVar == false:
//    returns false if searched variable is either undefined, null, [], {}, object containing only the same listed before; else returns true
// if returnVar == true:
//    returns undefined if searched variable is either undefined, null, [], {}, object containing only the same listed before; else returns this variable
const objExistsStrict = function(obj, returnVar, ...keys) {
  const result = keys.reduce((a, b, index) => {
    if(a !== undefined && a !== null) { // checking initial obj
      const type = objectType(a[b]);
      const isObject = type === 'object';
      if((index < keys.length - 1 && isObject)) {
        return a[b];
      }
      else if(!(isObject && !Object.keys(a[b]).some((key) => objExistsStrict(a[b], false, key))) && !(type === 'array' && !a[b].length) && a[b] !== undefined && a[b] !== null) {
        return a[b];
      }
    }
    return undefined;
  }, obj);
  return (returnVar ? result : result !== undefined);
};

const getRouteByComponent = function(routes, componentName) {
  for(let i = 0; i < routes.routes.length; i++) {
    const route1 = routes.routes[i];
    route1.fullPath = '/' + (routes.pathName.length ? [routes.pathName] : []).concat(route1.exact ? [] : [route1.pathName]).join('/');
    if(route1.componentName === componentName) {
      return route1;
    }
    else if(route1.routes) {
      for(let j = 0; j < route1.routes.length; j++) {
        const route2 = route1.routes[j];
        if(route2.componentName === componentName) {
          route2.fullPath = route1.fullPath + (route1.fullPath.length === 1 ? '' : '/') + (route2.exact ? [] : [route2.pathName]).join('/');
          return route2;
        }
      }
    }
  }
};

const getRouteByPath = function(routes, path) {
  if(path[0] === '/') {
    path = path.slice(1);
  }
  if(path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }
  path = path.split('/');

  routes = routes.routes ? {noname: routes} : routes;
  const keys = Object.keys(routes);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(routes[key].pathName ? routes[key].pathName === path[0] : true) {
      const routes2 = routes[key].routes;
      for(let j = 0; j < routes2.length; j++) {
        const route = routes2[j];
        if(route.exact && j === routes2.length - 1) {
          route.fullPath = `/${path[0]}`;
          return route;
        }
        else if(route.pathName === path[routes[key].pathName ? 1 : 0]) {
          if(route.routes) {
            const routes3 = route.routes;
            for(let k = 0; k < routes3.length; k++) {
              const route2 = routes3[k];
              if(route2.exact) {
                route2.fullPath = (routes[key].pathName ? ['', path[0], path[1]] : ['', path[0]]).join('/');
                return route2;
              }
              else if(route2.pathName === path[2]) {
                route2.fullPath = (routes[key].pathName ? ['', path[0], path[1], path[2]] : ['', path[0], path[1]]).join('/');
                return route2;
              }
            }
          }
          else {
            route.fullPath = (routes[key].pathName ? ['', path[0], path[1]] : ['', path[0]]).join('/');
            return route;
          }
        }
      }
    }
  }
}

const articleContentToHTML = function(content) {
  return content.map((section, index1) => {
    const items = [];
    if(section.title) {
      items.push(<h3 key={index1}>{section.title}</h3>);
    }
    if(section.content) {
      section.content.forEach((element, index2) => {
        const key = index1 + '.' + index2;

        if(typeof element === 'string') {
          const contentElements = element.split('\\n');
          items.push(contentElements.map((contentElement, key2) => <p key={key + '.' + key2} className={classNames({noMargin: key2 < contentElements.length - 1})}>{contentElement.split('$$').map((contentElement2, key3) => {
            if(key3 % 2) {
              contentElement2 = contentElement2.split('$href:$');
              return <a key={key3} className="link" href={contentElement2[1]} target="_blank">{contentElement2[0]}</a>;
            }
            return contentElement2;
          })}</p>));
        }
        else if(element.type) {
          if(element.type === 'tweet') {
            items.push(<TweetEmbed key={key} id={element.id.toString()}/>);
          }
          else if(element.type === 'list') {
            if(element.ordered) {
              items.push(
                <ol className={classNames({big: element.big})}>
                  {element.elements.map((li, index3) => {
                    if(typeof li === 'string') {
                      return <li key={key}>{li}</li>;
                    }
                    else {
                      return(
                        <li key={key}>
                          <h4>{li.title}</h4>
                          <p>{li.content}</p>
                        </li>
                      );
                    }
                  })}
                </ol>
              );
            }
            else {
              items.push(
                <ul key={key} style={element.listStyleType ? {listStyleType: element.listStyleType} : null}>{element.elements.map((li, index3) => <li key={index3}>{li}</li>)}</ul>
              );
            }
          }
          else if(element.type === 'image') {
            items.push(<Image key={key} name={element.imgName}/>);
          }
          else if(element.type === 'yt-video') {
            items.push(
              <iframe
                width="560"
                height="315"
                src={element.embedUrl}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            );
          }
          else if(element.type === 'math') {
            items.push(
              <div key={key} className="math">
                {element.content.map((mathContent, key2) => mathContent === '\\n' ? <br key={key2}/> : (
                  <MathJax.Context
                    key={key2}
                    input="ascii"
                    options={{
                      asciimath2jax: {
                        delimiters: [['$$', '$$']]
                      },
                      showMathMenu: false
                    }}
                  >
                    <MathJax.Text text={mathContent}/>
                  </MathJax.Context>
                ))}
              </div>
            );
          }
          else if(element.type === 'math-inline') {
            items.push(element.content.split('\\n').map((contentElement, key2) => (
              <MathJax.Context
                key={key + '.' + key2}
                input="ascii"
                options={{
                  asciimath2jax: {
                    delimiters: [['$$', '$$']]
                  },
                  showMathMenu: false
                }}
              >
                <MathJax.Text text={contentElement}/>
              </MathJax.Context>
            )));
          }
          else if(element.type === 'quote') {
            items.push(
              <p key={key} className="quote">
                <q>{element.content}</q>
                <br/>
                <br/>
                ~ {element.who}
              </p>
            )
          }
        }
      });
    }
    return items;
  });
}

const formatPercent = function(kpi) {
  kpi = kpi * 100;
  if(kpi === 100) {
    kpi = Math.round(kpi);
  }
  else if(kpi > 9 && kpi.toString().length > 4) {
    kpi = kpi.toFixed(1);
  }
  else if(kpi.toString().length > 4) {
    kpi = kpi.toFixed(2);
  }

  return kpi;
}

const units = ["Bytes", "KByte", "MB", "GB"];
const convertFileSize = (size, depth = 0) => {
  if(size >= 1000) {
    return convertFileSize((size / 1000).toFixed(1), depth + 1);
  }
  return size + " " + units[depth];
}

export {
  objectType,
  objExistsStrict,
  getRouteByComponent,
  getRouteByPath,
  articleContentToHTML,
  formatPercent,
  convertFileSize
};
