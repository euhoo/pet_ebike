module.exports = (watch, exeptions, io, pathToWatch) => (watch(pathToWatch, { recursive: true }, (evt, name) => {
  let include = false;
  exeptions.forEach((item) => {
    if (`${name}`.includes(item)) include = true;
  });
  if (!include) {
    console.log(name);
    io.emit('change', { evt, name, exeptions });
  }
}));
