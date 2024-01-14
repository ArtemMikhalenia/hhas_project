import {
	getDatabase,
	ref,
	set,
	update,
	get,
	child,
	push,
	remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
	apiKey: "AIzaSyDyv6oM0hJWbQ82ofxEqEd0Tta5VMUy8wE",
	authDomain: "hhasproject.firebaseapp.com",
	databaseURL:
		"https://hhasproject-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "hhasproject",
	storageBucket: "hhasproject.appspot.com",
	messagingSenderId: "693171081016",
	appId: "1:693171081016:web:b91b463d5491c540463bcd",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Model() {
	let myView = null;

	this.init = function (view) {
		myView = view;
	};

	this.updateState = function (_pageName) {
		myView.renderContent(_pageName);
	};

	this.addListItem = function (name, sum) {
		set(ref(database, "List/" + name), {
			name: name,
			sum: sum,
		});
		myView.addListItem(name, sum);
	};

	this.clearList = function () {
		set(child(ref(database), "List/"), "");
		myView.clearList();
	};
}

export default Model;
