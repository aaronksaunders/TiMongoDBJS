var APP = {};
var Client = require('mongoDBClient').Client;
client = new Client(APP);

APP.mongohq.authenticate({
	url : 'https://api.mongohq.com',
	apikey : 'ira8ckpp77qfkpnsf2lc'
});

if(false) {
	// mongolabs test
	APP.mongohq.authenticate({
		url : "https://api.mongolab.com/api/1/",
		apikey : '4fd3dc50e4b0f453cdeadd2d'
	});
}

function listDatabases() {
	APP.mongohq.databases.all({
		success : function(success_data) {
			Ti.API.info('databases.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('database.all: error ' + error_data);
		}
	});
}

function listInvoices() {

	APP.mongohq.invoices.all({
		success : function(success_data) {
			Ti.API.info('invoices.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('invoices.all: error ' + error_data);
		}
	});
}

function listPlans() {
	APP.mongohq.plans.all({
		success : function(success_data) {
			Ti.API.info('plans.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('plans.all: error ' + error_data);
		}
	});
}

function listCollections() {
	APP.mongohq.collections.all({
		"db_name" : "test_aks",
		"success" : function(success_data) {
			Ti.API.info('collections.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('collections.all: error ' + error_data);
		}
	});
}

function createDatabase() {
	// "name":"my_new_db", "slug":"sandbox"
	// you MUST have a credit card on account to create database from
	// API, even if it is a free account
	APP.mongohq.databases.create({
		"data" : {
			"name" : 'test-db2',
			"slug" : 'sandbox',
		},
		"success" : function(success_data) {
			Ti.API.info('database.create ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('database.create: error ' + error_data);
		}
	});
}

function createCollection() {
	APP.mongohq.collections.create({
		"db_name" : "test_aks",
		"data" : {
			"name" : "my_users2"
		},
		"success" : function(success_data) {
			Ti.API.info('collections.create ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('collections.create: error ' + error_data);
		}
	});
}

function createDocument() {
	APP.mongohq.documents.create({
		"db_name" : "test_aks",
		"col_name" : "my_users",
		"data" : {
			'document' : {
				"name" : "Andrea " + new Date(),
				"zip" : "20011"
			}
		},
		"success" : function(success_data) {
			Ti.API.info('documents.create ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('documents.create: error ' + error_data);
		}
	});
}

function documentsAll() {
	APP.mongohq.documents.all({
		"db_name" : "test_aks",
		"col_name" : "my_users",
		"success" : function(success_data) {
			Ti.API.info('documents.all ' + success_data);
		}
	});
}

function updateDocument() {
	APP.mongohq.documents.update({
		"db_name" : "test_aks",
		"col_name" : "my_users",
		"doc_id" : "4fcacbac33256c0008000005",
		"data" : {
			'document' : {
				"name" : "Updated Name " + new Date(),
				"zip" : "20011"
			}
		},
		"success" : function(success_data) {
			Ti.API.info('documents.update ' + success_data);
		}
	});
}

function getDocuments() {
	APP.mongohq.documents.all({
		"db_name" : "firstdatabase",
		"col_name" : "my_users",
		//"doc_id" : "4fcacbac33256c0008000005",
		"data" : {
		},
		"success" : function(success_data) {
			Ti.API.info('documents.find ' + success_data);
		}
	});
}

createDocument();

//getDocuments();

