import reviewModel from "../models/reviewModel.js";

const addReview = async (req, res) => {
    try {
        const newReview = new reviewModel(req.body);
        await newReview.save();
        res.json({ success: true, message: "Review Added Successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error adding review" });
    }
}

const getFoodReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ foodId: req.params.foodId });
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.json({ success: false, message: "Error fetching reviews" });
    }
}

export { addReview, getFoodReviews };