var fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec;

try {
	var packageJSON = require('../../package.json'),
		dirty = false,
		packageJSONPath = path.join(__dirname, '../../package.json'),
		rawPackageJSON = fs.readFileSync(packageJSONPath, 'UTF-8'),
		deps = packageJSON.dependencies,
		devDeps = packageJSON.devDependencies,
		config = packageJSON.ensureLatest;

	console.log('Making sure we are using the latest versions of certain modules...');
	var remaining = config.length;
	for (var i = 0; i < config.length; i++) {
		getVersion(config[i]);
	}

	function getVersion(pkg) {
		exec('npm info ' + pkg + ' version',
			function(err, stdout, stderr) {
				if (err) { console.error(err); }
				if (stderr) { console.error(stderr); }
				if (stdout) {
					var latestVersion = stdout.trim();
					ensureLatest(deps, pkg, latestVersion);
					ensureLatest(devDeps, pkg, latestVersion);
				}
				checkRemaining();
			});
	}

	function ensureLatest(dict, pkg, latestVersion) {
		if (dict[pkg] !== undefined && dict[pkg] !== latestVersion) {
			rawPackageJSON = rawPackageJSON.replace(new RegExp('("' + pkg + '": ?)"' + dict[pkg] + '"'), '$1"' + latestVersion + '"');
			console.log('- Updating ' + pkg + ' from ' + dict[pkg] + ' to ' + latestVersion);
			dirty = true;
		}
	}

	function checkRemaining() {
		if (--remaining === 0) {
			if (dirty) {
				fs.writeFileSync(packageJSONPath, rawPackageJSON);
				console.log('Updated package.json with new module versions!');
			}
			else {
				console.log('Ensured modules are up to date!');
			}
			process.exit(0);
		}
	}
}
catch (err) {
	console.error('ensure-latest failed:');
	console.error(err);
}
