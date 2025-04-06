const os = require("os");
const io = require("socket.io-client");

//
const socket = io("http://127.0.0.1:8181");
socket.on("connect", () => {
	//
	socket.emit("clientAuth", { data: { key: "wa3rfkp0-e4j-wQA@W#E" } });

	//
	const nI = os.networkInterfaces();
	const macA = Object.values(nI).find(el => !el[0].internal)[0].mac;
	getPerformanceData().then(data => socket.emit("initPerformanceData", { data: { performanceData: { ...data, macA } } }));

	//
	const perfDataInterval = setInterval(() => {
		getPerformanceData().then(data => socket.emit("performanceData", { data: { performanceData: data } }));
	}, 1000);

	//
	socket.on("disconnect", () => clearInterval(perfDataInterval));
});

//
const getCpuAverage = () => {
	const cpus = os.cpus();
	let idleMs = 0;
	let totalMs = 0;
	cpus.forEach(c => {
		for (type in c.times) totalMs += c.times[type];
		idleMs += c.times.idle;
	});
	return { idle: idleMs / cpus.length, total: totalMs / cpus.length };
};

//
const getCpuLoad = () =>
	new Promise((resolve, reject) => {
		const start = getCpuAverage();
		setTimeout(() => {
			const end = getCpuAverage();
			const idleDifference = end.idle - start.idle;
			const totalDifference = end.total - start.total;
			const cpuPercentageUsage = 100 - Math.floor((idleDifference / totalDifference) * 100);
			resolve(cpuPercentageUsage);
		}, 100);
	});

//
const getPerformanceData = () =>
	new Promise(async (resolve, reject) => {
		// Memory
		//   - Free
		const memoryFree = os.freemem();

		//   - Local
		const memoryTotal = os.totalmem();

		//   - % Usage
		const memoryUsed = memoryTotal - memoryFree;
		const memoryUsage = Math.floor(memoryUsed / memoryTotal);

		// Os type
		const osType = os.type() === "Darwin" ? "Mac" : os.type();

		// Uptime
		const uptime = os.uptime();

		// Cpu
		const cpus = os.cpus();
		const core = cpus[0];

		//   - Type
		const cpuModel = core.model;

		//   - Number of cores
		const coresNumber = cpus.length;

		//   - Clock speed
		const spuSpeed = core.speed;

		//   - Cpu usage
		const cpuLoad = await getCpuLoad();

		//
		resolve({
			memoryFree,
			memoryTotal,
			memoryUsed,
			memoryUsage,
			osType,
			uptime,
			cpus,
			core,
			cpuModel,
			coresNumber,
			spuSpeed,
			cpuLoad,
		});
	});
