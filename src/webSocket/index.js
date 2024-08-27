const socket = new WebSocket("ws://localhost:3001/");
export function openSocket() {
  socket.addEventListener("open", (eve) => {
    socket.send();
    console.log(eve);
  });
}
