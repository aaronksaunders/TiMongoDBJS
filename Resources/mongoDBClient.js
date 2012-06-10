exports.Client = function(g) {
	var Collection, Connection, Database, Deployment, Document, Index, Invoice, Plan, SlowQuery, connection;
	Connection = function(options) {
		this.options = options || {};
		this.apikey = this.options['apikey'];
		if(this.apikey === null) {
			throw "apikey must be set";
		}

		return this.url = this.options['url'] || 'https://api.mongohq.com';
	};
	Connection.prototype.call = function(path, method, options) {
		var data, error, success;
		options || ( options = {});
		data = options['data'] || options['params'] || options['query'] || {};
		success = options['success'] ||
		function(data) {
			return data;
		};
		error = options['error'];
		try {

			if(g._mhq_options.url && false) {
				path = path.replace("/" + g._mhq_options.DATABASES + "/", "/");
				path = path.replace("/collections/", "/");
			}

			if(g._mhq_options.is_mongolab) {
				path = path.replace("/documents", "");
				path = path + "?apiKey=" + this.apikey

				// remove the "document" data and just pass the data
				data = data.document;

			} else {
				data['_apikey'] = this.apikey;
			}

			if(Titanium.Network.online === false) {
				alert("This Application Requires Network Activity");
				return;
			}

			var that = this;
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(30000);

			xhr.onerror = function(r) {
				Titanium.API.error("APICall " + xhr.responseText);
				Titanium.API.error("APICall " + JSON.stringify(r) + "");
				error && error(xhr.responseText);
				xhr.abort();
				xhr = null;
			};
			xhr.onload = function() {
				Titanium.API.debug("APICall success " + xhr.responseText);
				success && success(xhr.responseText);
			};

			if(method == 'PUT' || method == 'POST') {
				xhr.open(method, this.url + path);

				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				if(!g._mhq_options.is_mongolab) {
					xhr.setRequestHeader("Accept-Type", "application/json; charset=utf-8");
					xhr.setRequestHeader("User-Agent", "MongoHQ/0.1/js-client");
					xhr.setRequestHeader("MongoHQ-API-Token", this.apikey);
				}

				// remove the api key from document
				delete data['_apikey'];

				Ti.API.debug("data " + JSON.stringify(data));
				Ti.API.debug("path " + this.url + path);
				xhr.send(JSON.stringify(data));

			} else {
				var body = this.url + path + (g._mhq_options.is_mongolab ? "&" : "?");
				var paramMap = data || {};
				for(var a in paramMap) {
					body += Titanium.Network.encodeURIComponent(a) + '=' + Titanium.Network.encodeURIComponent(paramMap[a]) + '&';
				}

				Ti.API.debug(body);

				xhr.open(method, body);

				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				if(!g._mhq_options.is_mongolab) {
					xhr.setRequestHeader("User-Agent", "MongoHQ/0.1/js-client");
					xhr.setRequestHeader("MongoHQ-API-Token", this.apikey);
				}

				xhr.send();
			}
		} catch (error) {
			Ti.API.info('error ' + JSON.stringify(error));
		}
		return success;
	};
	connection = function() {
		return new Connection(APP._mhq_options);
	};
	Database = function() {
	};
	Database.prototype.all = function(options) {
		options = options || {};
		return connection().call("/" + g._mhq_options.DATABASES, 'GET', options);
	};
	Database.prototype.find = function(options) {
		var db_name;
		options = options || {};
		db_name = options['db_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name, 'GET', options);
	};
	Database.prototype.create = function(options) {
		options = options || {};
		return connection().call("/" + g._mhq_options.DATABASES, 'POST', options);
	};
	Database.prototype["delete"] = function(options) {
		var db_name;
		options = options || {};
		db_name = options['db_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name, 'DELETE', options);
	};
	Plan = function() {
	};
	Plan.prototype.all = function(options) {
		options = options || {};
		return connection().call("/plans", 'GET', options);
	};
	Deployment = function() {
	};
	Deployment.prototype.all = function(options) {
		options = options || {};
		return connection().call("/deployments", 'GET', options);
	};
	Deployment.prototype.find = function(options) {
		var db_name;
		options = options || {};
		db_name = options['name'];
		return connection().call("/deployments/" + name, 'GET', options);
	};
	Deployment.prototype.stats = function(options) {
		var db_name;
		options = options || {};
		db_name = options['name'];
		return connection().call("/deployments/" + name + "/stats", 'GET', options);
	};
	Deployment.prototype.stats = function(options) {
		var db_name;
		options = options || {};
		db_name = options['name'];
		return connection().call("/deployments/" + name + "/logs", 'GET', options);
	};
	Collection = function() {
	};
	Collection.prototype.all = function(options) {
		var db_name;
		options = options || {};
		if(!( db_name = options['db_name']))
			throw "db_name is required";
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections", 'GET', options);
	};
	Collection.prototype.find = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name, 'GET', options);
	};
	Collection.prototype.create = function(options) {
		var db_name;
		options = options || {};
		db_name = options['db_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections", 'POST', options);
	};
	Collection.prototype.update = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name, 'PUT', options);
	};
	Collection.prototype["delete"] = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name, 'DELETE', options);
	};
	Document = function() {
	};
	Document.prototype.all = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/documents", 'GET', options);
	};
	Document.prototype.find = function(options) {
		var col_name, db_name, doc_id;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		doc_id = options['doc_id'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/documents/" + doc_id, 'GET', options);
	};
	Document.prototype.create = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/documents", 'POST', options);
	};
	Document.prototype.update = function(options) {
		var col_name, db_name, doc_id;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		doc_id = options['doc_id'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/documents/" + doc_id, 'PUT', options);
	};
	Document.prototype["delete"] = function(options) {
		var col_name, db_name, doc_id;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		doc_id = options['doc_id'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/documents/" + doc_id, 'DELETE', options);
	};
	Index = function() {
	};
	Index.prototype.all = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/indexes", 'GET', options);
	};
	Index.prototype.find = function(options) {
		var col_name, db_name, ind_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		ind_name = options['ind_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/indexes/" + ind_name, 'GET', options);
	};
	Index.prototype.create = function(options) {
		var col_name, db_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/indexes", 'POST', options);
	};
	Index.prototype["delete"] = function(options) {
		var col_name, db_name, doc_id, ind_name;
		options = options || {};
		db_name = options['db_name'];
		col_name = options['col_name'];
		doc_id = options['doc_id'];
		ind_name = options['ind_name'];
		return connection().call("/" + g._mhq_options.DATABASES + "/" + db_name + "/collections/" + col_name + "/indexes/" + ind_name, 'DELETE', options);
	};
	Invoice = function() {
	};
	Invoice.prototype.all = function(options) {
		options = options || {};
		return connection().call("/invoices", 'GET', options);
	};
	Invoice.prototype.find = function(options) {
		var name;
		options = options || {};
		name = options['name'];
		return connection().call("/invoices/" + name, 'GET', options);
	};
	SlowQuery = function() {
	};
	SlowQuery.prototype.all = function(options) {
		var db_name;
		options = options || {};
		db_name = options['db_name'];
		return connection().call("/slow_queries/" + db_name, 'GET', options);
	};
	SlowQuery.prototype.find = function(options) {
		var db_name, doc_id;
		options = options || {};
		db_name = options['db_name'];
		doc_id = options['doc_id'];
		return connection().call("/slow_queries/" + db_name + "/" + doc_id, 'GET', options);
	};
	return g.mongohq = {

		authenticate : function(options) {
			g._mhq_options = options || {};
			if(options.url.indexOf("mongolab") !== -1) {
				g._mhq_options.DATABASES = "databases";
				g._mhq_options.is_mongolab = true;
			} else if(options.url.indexOf("mongohq") !== -1) {
				// for use without mongoHQ and the default mongodb db url format
				g._mhq_options.DATABASES = "databases";
				g._mhq_options.is_mongohq = true;
			}

			return this;
		},
		plans : new Plan(),
		deployments : new Deployment(),
		databases : new Database(),
		collections : new Collection(),
		documents : new Document(),
		indexes : new Index(),
		invoices : new Invoice(),
		slow_queries : new SlowQuery()
	};
};
