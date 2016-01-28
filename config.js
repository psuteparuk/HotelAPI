module.exports = {
  apiKey: [
    'Hw8AwKQ72qSopCBVR2Am65pz4Ft4GTeQ',
    '33a1PSt0iexLbltb0e0nWuY8w450AS57'
  ],
  rateLimits: [
    { ttl: 10000, maxHits: 10 }, // 10 hits per 10 seconds
    { ttl: 10000, maxHits: 20 }  // 20 hits per 10 seconds
  ]
};
