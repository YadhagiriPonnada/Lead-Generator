const axios = require('axios');

exports.createLead = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    // Extract lead data from request body
    const leadData = {
      name: req.body.name,
      email: req.body.email,
      company: req.body.company || '',
      message: req.body.message || ''
    };

    console.log('Processed lead data:', leadData);

    // Forward to n8n webhook
    const webhookUrl = 'https://yadhagiri.app.n8n.cloud/webhook/leads';
    try {
      console.log('Attempting to forward to n8n webhook:', webhookUrl);
      
      // Make POST request to n8n webhook
      const webhookResponse = await axios.post(webhookUrl, leadData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Successfully forwarded lead to n8n:', {
        webhookStatus: webhookResponse.status,
        webhookStatusText: webhookResponse.statusText,
        responseData: webhookResponse.data
      });

      // Return success response
      res.status(200).json({
        success: true,
        message: 'Lead data successfully forwarded to n8n'
      });
    } catch (webhookError) {
      console.error('Error forwarding to n8n webhook:', {
        error: webhookError.message,
        webhookUrl,
        errorDetails: webhookError.response ? webhookError.response.data : null
      });
      res.status(500).json({
        success: false,
        error: 'Failed to forward lead data to n8n'
      });
    }
  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing lead'
    });
  }
}; 