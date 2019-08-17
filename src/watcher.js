// eslint-disable-next-line no-undef
const socket = io();

// eslint-disable-next-line no-unused-vars
socket.on('change', (_data) => {
  // console.log(data);
  // eslint-disable-next-line no-restricted-globals
  location.reload();
});
