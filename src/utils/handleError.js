exports.handleError = (error, res) => {
  if (error.response) {
    console.error('Error response status:', error.response.status);
    console.error('Error response data:', error.response.data);
    res.status(error.response.status).send(error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
    res.status(500).send('No response from server.');
  } else {
    console.error('Error setting up request:', error.message);
    res.status(500).send('Error processing request.');
  }
};
  