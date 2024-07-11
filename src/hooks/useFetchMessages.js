import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../slices/chatSlice";

const useFetchMessages = (roomId) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchMessages(roomId));
    }
  }, [dispatch, roomId]);

  return { messages, loading, error };
};

export default useFetchMessages;
