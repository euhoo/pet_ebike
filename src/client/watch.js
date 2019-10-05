// export default () => {
const socket = io.connect();

const findFullPathString = (path) => path
  .split('/')
  .filter((item) => item !== '.')
  .filter((item) => item)
  .join('');

const makeCorrectName = (name) => name
  .replace('\\', '/')
  .split('?')[0];

const findCss = (hrefToReplace) => {
  const head = document.getElementsByTagName('head')[0];
  const replacedString = findFullPathString(hrefToReplace);
  const cssLink = [...head.getElementsByTagName('link')]
    .filter((link) => {
      const href = link.getAttribute('href').split('?')[0];
      const hrefString = findFullPathString(href);
      if (hrefString === replacedString) return link;
    });
  return cssLink[0];
};

const replaceHref = (cssLink, hrefToReplace) => {
  cssLink.setAttribute('href', `${hrefToReplace}?${new Date().getTime()}`);
  return true;
};

const tryReloadCss = (name) => {
  const hrefToReplace = makeCorrectName(name);
  const cssLink = findCss(hrefToReplace);
  return cssLink ? replaceHref(cssLink, hrefToReplace) : false;
};

socket.on('change', ({ name }) => {
  const isCss = tryReloadCss(name);
  if (!isCss) location.reload();
});
// }
