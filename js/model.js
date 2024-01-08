import { getDatabase, ref, set, update, get, child, push, remove } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyCmO3VrG4O2UluhvZaewlxjgcoRtevgST0",
   authDomain: "test-1-4f5f1.firebaseapp.com",
   databaseURL: "https://test-1-4f5f1-default-rtdb.firebaseio.com",
   projectId: "test-1-4f5f1",
   storageBucket: "test-1-4f5f1.appspot.com",
   messagingSenderId: "251035603728",
   appId: "1:251035603728:web:e0a8d5340e28a5a80c8b95",
   measurementId: "G-10LCGZCT33"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function Model() {
   let myView = null;
   let seconds = 0;
   let minutes = 0;
   let hours = 0;
   let interval = null;

   this.init = function (view) {
      myView = view;
   }

   this.updateState = function (_pageName) {
      myView.renderContent(_pageName);
   }

   //<ПАРАЛЛАКС>==========================================================================
   this.parallaxEffect = function () {
      myView.parallaxEffect();
   }

   //<МОДАЛЬНОЕ ОКНО ГЛАВНОГО ЭКРАНА>===============================================

   this.openLogInWindow = function () {
      myView.openLogInWindow();
   }

   this.closeLogInWindow = function () {
      myView.closeLogInWindow();
   }

   this.changeToRegistration = function () {
      myView.changeToRegistration();
   }

   this.changeToLogin = function () {
      myView.changeToLogin();
   }

   //<РЕГИСТРАЦИЯ, ВХОД/ВЫХОД В АККАУНТ>==========================================================================
   this.registerUser = function (email, password) {
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, "UsersList/" + user.uid),
               {
                  email: email,
                  fullName: 'Нет данных',
                  birthday: 'Нет данных',
                  gender: 'Нет данных',
                  weight: 'Нет данных',
                  height: 'Нет данных',
                  medicalInfo: 'Нет данных',
                  goal: 'Нет данных',
                  phone: 'Нет данных',
                  achievements: 'Нет данных',
                  charts: {
                     monthChart: {
                        exercise1: {
                           '0': 65,
                           '1': 67,
                           '2': 67,
                           '3': 70,
                        },
                        exercise2: {
                           '0': 84,
                           '1': 84,
                           '2': 84,
                           '3': 84,
                        },
                        weight: {
                           '0': 77,
                           '1': 77,
                           '2': 76,
                           '3': 76,
                        },
                     },
                     yearChart: {
                        exercise1: {
                           '0': 20,
                           '1': 30,
                           '2': 40,
                           '3': 40,
                           '4': 50,
                           '5': 55,
                           '6': 60,
                           '7': 65,
                           '8': 70,
                        },
                        exercise2: {
                           '0': 40,
                           '1': 50,
                           '2': 60,
                           '3': 70,
                           '4': 80,
                           '5': 85,
                           '6': 85,
                           '7': 85,
                           '8': 85,
                        },
                        weight: {
                           '0': 94,
                           '1': 92,
                           '2': 90,
                           '3': 88,
                           '4': 84,
                           '5': 82,
                           '6': 80,
                           '7': 78,
                           '8': 76,
                        },
                     },
                  }
               })
            myView.successfulRegistration();
         })
         .catch((error) => {
            const errorCode = error.code;
            myView.ifError(errorCode);
         });
   }

   this.logInUser = function (email, password) {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;

            myView.successfulLogIn();
         })
         .catch((error) => {
            const errorCode = error.code;
            myView.ifError(errorCode);
         });
   }

   this.logOutUser = function () {
      signOut(auth).then(() => {
         myView.logOutUser();
      }).catch((error) => {
         myView.logOutUserError(error);
      });
   }

   this.manageUser = function () {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const uid = user.uid;
            get(child(ref(database), "UsersList/" + uid))
               .then(snapshot => {
                  const user = snapshot.val();
                  myView.renderInfo(user);
               })
         }
      });
   }

   //<ФУНКЦИИ СТРАНИЦЫ "АККАУНТ">===================================================================================================

   this.openUserInfoModal = function () {
      const userUid = auth.currentUser.uid;
      get(child(ref(database), "UsersList/" + userUid))
         .then(snapshot => {
            const user = snapshot.val();
            myView.openUserInfoModal(user);
         })
         .catch((error) => {
            const errorCode = error.code;
            myView.ifError(errorCode);
         });
   }

   this.changeUserInfo = function (name, birthday, gender, weight, height, medicalInfo, goal, phone, email, achievements) {
      const userUid = auth.currentUser.uid;
      const user = {
         email: email,
         fullName: name,
         birthday: birthday,
         gender: gender,
         weight: weight,
         height: height,
         medicalInfo: medicalInfo,
         goal: goal,
         phone: phone,
         achievements: achievements,

      }
      update(ref(database, "UsersList/" + userUid), user);
      myView.renderInfo(user);
      myView.closeUserInfoModal();
   }

   this.closeUserInfoModal = function () {
      myView.closeUserInfoModal();
   }

   //<ФУНКЦИИ СТРАНИЦЫ "ТРЕНИРОВКА">===================================================================================================

   this.openExerciseModal = function () {
      myView.openExerciseModal();
   }

   this.closeExerciseModal = function () {
      myView.closeExerciseModal();
   }

   this.addExercise = function (exerciseName, exerciseSet, exerciseWeight, exerciseTime) {
      const userUid = auth.currentUser.uid;

      const exercise = {
         exerciseName: exerciseName,
         exerciseSet: exerciseSet,
         exerciseWeight: exerciseWeight,
         exerciseTime: exerciseTime,
      }

      const newExerciseKey = push(child(ref(database), `UsersList/${userUid}/exercises/`), exercise).key;

      myView.addExercise(exerciseName, exerciseSet, exerciseWeight, exerciseTime, newExerciseKey);
      myView.closeExerciseModal();
   }

   this.readyExercise = function (event) {
      myView.readyExercise(event);
   }

   this.removeExercise = function (event) {
      let targetEl = event.target.closest('.exercise');
      let targetKey = targetEl.getAttribute('data-key');
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const uid = user.uid;
            remove(child(ref(database), `UsersList/${uid}/exercises/${targetKey}`))
            myView.removeExercise(event);
         }
      });
   }

   this.loadOptions = async function () {
      const snapshot = await get(child(ref(database), 'ExerciseDatabase'));
      if (snapshot.exists()) {
         const option = snapshot.val();
         myView.renderOptions(option);
      }
   }

   this.loadExercise = function () {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const uid = user.uid;
            get(child(ref(database), `UsersList/${uid}/exercises/`))
               .then(snapshot => {
                  const user = snapshot.val();
                  myView.renderExercise(user);
               })
         }
      });
   }

   this.clearTrainingBlock = function () {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const uid = user.uid;
            set(child(ref(database), `UsersList/${uid}/exercises/`), '')
            myView.clearTrainingBlock();
         }
      });
   }

   this.startStopwatch = function (status) {
      interval = setInterval(updateTime, 1000);

      function updateTime() {
         seconds++;
         if (seconds === 60) {
            minutes++;
            seconds = 0;
         }
         if (minutes === 60) {
            hours++;
            minutes = 0;
         }

         myView.startStopwatch(hours, minutes, seconds, status);
      }
   }

   this.pauseStopwatch = function (status) {
      clearInterval(interval);

      myView.pauseStopwatch(status);
   }

   this.resetStopwatch = function (status) {
      seconds = 0;
      minutes = 0;
      hours = 0;
      clearInterval(interval);
      myView.resetStopwatch(hours, minutes, seconds, status);
   }

   //<ФУНКЦИИ СТРАНИЦЫ "ПИТАНИЕ">==============================================

   this.loadProducts = async function () {
      const snapshot = await get(child(ref(database), 'Products'));
      if (snapshot.exists()) {
         const products = snapshot.val();
         myView.renderProducts(products);
      }
   }

   this.searchProduct = function (value) {
      myView.searchProduct(value);
   }

   //<ФУНКЦИИ СТРАНИЦЫ "БАЗА ТРЕНИРОВОК">==================================================================

   this.loadExercises = async function () {
      const snapshot = await get(child(ref(database), 'ExerciseDatabase'));
      if (snapshot.exists()) {
         const exercises = snapshot.val();
         myView.renderExercises(exercises);
      }
   }

   this.searchExercise = function (value) {
      myView.searchExercise(value);
   }

   this.updateState = function (pageName) {
      myView.renderContent(pageName);
   }

   //<ФУНКЦИИ СТРАНИЦЫ "ПРОГРЕСС">===================================================================================================

   this.openTabs = function (event) {
      myView.openTabs(event);
   }

   this.loadCharts = function () {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            const uid = user.uid;
            get(child(ref(database), `UsersList/${uid}/charts/yearChart/`))
               .then(snapshot => {
                  const user = snapshot.val();
                  myView.renderYearChart(user);
               })
            get(child(ref(database), `UsersList/${uid}/charts/monthChart/`))
               .then(snapshot => {
                  const user = snapshot.val();
                  myView.renderMonthChart(user);
               })
         }
      });
   }
}

export default Model;