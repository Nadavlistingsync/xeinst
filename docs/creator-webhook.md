# Creator Webhook Documentation

This guide explains how to implement webhook endpoints for your AI agents on Xeinst.

## Overview

When a buyer runs your agent, Xeinst will send a POST request to your webhook URL with the execution payload. Your webhook should process the request and return the result.

## Webhook Endpoint Requirements

### Request Format
- **Method**: POST
- **Content-Type**: application/json
- **Headers**: 
  - `x-xeinst-signature`: HMAC signature for verification
  - `Content-Type`: application/json

### Request Body
```json
{
  "agentId": "agent_123",
  "buyerId": "user_456",
  "runId": "run_789",
  "payload": {
    // User-provided input data
    "input": "example data"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Response Format
```json
{
  "ok": true,
  "result": {
    // Your agent's output
    "output": "processed result"
  },
  "traceId": "optional-trace-id-for-debugging"
}
```

## Security: HMAC Signature Verification

Xeinst signs all webhook requests with an HMAC-SHA256 signature. You must verify this signature to ensure requests are legitimate.

### Signature Header
```
x-xeinst-signature: sha256=<signature>
```

### Verification Process

#### Node.js Example
```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// In your webhook handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-xeinst-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifySignature(payload, signature.replace('sha256=', ''), YOUR_WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process the request...
});
```

#### Python Example
```python
import hmac
import hashlib
import json

def verify_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

# In your webhook handler
@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('x-xeinst-signature', '').replace('sha256=', '')
    payload = json.dumps(request.json)
    
    if not verify_signature(payload, signature, YOUR_WEBHOOK_SECRET):
        return jsonify({'error': 'Invalid signature'}), 401
    
    # Process the request...
```

## Complete Webhook Implementation Examples

### Node.js (Express)
```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

app.post('/webhook', async (req, res) => {
  try {
    // Verify signature
    const signature = req.headers['x-xeinst-signature'];
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' });
    }
    
    const payload = JSON.stringify(req.body);
    const signatureValue = signature.replace('sha256=', '');
    
    if (!verifySignature(payload, signatureValue, WEBHOOK_SECRET)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Extract data
    const { agentId, buyerId, runId, payload: userPayload, timestamp } = req.body;
    
    // Process the agent execution
    const result = await processAgent(agentId, userPayload);
    
    // Return success response
    res.json({
      ok: true,
      result: result,
      traceId: runId
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

async function processAgent(agentId, payload) {
  // Your AI agent logic here
  // This is where you'd call your AI model, process data, etc.
  
  return {
    message: "Agent executed successfully",
    data: payload,
    processedAt: new Date().toISOString()
  };
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Python (Flask)
```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json
import os

app = Flask(__name__)

WEBHOOK_SECRET = os.environ.get('WEBHOOK_SECRET')

def verify_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # Verify signature
        signature = request.headers.get('x-xeinst-signature', '')
        if not signature:
            return jsonify({'error': 'Missing signature'}), 401
        
        signature_value = signature.replace('sha256=', '')
        payload = json.dumps(request.json)
        
        if not verify_signature(payload, signature_value, WEBHOOK_SECRET):
            return jsonify({'error': 'Invalid signature'}), 401
        
        # Extract data
        data = request.json
        agent_id = data['agentId']
        buyer_id = data['buyerId']
        run_id = data['runId']
        user_payload = data['payload']
        timestamp = data['timestamp']
        
        # Process the agent execution
        result = process_agent(agent_id, user_payload)
        
        # Return success response
        return jsonify({
            'ok': True,
            'result': result,
            'traceId': run_id
        })
        
    except Exception as error:
        print(f'Webhook error: {error}')
        return jsonify({
            'ok': False,
            'error': str(error)
        }), 500

def process_agent(agent_id, payload):
    # Your AI agent logic here
    # This is where you'd call your AI model, process data, etc.
    
    return {
        'message': 'Agent executed successfully',
        'data': payload,
        'processedAt': datetime.now().isoformat()
    }

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

## Testing Your Webhook

### Using webhook.site
1. Go to [webhook.site](https://webhook.site)
2. Copy your unique URL
3. Set this URL as your agent's webhook URL in Xeinst
4. Test your agent - you'll see the requests in real-time

### Local Testing with ngrok
1. Install ngrok: `npm install -g ngrok`
2. Start your webhook server locally
3. Expose it: `ngrok http 3000`
4. Use the ngrok URL as your webhook URL
5. Test your agent

### Manual Testing
```bash
curl -X POST https://your-webhook-url.com/webhook \
  -H "Content-Type: application/json" \
  -H "x-xeinst-signature: sha256=<calculated-signature>" \
  -d '{
    "agentId": "test-agent",
    "buyerId": "test-user",
    "runId": "test-run",
    "payload": {"test": "data"},
    "timestamp": "2024-01-01T00:00:00.000Z"
  }'
```

## Best Practices

### Error Handling
- Always return a valid JSON response
- Use appropriate HTTP status codes
- Include meaningful error messages
- Log errors for debugging

### Performance
- Process requests asynchronously when possible
- Set reasonable timeouts (Xeinst waits up to 60 seconds)
- Implement retry logic for external API calls
- Cache frequently used data

### Security
- Always verify the HMAC signature
- Validate input data
- Sanitize user inputs
- Use HTTPS in production
- Keep your webhook secret secure

### Monitoring
- Log all webhook requests
- Monitor response times
- Track error rates
- Set up alerts for failures

## Common Issues

### 401 Unauthorized
- Check that your webhook secret is correct
- Verify the signature calculation
- Ensure the payload format matches exactly

### 500 Internal Server Error
- Check your webhook server logs
- Verify your agent logic doesn't throw unhandled exceptions
- Ensure you're returning valid JSON

### Timeout Errors
- Optimize your agent processing time
- Consider implementing async processing
- Check external API response times

## Support

If you need help implementing your webhook:
1. Check the Xeinst dashboard for webhook logs
2. Review this documentation
3. Test with webhook.site first
4. Contact support with specific error messages

## Next Steps

Once your webhook is working:
1. Test with various input payloads
2. Monitor performance and error rates
3. Implement proper logging and monitoring
4. Consider adding rate limiting
5. Set up automated testing
