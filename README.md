Titanium Appcelerator Quickie: MongoDB JS Client
===========

<p>Was hacking around with this code a few weeks ago and wanted to finish it up and get it out for some feedback.</p>
<p>If you haven't heard, <a href="http://www.mongodb.org/">mongodb</a> is the hottest thing to come around for quite some time. It also looks like it is &nbsp;a <a href="http://read.bi/LfZaIZ">skill that is in high demand</a>.</p>
<p>I started converting this module which is based on code from <a href="http://bit.ly/LfZxDs">MongoHQ</a>, but eventually I converted the code base so it will work with <a href="http://bit.ly/LfZKXi">Mongolabs</a>. Both of these vendors provide hosting for you mongodb needs, so check them out and see what works for you.</p>
<p>I have also started the process of modifying the module to work with your own local mongodb instance, but it wasn't quite done yet.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush:js">var Client = require('mongoDBClient').Client;

var database, client = null;

if(true) {
  // mongolabs test
	client = new Client({
		url : "https://api.mongolab.com/api/1/",
		apikey : 'XXXXXXXXXXXXXXXXXXXXXXX'
	});
	database = "firstdatabase";
} else {
	//mongohq test
	client = new Client({
		url : 'https://api.mongohq.com',
		apikey : 'XXXXXXXXXXXXXXXXXXXXXXXXX'
	});
	database = "test_aks";
}
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Now we have some code to test the database by adding a document and then getting the list of documents</p>
<p>&nbsp;</p>
<pre class="brush:js">// some functions to test the code
/**
* create the document by creating a JSON object for the database
*/
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

/**
* get the document by querying the database
*/
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
// now call the functions
createDocument(database);

</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>You can get the source to the mongo client here from github, please realize it is a work in progress and feedback is appreciated</p>
<p>&nbsp;</p>
<p><strong>&nbsp;Helpful Links</strong></p>
<ul>
<li><a href="http://bit.ly/LfZKXi">MongoLabs</a></li>
<li><a href="http://bit.ly/LfZxDs">MongoHQ</a></li>
<li><a href="http://www.mongodb.org/">MongoDB</a></li>
<li><a href="http://bit.ly/LgG02r">Example on gist</a></li>
</ul>