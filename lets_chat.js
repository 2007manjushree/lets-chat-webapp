var firebaseConfig = {
      apiKey: "AIzaSyBuKAdHC-1ZKxkob--4a9V9vgaGyEuoIWM",
      authDomain: "lets-chat-b2cdf.firebaseapp.com",
      databaseURL: "https://lets-chat-b2cdf-default-rtdb.firebaseio.com",
      projectId: "lets-chat-b2cdf",
      storageBucket: "lets-chat-b2cdf.appspot.com",
      messagingSenderId: "528574330206",
      appId: "1:528574330206:web:81e355e10e39c9d7554bcf",
      measurementId: "G-SHW0NYTLRD"
    };
    
    firebase.initializeApp(firebaseConfig);
    
    var roomname, row;
    var username = localStorage.getItem("Username");
    document.getElementById("username").innerHTML = username;
    
    function addRoom(){
          roomname = document.getElementById("newroom_input").value;
          firebase.database().ref("/").child(roomname).update({
                purpose : "adding roomname"
          });
          localStorage.setItem("Room Name", roomname);
          window.location = "room_page.html";
    }
    
    
    function getData() {firebase.database().ref("/").on('value',
    function(snapshot) {document.getElementById("output").innerHTML =
    "";snapshot.forEach(function(childSnapshot) {childKey =
    childSnapshot.key;
     Room_names = childKey;
     console.log("Room Name - " + Room_names);
                      row = "<div class='room_name_list' id="+ Room_names +" onclick='redirectToRoomPage(this.id)'> # " +Room_names+ "</div> <hr>";
                      document.getElementById("output").innerHTML += row;
     });});}
    
    getData();
    
    
    function redirectToRoomPage(name){
          console.log(name);
          localStorage.setItem("Room Name", name);
          window.location = "room_page.html";   
    }
    
    function logout() {
          window.location = "index.html";
          localStorage.removeItem("Room Name");
          localStorage.removeItem("Username");
    }