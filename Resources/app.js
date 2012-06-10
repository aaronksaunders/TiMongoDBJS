var Client = require('mongoDBClient').Client;

var client = null;

if(true) {
	// mongolabs test
	client = new Client({
		url : "https://api.mongolab.com/api/1/",
		apikey : ''
	});
	database = "firstdatabase";
} else {
	//mongohq test
	client = new Client({
		url : 'https://api.mongohq.com',
		apikey : ''
	});
	database = "test_aks";
}

function listDatabases() {
	client.databases.all({
		success : function(success_data) {
			Ti.API.info('databases.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('database.all: error ' + error_data);
		}
	});
}

function listInvoices() {

	client.invoices.all({
		success : function(success_data) {
			Ti.API.info('invoices.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('invoices.all: error ' + error_data);
		}
	});
}

function listPlans() {
	client.plans.all({
		success : function(success_data) {
			Ti.API.info('plans.all ' + success_data);
		},
		"error" : function(error_data) {
			Ti.API.info('plans.all: error ' + error_data);
		}
	});
}

function listCollections() {
	client.collections.all({
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
	client.databases.create({
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
	client.collections.create({
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

function createDocument(db_name) {
	client.documents.create({
		"db_name" : db_name || "firstdatabase",
		"col_name" : "my_users",
		"data" : {
			'document' : {
				"name" : "Andrea " + new Date(),
				"zip" : "20011"
			}
		},
		"success" : function(success_data) {
			Ti.API.info('documents.create ' + success_data);
			
			// now display all documents
			getDocuments(database);
			
		},
		"error" : function(error_data) {
			Ti.API.info('documents.create: error ' + error_data);
		}
	});
}

function documentsAll() {
	client.documents.all({
		"db_name" : db_name || "firstdatabase",
		"col_name" : "my_users",
		"success" : function(success_data) {
			Ti.API.info('documents.all ' + success_data);
		}
	});
}

function updateDocument() {
	client.documents.update({
		"db_name" : db_name || "firstdatabase",
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

function getDocuments(db_name) {
	client.documents.all({
		"db_name" : db_name || "firstdatabase",
		"col_name" : "my_users",
		"data" : {
		},
		"success" : function(success_data) {
			Ti.API.info('documents.find ' + success_data);
			
		}
	});
}

createDocument(database);
getDocuments(database);

