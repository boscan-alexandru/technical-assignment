import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch messages for a room
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (roomId, thunkAPI) => {
    const response = await fetch(`/api/rooms/${roomId}/messages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

// Initial state
const initialState = {
  messages: [],
  rooms: [],
  chatInput: "",
  currentRoom: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setChatInput(state, action) {
      state.chatInput = action.payload;
    },
    setRoomList(state, action) {
      state.rooms = action.payload;
    },
    setCurrentRoom(state, action) {
      state.currentRoom = action.payload;
    },
    clearChatInput(state) {
      state.chatInput = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectLoading = (state) => state.chat.loading;
export const selectError = (state) => state.chat.error;
export const selectChatInput = (state) => state.chat.chatInput;
export const selectCurrentRoom = (state) => state.chat.currentRoom;
export const selectRoomList = (state) => state.chat.rooms;

export const {
  addMessage,
  setMessages,
  setChatInput,
  clearChatInput,
  setRoomList,
  setCurrentRoom,
} = chatSlice.actions;
export default chatSlice.reducer;
