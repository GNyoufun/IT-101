const { GetAuthorizedResponse } = require("./AuthorizedRequest");


async function getDashboardContent()
{
    // Get the summary data
    var response = await GetAuthorizedResponse("/users/{user_id}/summary", "GET");
    if (response.status === 200) {
        var responseData = await response.json();
        
        return responseData;
    }
}