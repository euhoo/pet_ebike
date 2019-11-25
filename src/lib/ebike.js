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
		return changed ? this.replaceAttr(changed, correctItemPath, this.attribute) : false;
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

	const findConfig = (defaultConfigPath, userConfigPath, defaultConfigObj) => {
		const fs = require("fs");
		const defaultConfig = fs.existsSync(defaultConfigPath) ? require(defaultConfigPath) : defaultConfigObj;
		const config = fs.existsSync(userConfigPath) ? require(userConfigPath) : defaultConfig;
		return config;
	};

	const express = require('express');
	const http = require('http');
	const watch = require('node-watch');
	const proxy = require('http-proxy-middleware');
	const app = express();
	const server = http.createServer(app);
	const io = require('socket.io').listen(server);
	const userConfigPath = '../../ebike.config.js';
	const defaultConfigObj = {
		exeptions: ['git', 'js_babeled', 'node_modules', 'build', 'hotreload', 'idea'], // исключения,которые вотчить не надо, файлы и папки
		isRemoteServer: false,
		aliases: {
			1.102: 'http://192.168.1.102:4444',
		},
		defaultOptions: {
			remoteServer: 'http://192.168.2.101:4444',
			clientPort: '9080',
		},
		remoteServerOptions: {
			path: '/myServer',
			proxy: {
				target: 'http://192.168.2.101:4444',
				changeOrigin: true,
				ws: true,
			},
		},
		pathToWatch: './',
	};
	const defaultConfigPath = './ebike.config.js';
	const config = require(userConfigPath);// findConfig(defaultConfigPath, userConfigPath, defaultConfigObj);

	const {
		exeptions, defaultOptions, aliases, remoteServerOptions, isRemoteServer, pathToWatch,
	} = config;
	const { remoteServer, clientPort } = defaultOptions;

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

	const shortAlias = process.argv[2] || 2.102;
	const localHostPort = process.argv[3] || clientPort || 9080;
	const target = aliases[shortAlias] || remoteServer;
	const message = isRemoteServer ? `Connected to machine: ${target}.` : 'Remote server not defined';
	const link = `http://localhost:${localHostPort}/`;

	server.listen(localHostPort);

	// eslint-disable-next-line no-unused-expressions
	isRemoteServer ? app.use(remoteServerOptions.path, proxy(remoteServerOptions.proxy)).use(express.static('.'))
		: app.use(express.static('.'));

	watchFunc(watch, exeptions, io, pathToWatch);

	if (message) console.log(message);
	console.log(link);
}
