const campaignSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  influencerId: {
    type: Schema.Types.ObjectId,
    ref: "Influencer",
    required: true,
  },
  campaignBrief: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  performanceMetrics: {
    reach: Number,
    engagement: Number,
    conversions: Number,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
