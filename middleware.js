const Listing = require("./models/listing.js");
const Review = require("./models/review.js"); // Correct path to Review model

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (!req.session.redirectUrl) {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash("error", "You must be logged in to continue.");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save redirect URL
const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};

// Middleware to check if current user is the owner of the listing
const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware to check if current user is the author of the review
const isreviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports = {
    isLoggedIn,
    saveRedirectUrl,
    isOwner,
    isreviewAuthor
};
