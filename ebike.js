class FileType {
	constructor(path, type) {
		this.path = path;
		this.attribute = type.attribute;
		this.type = type.type;
	}

	makeCorrectPath = (path) => path
		.split('')
		.map(item => item === '\\' ? '\/' : item)
		.join('');

	findFullPathString = (path) => path
		.split('/')
		.filter((item) => item !== '.')
		.filter((item) => item)
		.join('');

	compareTwoPathes = (path1 = '', path2 = '') => this.findFullPathString(path1) === this.findFullPathString(path2);

	replaceAttr = (item, attrToReplace, attribute) => item.setAttribute(attribute, `${attrToReplace}?${new Date().getTime()}`);

	findChanged = (correctItemPath, attribute, type) => [...document.head.getElementsByTagName(type)]
		.filter((item) => {
			const [pathInAttr, ...restHrefs] = item.getAttribute(attribute).split('?');
			return this.compareTwoPathes(correctItemPath, pathInAttr);
		})[0];

	tryReload = () => {
		const correctItemPath = this.makeCorrectPath(this.path);
		const changed = this.findChanged(correctItemPath, this.attribute, this.type);
		if (changed) this.replaceAttr(changed, correctItemPath, this.attribute)
		return !!changed;
	};
}

if (typeof process === 'undefined') {
	const socket = io.connect();

	socket.on('change', ({ path }) => {
		const cssProperties = { type: 'link', attribute: 'href' }
		const css = new FileType(path, cssProperties);
		const isCss = css.tryReload();
		if (!isCss) location.reload();
	});
} else {
	const watchFunc = (watch, exeptions, io, pathToWatch) => watch(pathToWatch, { recursive: true }, (evt, path) => {
		let include = false;
		exeptions.forEach((item) => {
			if (`${path}`.includes(item)) include = true;
		});
		if (!include) {
			console.log(path);
			io.emit('change', { evt, path, exeptions });
		}
	});

	const findConfig = (userConfigPath, defaultConfigPath) => {
		try {
			const config = require(userConfigPath);
			if (config) return config;
		}
		catch {
			//  const config = require(defaultConfigPath);
			return false;
		}
	};

	const express = require('express');
	const http = require('http');
	const watch = require('node-watch');
	const proxy = require('http-proxy-middleware');
	const app = express();
	const server = http.createServer(app);
	const io = require('socket.io').listen(server);
	const userConfigPath = '../../ebike.config.js';
	const defaultConfigPath = './ebike.config.js';

	const config = findConfig(userConfigPath, defaultConfigPath);

	const {
		exeptions, clientOptions, aliases, remoteServerOptions, isRemoteServer, pathToWatch,
	} = config;
	const { port } = clientOptions;

	const errors = {
		localHostPort: 'Default client port not defined. Please add it to ebike.config.js at clientOptions.port property',
		proxyTarget: 'remoteServerOptions.proxy.target at ebike.config.js is not defined',
	};
	let message = '';

	if (isRemoteServer) {
		if(!remoteServerOptions || !remoteServerOptions.proxy || !remoteServerOptions.proxy.target) throw new Error(errors.proxyTarget);
		const target = process.argv[2] ? aliases[process.argv[2]] : remoteServerOptions.proxy.target;
		message = `Connected to machine: ${target}.`
		remoteServerOptions.proxy.target = target;
		// eslint-disable-next-line no-unused-expressions
		app.use(remoteServerOptions.path, proxy(remoteServerOptions.proxy));
		watchFunc(watch, exeptions, io, pathToWatch);
	};

	if (!isRemoteServer) {
		message = 'Remote server not defined';
	};

	const localhostPort = process.argv[3] || port;
	if(!localhostPort) throw new Error(errors.localHostPort);
	const link = `http://localhost:${localhostPort}/`;
	app.use(express.static('.'))
	server.listen(localhostPort);

	console.log(message);
	console.log(link);
}