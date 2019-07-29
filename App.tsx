import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { StatusBar } from "react-native";

import RootNavigator from "./src/navigators/RootNavigator";

StatusBar.setHidden(false);

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'maintripplar.cxsxkgskizdm.us-east-1.rds.amazonaws.com',
//   user     : 'tripplar',
//   password : 'shuangwen',
//   port     : 3306,
//   database: 'MainTripplar'
// });

// connection.connect(function(err: any) {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database.');
//   console.log('sending Info');
//   var sql = "SELECT * From Businesses ORDER BY Rand() LIMIT 1;"
//   connection.query(sql, function(err: any, result: any, fields: any){
// 	if(err) throw err;
// 	console.log(result);
//   console.log("success!");
//   connection.end();
//   console.log("connection ENDED");
//   });
// });

export default function App() {
	return (
		<Provider store={store}>
			<RootNavigator />
		</Provider>
	);
}
