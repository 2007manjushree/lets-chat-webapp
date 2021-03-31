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
  
  var username, room_name, message, button_id;
  
  username = localStorage.getItem("Username");
  room_name = localStorage.getItem("Room Name");
  document.getElementById("username").innerHTML = username;
  
  function send() {
        message = document.getElementById("message").value;
        firebase.database().ref(room_name).push({
              username: username,
              message: message,
              likes: 0
        });
        document.getElementById("message").value = "";
  }
  
  function getData() {
        firebase.database().ref("/" + room_name).on('value', function (snapshot) {
              document.getElementById("output2").innerHTML = "";
              snapshot.forEach(function (childSnapshot) {
                    childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    if (childKey != "purpose") {
                          firebase_message_id = childKey;
                          message_data = childData;
                          console.log(firebase_message_id);
                          console.log(message_data);
                          username = message_data['username'];
                          message = message_data['message'];
                          likes = message_data['likes'];
                          username_with_img = "<h4>"+username+"  <img src='tick.png' class='user_tick'></h4>";
                          message_with_grey = "<h4 class='message_h4'>"+message+"</h4>";
                          button_with_likes = "<button class='btn btn-warning likes' id="+firebase_message_id+" value="+likes+" onclick='updatedlike(this.id)'>";
                          span_with_like = "<span class='glyphicon glyphicon-thumbs-up'> Likes: "+likes+"</span></button>";
                          row = username_with_img + message_with_grey + button_with_likes + span_with_like + "<hr>";
                          document.getElementById("output2").innerHTML += row;
                    }
              });
        });
  }
  
  getData();
  
  function updatedlike(message_id) {
  
        console.log("Clicked on like button" + message_id);
        button_id = message_id;
        like = document.getElementById(button_id).value;
        updatedlikes = Number(like) +1;
        firebase.database().ref(room_name).child(button_id).update ({
              likes : updatedlikes
        });
  }
  
  function logout() {
      window.location = "index.html";
      localStorage.removeItem("Room Name");
      localStorage.removeItem("Username");
  }