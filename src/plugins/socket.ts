import { io } from "socket.io-client";

const socket = io("https://socket.takasimo.com");

export default socket;
