const Schema = require('./mongooseSchema.js');
// const gameID = Schema.gameID;
const review = Schema.review;

/**
 * Provide the search query parameters to retrieve documents
 * @param  {[list]} findItem a list of quaries
 * @example{ header : matches }
 * @callback reviews that retrieves the results
 */
function retrieveReview(findItem) {
    try {
        const win = await review.find(findItem).lean();
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Provide a list of schemas as parameters to insert into collections
 * @param  {[list]} reviews a list of schemas
 * @example{ header : matches }
 */
function insertReivew(reviews) {
    review.collection.insertMany(reviews, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Multiple documents inserted to Collection');
        }
    });
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {[list]} findItem a list of search queries
 * @example{ header : matches } 
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
 */
function updateReivew(findItem, changes) {
    review.collection.updateMany({ findItem }, { changes }, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Updated selected documents in the collection ');
        }
    });
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {[list]} findItem a list of search queries
 * @example{ header : matches } 
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
 * @param  {[Boolean]} returnDoc determine which versions of the document 
 *                        to return, replaced document when true
 *                        older versions of document when false
 *                        It is defaulted to false
 */
function FindReplaceReivew(findItem, changes, returnedDoc = false) {
    review.collection.findOneAndReplace({ findItem }, { changes },
        { returnNewDocument: returnedDoc }, function (err, doc) {
            if (err) {
                return console.error(err);
            } else {
                try {
                    console.log(doc);
                }catch (err) {
                    console.error(err);
                }
            }
        });
}


/**
 * Provide the search query parameters, and remove from the collection
 * @param  {[list]} reviews a list of queries
 */
function deleteReivew(reviews) {
    review.collection.deleteMany(reviews, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Removed selected documents in the collection ');
        }
    });
}

module.exports = {
    retrieveReview,
    insertReivew,
    updateReivew,
    FindReplaceReivew,
    deleteReivew
};

require('./mongodb_trial.js');
