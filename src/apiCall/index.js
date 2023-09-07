// Define a customFetch function that makes an asynchronous HTTP request
const customFetch = async (url, { body, ...rest }) => {
  // Create a configuration object with headers set to JSON
  const config = {
    ...rest,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  // If a request body is provided, stringify it and add it to the configuration
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    // Make an asynchronous fetch request to the specified URL with the given configuration
    let response = await fetch(url, config);

    // Parse the response data as JSON
    let data = await response.json();

    // If data is successfully received, return it
    if (data) {
      return data;
    } else {
      // If data is not received, throw an error
      throw new Error("data not fetched");
    }
  } catch (error) {
    // Handle any errors that occur during the fetch and log them
    console.log(error);
  }
};

// Export the customFetch function as the default export
export default customFetch;
