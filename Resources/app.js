var APP = {};
var Client = require('mongoDBClient').Client;
client = new Client(APP);

APP.mongohq.authenticate({
	apikey : 'ira8ckpp77qfkpnsf2lc'
});
/*
 APP.mongohq.databases.all({
 success : function(plans) {
 Ti.API.info('databases.all ' + plans);
 }
 });

 APP.mongohq.collections.all({
 "db_name" : "test_aks",
 "success" : function(plans) {
 Ti.API.info('collections.all ' + plans);
 }
 });

 APP.mongohq.collections.create({
 "db_name" : "test_aks",
 "data" : {
 "name" : "my_users"
 },
 "success" : function(plans) {
 Ti.API.info('collections.create ' + plans);
 },
 "error" : function(plans) {
 Ti.API.info('collections.create: error ' + plans);
 }
 });

 APP.mongohq.collections.all({
 "db_name" : "test_aks",
 "success" : function(plans) {
 Ti.API.info('collections.all ' + plans);
 }
 });

 APP.mongohq.collections.create({
 "db_name" : "test_aks",
 "data" : {
 "name" : "my_users2"
 },
 "success" : function(plans) {
 Ti.API.info('collections.create ' + plans);
 },
 "error" : function(plans) {
 Ti.API.info('collections.create: error ' + plans);
 }
 });
 */

var options = {
	name : "Aaron Saunders"
};
APP.mongohq.documents.create({
	"db_name" : "test_aks",
	"col_name" : "my_users",
	"data" : {
		'document' : {
			"name" : "Andrea" + new Date(),
			"zip" : "20011"
		}
	},
	"success" : function(plans) {
		Ti.API.info('documents.create ' + plans);
	},
	"error" : function(plans) {
		Ti.API.info('documents.create: error ' + plans);
	}
});

APP.mongohq.documents.all({
	"db_name" : "test_aks",
	"col_name" : "my_users",
	"success" : function(plans) {
		Ti.API.info('documents.all ' + plans);
	}
});
