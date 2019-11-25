module.exports = {
	exeptions: ['git', 'js_babeled', 'node_modules', 'build', 'hotreload', 'idea'], // исключения,которые вотчить не надо, файлы и папки
	isRemoteServer: false,
	aliases: {
		1.101: 'http://192.168.1.101:4444',
	},
	defaultOptions: {
		remoteServerAlias: 'http://192.168.2.101:4444',
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