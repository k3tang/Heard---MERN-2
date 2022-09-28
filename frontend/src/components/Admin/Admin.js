import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory, Link } from "react-router-dom";
import { fetchAllTopics, getAllTopics, deleteTopic } from "../../store/topics";
import { Box, Text, Button } from "@chakra-ui/react";

function Admin() {
  const history = useHistory();
  const admin = useSelector((state) => state.session.user.admin);
  if (!admin) history.push("/home");
  const dispatch = useDispatch();
  const topics = useSelector((state) => getAllTopics(state));

  useEffect(() => {
    dispatch(fetchAllTopics());
  }, []);

  return (
    <>
      <h1>Admin Options</h1>
      <h2>Topics</h2>
      {topics?.map((topic) => (
        <Box key={topic._id}>
          <Text color={topic.flagged.isFlagged ? "red" : "green"}>
            <Link to={`/topic/${topic._id}`}>{topic.title}</Link>
          </Text>
          {topic.flagged.isFlagged ? (
            <Text>Flagged by {topic.flagged.flaggedBy}</Text>
          ) : (
            <></>
          )}
          <Text>{topic.userId}</Text>
          <Button onClick={() => dispatch(deleteTopic(topic._id))}>
            Delete Topic
          </Button>
        </Box>
      ))}
    </>
  );
}

export default Admin;
