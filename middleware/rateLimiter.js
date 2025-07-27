import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit(req.ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later."
      })
    }

    next();
  } catch (error) {
    console.error("Error applying rate limit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default rateLimiter