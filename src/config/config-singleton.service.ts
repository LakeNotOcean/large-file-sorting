const ConfigServiceSingleton = (function () {
	return {
		getInstance: function () {
			if (instance == null) {
				instance = new SingletonClass();
				// Hide the constructor so the returned object can't be new'd...
				instance.constructor = null;
			}
			return instance;
		},
	};
})();
