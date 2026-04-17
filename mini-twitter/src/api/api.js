const MOCK_SERVER_URL = "http://localhost:3001";

export const getAllPosts = async () => {
  // TODO:
  // 1. Fetch all posts from `${MOCK_SERVER_URL}/posts`.
  // 2. Handle non-ok responses (e.g., if (!response.ok) throw new Error(...)).
  // 3. Parse and return the JSON data.
  // 4. Wrap in a try...catch block to handle errors.
  console.log("Students will implement getAllPosts here.");

   try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }

};

export const getPostDetails = async (postId) => {
  // TODO:
  // 1. Fetch a single post from `${MOCK_SERVER_URL}/posts/${postId}`.
  // 2. Fetch comments for that post from `${MOCK_SERVER_URL}/posts/${postId}/comments`.
  // 3. Handle errors for *both* fetches.
  // 4. Return an object containing both: { post: postData, comments: commentsData }
  console.log(`Students will implement getPostDetails for post ${postId} here.`);

  try{
    const postResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}`);
    if (!postResponse.ok) {
      throw new Error(`Failed to fetch post ${postId}: ${postResponse.status}`);
    }

    const commentsResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`);
    if (!commentsResponse.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}: ${commentsResponse.status}`);
    }

    const postData = await postResponse.json();
    const commentsData = await commentsResponse.json();

    return { post: postData, comments: commentsData };

  } catch (error) {
    console.error(`Error in getPostDetails for post ${postId}:`, error);
    return { post: null, comments: [] };

  }
};

export const createNewPost = async (newPostData) => {
  // `newPostData` will be an object like { name: '...', content: '...' }
  // TODO:
  // 1. Send a `POST` request to `${MOCK_SERVER_URL}/posts`.
  // 2. The request `method` should be `'POST'`.
  // 3. The `headers` should include `'Content-Type': 'application/json'`.
  // 4. The `body` should be `JSON.stringify(newPostData)`.
  // 5. Handle errors.
  console.log("Students will implement createNewPost here.", newPostData);

  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPostData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create new post: ${response.status}`);
    }

    const createdPost = await response.json();
    return createdPost;

  } catch (error) {
    console.error("Error in createNewPost:", error);
    return null;
  }

};

export const createNewComment = async (postId, newCommentData) => {
  // `newCommentData` will be an object like { comment: '...' }
  // TODO:
  // 1. Send a `POST` request to `${MOCK_SERVER_URL}/posts/${postId}/comments`.
  // 2. Include the correct `method`, `headers`, and `body` (JSON-stringified).
  // 3. Handle errors.
  console.log(`Students will implement createNewComment for post ${postId} here.`, newCommentData);

  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommentData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create new comment for post ${postId}: ${response.status}`);
    }

    const createdComment = await response.json();
    return createdComment;

  } catch (error) {
    console.error(`Error in createNewComment for post ${postId}:`, error);
    return null;
  }

};
