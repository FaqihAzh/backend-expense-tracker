import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

import "dotenv/config"

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60s'),
});

export default rateLimit;